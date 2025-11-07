"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";
import { AgentProps } from "@/types";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
  company,
  personality,
}: AgentProps & { 
  company?: 'amazon' | 'google' | 'meta' | 'generic';
  personality?: 'friendly' | 'neutral' | 'skeptical';
}) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [isExplicitEnd, setIsExplicitEnd] = useState(false); // Track if user clicked "End Interview"

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      setIsExplicitEnd(false); // Reset flag when call starts
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("=== handleGenerateFeedback START ===");
      console.log("- Interview ID:", interviewId);
      console.log("- User ID:", userId);
      console.log("- Messages count:", messages.length);
      console.log("- Existing feedbackId:", feedbackId);

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      console.log("- Feedback creation result:", { success, feedbackId: id });

      if (success && id) {
        console.log("✅ Feedback saved successfully! Redirecting to feedback page...");
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.error("❌ Error saving feedback - redirecting to home");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        // Only generate feedback if user explicitly ended the interview
        if (isExplicitEnd) {
          console.log("✅ User explicitly ended interview - generating feedback");
          handleGenerateFeedback(messages);
        } else {
          console.log("⚠️ Interview disconnected without explicit end - NOT saving feedback");
          // Don't save feedback, just redirect to home
          router.push("/");
        }
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId, isExplicitEnd]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    console.log("🔵 Starting call...");
    console.log("- Type:", type);
    console.log("- Company:", company);
    console.log("- Personality:", personality);

    try {
      if (type === "generate") {
        console.log("- Using workflow ID");
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            username: userName,
            userid: userId,
          },
        });
      } else {
      // Use personality-based interviewer if both company and personality are provided
      let interviewerConfig;
      
      if (company && questions && personality) {
        const { createPersonalityInterviewer } = await import("@/lib/interviewer-personalities");
        interviewerConfig = createPersonalityInterviewer(personality, company, questions);
      } else if (company && questions) {
        const { getCompanyInterviewer } = await import("@/constants");
        interviewerConfig = getCompanyInterviewer(company, questions);
      } else {
        interviewerConfig = interviewer;
      }

      let formattedQuestions = "";
      if (questions && !company) {
        // Only format questions if not using company-specific interviewer
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      console.log("- Starting VAPI with config:", {
        hasCompany: !!company,
        hasPersonality: !!personality,
        questionsCount: questions?.length || 0,
      });
      
      await vapi.start(interviewerConfig, {
        variableValues: (company || personality) ? {} : {
          questions: formattedQuestions,
        },
      });
      
      console.log("✅ VAPI started successfully");
    }
    } catch (error) {
      console.error("❌ Error starting VAPI call:", error);
      setCallStatus(CallStatus.INACTIVE);
      alert("Failed to start interview. Please check console for details.");
    }
  };

  const handleDisconnect = () => {
    console.log("🔴 User clicked 'End Interview' button");
    setIsExplicitEnd(true); // Mark as explicit end
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <div className="space-y-6">
      {/* Professional Interview Interface */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Interviewer Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center min-h-[320px]">
            <div className={cn(
              "relative w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center transition-all duration-300",
              isSpeaking && "ring-4 ring-blue-500 ring-opacity-50"
            )}>
              <Image
                src="/ai-avatar.png"
                alt="AI Interviewer"
                width={70}
                height={70}
                className="object-cover"
              />
              {isSpeaking && (
                <div className="absolute -inset-2 rounded-full border-2 border-blue-500 animate-pulse" />
              )}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">AI Interviewer</h3>
            <p className="text-sm text-gray-500 mt-2">
              {callStatus === "ACTIVE" ? "Listening" : "Ready"}
            </p>
            {callStatus === "ACTIVE" && (
              <div className="mt-4 flex items-center gap-2 text-sm text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span>Active</span>
              </div>
            )}
          </div>
        </div>

        {/* Candidate Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col items-center justify-center min-h-[320px]">
            <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src="/user-avatar.png"
                alt={userName}
                width={112}
                height={112}
                className="object-cover"
              />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">{userName}</h3>
            <p className="text-sm text-gray-500 mt-2">Candidate</p>
          </div>
        </div>
      </div>

      {/* Live Transcript */}
      {messages.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h4 className="text-sm font-medium text-gray-700">Live Transcript</h4>
          </div>
          <p
            key={lastMessage}
            className={cn(
              "text-gray-700 text-base leading-relaxed transition-opacity duration-500",
              "animate-fadeIn"
            )}
          >
            {lastMessage}
          </p>
        </div>
      )}

      {/* Call Controls */}
      <div className="flex justify-center pt-2">
        {callStatus !== "ACTIVE" ? (
          <button 
            className={cn(
              "relative px-8 py-3 bg-blue-600 hover:bg-blue-700",
              "text-white font-medium text-base rounded-lg shadow-sm",
              "transition-all disabled:opacity-50 disabled:cursor-not-allowed",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            )}
            onClick={() => handleCall()}
            disabled={callStatus === "CONNECTING"}
          >
            <span className="flex items-center gap-2">
              {callStatus === "INACTIVE" || callStatus === "FINISHED" ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Start Interview
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Connecting...
                </>
              )}
            </span>
          </button>
        ) : (
          <button 
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium text-base rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => handleDisconnect()}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              End Interview
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Agent;
