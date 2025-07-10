import React from "react";
import { Home, User, Settings } from "lucide-react"; // Example icons

export default function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-around items-center h-16 md:hidden shadow-lg">
      <a href="/" className="flex flex-col items-center text-green-600">
        <Home className="w-6 h-6" />
        <span className="text-xs">Home</span>
      </a>
      <a href="/profile" className="flex flex-col items-center text-gray-500">
        <User className="w-6 h-6" />
        <span className="text-xs">Profile</span>
      </a>
      <a href="/settings" className="flex flex-col items-center text-gray-500">
        <Settings className="w-6 h-6" />
        <span className="text-xs">Settings</span>
      </a>
    </nav>
  );
}
