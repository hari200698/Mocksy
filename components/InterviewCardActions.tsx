"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface InterviewCardActionsProps {
  interviewId: string;
}

const InterviewCardActions = ({ interviewId }: InterviewCardActionsProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this interview? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/interviews/${interviewId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the page to show updated list
        router.refresh();
      } else {
        alert("Failed to delete interview. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting interview:", error);
      alert("An error occurred while deleting the interview.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStart = () => {
    router.push(`/interview/${interviewId}`);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Button
        onClick={handleStart}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
      >
        ▶️ Start Interview
      </Button>
      <Button
        onClick={handleDelete}
        disabled={isDeleting}
        className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
      >
        {isDeleting ? "Deleting..." : "🗑️ Delete"}
      </Button>
    </div>
  );
};

export default InterviewCardActions;
