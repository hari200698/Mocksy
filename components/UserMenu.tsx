"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface UserMenuProps {
  user: {
    id: string;
    name?: string;
    email?: string;
  } | null;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    try {
      // Call the sign-out API
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (response.ok) {
        // Redirect to sign-in page
        window.location.href = "/sign-in";
      } else {
        console.error("Sign out failed");
        alert("Failed to sign out. Please try again.");
      }
    } catch (error) {
      console.error("Sign out error:", error);
      alert("An error occurred while signing out.");
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 bg-white text-purple-700 rounded-full flex items-center justify-center font-black shadow-lg hover:shadow-2xl hover:scale-110 transition-all border-2 border-white/50"
      >
        {getInitials()}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border-2 border-purple-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info */}
          <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center font-black text-lg border-2 border-white/50">
                {getInitials()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-lg truncate">{user?.name || "User"}</p>
                <p className="text-sm text-white/80 truncate">{user?.email || ""}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors"
            >
              <span className="text-2xl">🏠</span>
              <span className="font-semibold text-gray-700">Home</span>
            </Link>
            <Link
              href="/interview"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors"
            >
              <span className="text-2xl">✨</span>
              <span className="font-semibold text-gray-700">Create Interview</span>
            </Link>
            <div className="border-t border-gray-200 my-2"></div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
            >
              <span className="text-2xl">🚪</span>
              <span className="font-semibold text-red-600">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
