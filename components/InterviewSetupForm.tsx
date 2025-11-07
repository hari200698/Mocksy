"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface InterviewSetupFormProps {
  userId?: string;
}

const InterviewSetupForm = ({ userId }: InterviewSetupFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "generic" as "amazon" | "google" | "meta" | "generic",
    role: "",
    level: "mid" as "entry" | "mid" | "senior",
    amount: 5,
    personality: "neutral" as "friendly" | "neutral" | "skeptical",
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredRoles, setFilteredRoles] = useState<string[]>([]);

  // Comprehensive list of tech roles
  const roleOptions = [
    "Software Engineer",
    "Software Developer",
    "Software Architect",
    "Senior Software Engineer",
    "Staff Software Engineer",
    "Principal Software Engineer",
    "Frontend Engineer",
    "Frontend Developer",
    "Backend Engineer",
    "Backend Developer",
    "Full Stack Engineer",
    "Full Stack Developer",
    "Mobile Engineer",
    "iOS Engineer",
    "Android Engineer",
    "DevOps Engineer",
    "Site Reliability Engineer (SRE)",
    "Cloud Engineer",
    "Data Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
    "AI Engineer",
    "Product Manager",
    "Technical Product Manager",
    "Senior Product Manager",
    "Product Owner",
    "Engineering Manager",
    "Technical Lead",
    "Team Lead",
    "QA Engineer",
    "Test Engineer",
    "Automation Engineer",
    "Security Engineer",
    "Cybersecurity Engineer",
    "Solutions Architect",
    "Systems Engineer",
    "Network Engineer",
    "Database Administrator",
    "UI/UX Designer",
    "Product Designer",
    "UX Researcher",
    "Technical Writer",
    "Business Analyst",
    "Data Analyst",
    "Scrum Master",
    "Agile Coach",
  ];

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
    
    if (value.trim().length > 0) {
      const filtered = roleOptions.filter(role =>
        role.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRoles(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredRoles([]);
    }
  };

  const selectRole = (role: string) => {
    setFormData({ ...formData, role });
    setShowSuggestions(false);
    setFilteredRoles([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is signed in
    if (!userId) {
      alert("Please sign in to create an interview");
      router.push("/sign-in");
      return;
    }
    
    setIsLoading(true);

    console.log("Form submitted with data:", formData);
    console.log("User ID:", userId);

    try {
      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: formData.company,
          role: formData.role,
          level: formData.level,
          amount: formData.amount,
          personality: formData.personality,
          userid: userId,
        }),
      });

      console.log("API Response status:", response.status);
      const data = await response.json();
      console.log("API Response data:", data);

      if (data.success && data.interviewId) {
        console.log("Redirecting to:", `/interview/${data.interviewId}`);
        // Redirect to the newly created interview
        router.push(`/interview/${data.interviewId}`);
      } else {
        console.error("API returned success=false or no interviewId:", data);
        alert(`Failed to create interview: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error creating interview:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-2xl shadow-2xl border-2 border-purple-200">
      {/* Authentication Warning */}
      {!userId && (
        <div className="mb-6 p-4 bg-yellow-100 border-2 border-yellow-400 rounded-xl">
          <p className="text-yellow-900 font-semibold text-center">
            ⚠️ You need to sign in to create an interview. 
            <a href="/sign-in" className="ml-2 underline text-yellow-700 hover:text-yellow-900">
              Click here to sign in
            </a>
          </p>
        </div>
      )}
      
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
          🎯 AI-Powered Interview Practice
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Create Your Interview
        </h2>
        <p className="text-gray-700 text-lg">Customize your FAANG interview practice session</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Selection */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200">
          <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">🏢</span>
            Target Company *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Amazon */}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, company: 'amazon' })}
              className={`group relative p-6 border-3 rounded-2xl text-left transition-all transform hover:scale-105 hover:shadow-2xl ${
                formData.company === 'amazon'
                  ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-xl ring-4 ring-orange-200'
                  : 'border-gray-300 bg-white hover:border-orange-400'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform p-2 border-2 border-orange-200">
                  <Image 
                    src="/covers/amazon.png" 
                    alt="Amazon Logo" 
                    width={64} 
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-xl mb-1">Amazon</div>
                  <div className="text-sm text-orange-700 font-semibold">16 Leadership Principles</div>
                  <div className="text-xs text-gray-600 mt-1">Customer Obsession • Ownership • Invent</div>
                </div>
              </div>
            </button>

            {/* Google */}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, company: 'google' })}
              className={`group relative p-6 border-3 rounded-2xl text-left transition-all transform hover:scale-105 hover:shadow-2xl ${
                formData.company === 'google'
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-green-50 shadow-xl ring-4 ring-blue-200'
                  : 'border-gray-300 bg-white hover:border-blue-400'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform p-2 border-2 border-blue-200">
                  <Image 
                    src="/covers/google.png" 
                    alt="Google Logo" 
                    width={64} 
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-xl mb-1">Google</div>
                  <div className="text-sm text-blue-700 font-semibold">Googleyness & Leadership</div>
                  <div className="text-xs text-gray-600 mt-1">Innovation • Collaboration • Impact</div>
                </div>
              </div>
            </button>

            {/* Meta */}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, company: 'meta' })}
              className={`group relative p-6 border-3 rounded-2xl text-left transition-all transform hover:scale-105 hover:shadow-2xl ${
                formData.company === 'meta'
                  ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl ring-4 ring-blue-200'
                  : 'border-gray-300 bg-white hover:border-blue-500'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform p-2 border-2 border-blue-200">
                  <Image 
                    src="/covers/meta.png" 
                    alt="Meta Logo" 
                    width={64} 
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-xl mb-1">Meta</div>
                  <div className="text-sm text-blue-700 font-semibold">6 Core Values</div>
                  <div className="text-xs text-gray-600 mt-1">Move Fast • Be Bold • Focus on Impact</div>
                </div>
              </div>
            </button>

            {/* Generic */}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, company: 'generic' })}
              className={`group relative p-6 border-3 rounded-2xl text-left transition-all transform hover:scale-105 hover:shadow-2xl ${
                formData.company === 'generic'
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl ring-4 ring-purple-200'
                  : 'border-gray-300 bg-white hover:border-purple-400'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                  <span className="text-3xl">🌐</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-xl mb-1">Other Companies</div>
                  <div className="text-sm text-purple-700 font-semibold">Universal Behavioral</div>
                  <div className="text-xs text-gray-600 mt-1">Leadership • Teamwork • Problem-Solving</div>
                </div>
              </div>
            </button>
          </div>
          
          {/* Company Description */}
          <div className="mt-5 p-5 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl border-2 border-indigo-300">
            <div className="flex items-start gap-3">
              <span className="text-2xl">
                {formData.company === "amazon" && "📚"}
                {formData.company === "google" && "🎯"}
                {formData.company === "meta" && "⚡"}
                {formData.company === "generic" && "🌟"}
              </span>
              <div>
                <p className="text-base font-bold text-gray-900 mb-1">
                  {formData.company === "amazon" && "Amazon Leadership Principles Focus"}
                  {formData.company === "google" && "Google Googleyness & Core Attributes"}
                  {formData.company === "meta" && "Meta's 6 Core Values"}
                  {formData.company === "generic" && "Universal Behavioral Competencies"}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {formData.company === "amazon" && "Questions will test Customer Obsession, Ownership, Bias for Action, and 13 other principles"}
                  {formData.company === "google" && "Questions will test collaboration, handling ambiguity, innovation, and growth mindset"}
                  {formData.company === "meta" && "Questions will test Move Fast, Be Bold, Focus on Impact, and other core values"}
                  {formData.company === "generic" && "Questions will cover leadership, teamwork, problem-solving, and communication"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Role */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200 relative">
          <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-2xl">💼</span>
            Role/Position *
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.role}
              onChange={(e) => handleRoleChange(e.target.value)}
              onFocus={() => {
                if (formData.role.trim().length > 0 && filteredRoles.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => {
                // Delay to allow click on suggestion
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              placeholder="e.g., Software Engineer, Product Manager"
              className="w-full p-4 border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 text-gray-900 placeholder-gray-500 font-medium text-lg transition-all"
              required
              autoComplete="off"
            />
            
            {/* Autocomplete Suggestions Dropdown */}
            {showSuggestions && filteredRoles.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white border-2 border-purple-300 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
                {filteredRoles.slice(0, 8).map((role, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectRole(role)}
                    className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 transition-all border-b border-purple-100 last:border-b-0 flex items-center gap-3 group"
                  >
                    <span className="text-purple-600 text-xl group-hover:scale-125 transition-transform">💼</span>
                    <span className="font-medium text-gray-900 group-hover:text-purple-700">{role}</span>
                  </button>
                ))}
                {filteredRoles.length > 8 && (
                  <div className="px-4 py-2 text-sm text-gray-500 bg-purple-50 text-center">
                    +{filteredRoles.length - 8} more roles available
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Popular Roles Quick Select */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2 font-semibold">Popular roles:</p>
            <div className="flex flex-wrap gap-2">
              {["Software Engineer", "Product Manager", "Data Scientist", "DevOps Engineer", "Frontend Developer"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => selectRole(role)}
                  className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 rounded-full text-sm font-medium transition-all transform hover:scale-105 border border-purple-300"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Level */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200">
          <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Experience Level *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, level: 'entry' })}
              className={`p-5 border-3 rounded-xl transition-all transform hover:scale-105 ${
                formData.level === 'entry'
                  ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl ring-4 ring-green-200'
                  : 'border-gray-300 bg-white hover:border-green-400'
              }`}
            >
              <div className="text-4xl mb-2">🌱</div>
              <div className="font-bold text-gray-900 text-lg">Entry Level</div>
              <div className="text-sm text-gray-600 mt-1">0-2 years</div>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, level: 'mid' })}
              className={`p-5 border-3 rounded-xl transition-all transform hover:scale-105 ${
                formData.level === 'mid'
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-xl ring-4 ring-blue-200'
                  : 'border-gray-300 bg-white hover:border-blue-400'
              }`}
            >
              <div className="text-4xl mb-2">🚀</div>
              <div className="font-bold text-gray-900 text-lg">Mid Level</div>
              <div className="text-sm text-gray-600 mt-1">3-5 years</div>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, level: 'senior' })}
              className={`p-5 border-3 rounded-xl transition-all transform hover:scale-105 ${
                formData.level === 'senior'
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl ring-4 ring-purple-200'
                  : 'border-gray-300 bg-white hover:border-purple-400'
              }`}
            >
              <div className="text-4xl mb-2">⭐</div>
              <div className="font-bold text-gray-900 text-lg">Senior Level</div>
              <div className="text-sm text-gray-600 mt-1">6+ years</div>
            </button>
          </div>
        </div>

        {/* Number of Questions */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200">
          <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">❓</span>
            Number of Questions
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, amount: 3 })}
              className={`p-4 border-3 rounded-xl transition-all transform hover:scale-105 ${
                formData.amount === 3
                  ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-xl ring-4 ring-yellow-200'
                  : 'border-gray-300 bg-white hover:border-yellow-400'
              }`}
            >
              <div className="text-3xl mb-1">⚡</div>
              <div className="font-bold text-gray-900">3 Questions</div>
              <div className="text-xs text-gray-600">~15 min</div>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, amount: 5 })}
              className={`p-4 border-3 rounded-xl transition-all transform hover:scale-105 ${
                formData.amount === 5
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-xl ring-4 ring-blue-200'
                  : 'border-gray-300 bg-white hover:border-blue-400'
              }`}
            >
              <div className="text-3xl mb-1">🎯</div>
              <div className="font-bold text-gray-900">5 Questions</div>
              <div className="text-xs text-gray-600">~25 min</div>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, amount: 7 })}
              className={`p-4 border-3 rounded-xl transition-all transform hover:scale-105 ${
                formData.amount === 7
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl ring-4 ring-purple-200'
                  : 'border-gray-300 bg-white hover:border-purple-400'
              }`}
            >
              <div className="text-3xl mb-1">💪</div>
              <div className="font-bold text-gray-900">7 Questions</div>
              <div className="text-xs text-gray-600">~35 min</div>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, amount: 10 })}
              className={`p-4 border-3 rounded-xl transition-all transform hover:scale-105 ${
                formData.amount === 10
                  ? 'border-red-500 bg-gradient-to-br from-red-50 to-orange-50 shadow-xl ring-4 ring-red-200'
                  : 'border-gray-300 bg-white hover:border-red-400'
              }`}
            >
              <div className="text-3xl mb-1">🔥</div>
              <div className="font-bold text-gray-900">10 Questions</div>
              <div className="text-xs text-gray-600">~50 min</div>
            </button>
          </div>
        </div>

        {/* Interviewer Personality */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200">
          <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">🎭</span>
            Interviewer Personality *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, personality: 'friendly' })}
              className={`p-6 border-3 rounded-xl text-left transition-all transform hover:scale-105 ${
                formData.personality === 'friendly'
                  ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl ring-4 ring-green-200'
                  : 'border-gray-300 bg-white hover:border-green-400 hover:shadow-md'
              }`}
            >
              <div className="text-5xl mb-3">😊</div>
              <div className="font-bold text-gray-900 text-xl mb-2">Friendly</div>
              <div className="text-sm text-gray-700">
                Encouraging, gives hints
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, personality: 'neutral' })}
              className={`p-6 border-3 rounded-xl text-left transition-all transform hover:scale-105 ${
                formData.personality === 'neutral'
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-xl ring-4 ring-blue-200'
                  : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-md'
              }`}
            >
              <div className="text-5xl mb-3">😐</div>
              <div className="font-bold text-gray-900 text-xl mb-2">Neutral</div>
              <div className="text-sm text-gray-700">
                Professional, standard style
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, personality: 'skeptical' })}
              className={`p-6 border-3 rounded-xl text-left transition-all transform hover:scale-105 ${
                formData.personality === 'skeptical'
                  ? 'border-red-500 bg-gradient-to-br from-red-50 to-orange-50 shadow-xl ring-4 ring-red-200'
                  : 'border-gray-300 bg-white hover:border-red-400 hover:shadow-md'
              }`}
            >
              <div className="text-5xl mb-3">🤨</div>
              <div className="font-bold text-gray-900 text-xl mb-2">Skeptical</div>
              <div className="text-sm text-gray-700">
                Challenging, Bar Raiser style
              </div>
            </button>
          </div>
          <div className="mt-5 p-5 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border-2 border-yellow-300">
            <p className="text-base text-gray-900">
              <span className="font-bold text-orange-700">💡 Tip: </span>
              <span className="font-semibold">
                {formData.personality === 'friendly' && "Best for building confidence and first-time practice"}
                {formData.personality === 'neutral' && "Best for realistic standard interview simulation"}
                {formData.personality === 'skeptical' && "Best for advanced prep and stress testing your answers"}
              </span>
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-8 bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 border-4 border-blue-400 rounded-2xl shadow-xl">
          <h3 className="font-black text-gray-900 mb-5 text-2xl flex items-center gap-3">
            <span className="text-4xl">✨</span>
            What to Expect:
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-md border-2 border-blue-200">
              <span className="text-3xl">🎤</span>
              <span className="text-base font-semibold text-gray-900">AI voice interviewer will ask behavioral questions</span>
            </li>
            <li className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-md border-2 border-yellow-200">
              <span className="text-3xl">⭐</span>
              <span className="text-base font-semibold text-gray-900">Answer using the STAR framework (Situation, Task, Action, Result)</span>
            </li>
            <li className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-md border-2 border-purple-200">
              <span className="text-3xl">🔍</span>
              <span className="text-base font-semibold text-gray-900">AI will ask follow-up questions to probe deeper</span>
            </li>
            <li className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-md border-2 border-green-200">
              <span className="text-3xl">📊</span>
              <span className="text-base font-semibold text-gray-900">Get detailed feedback on each answer with STAR analysis</span>
            </li>
            {formData.company !== "generic" && (
              <li className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-md border-2 border-pink-200">
                <span className="text-3xl">🎯</span>
                <span className="text-base font-semibold text-gray-900">Receive {formData.company.toUpperCase()}-specific principle alignment feedback</span>
              </li>
            )}
          </ul>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white py-6 text-2xl font-black rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-4 border-white"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <span className="animate-spin text-3xl">⏳</span> 
              <span>Creating Your Interview...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-3">
              <span className="text-3xl">🚀</span>
              <span>Start Interview Practice</span>
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default InterviewSetupForm;
