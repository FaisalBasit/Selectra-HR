"use client";

// src/components/Navbar.tsx

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-white shadow-md px-4 py-3 sm:px-6 sm:py-4 grid grid-cols-3 items-center">
      {/* Left column (kept empty, hamburger in Sidebar) */}
      <div className="hidden sm:block"></div>

      {/* Center column (centered title) */}
      <h1 className="text-center text-base sm:text-lg font-semibold text-gray-700 col-span-3 sm:col-span-1 sm:justify-self-center">
        HR Manager Panel
      </h1>

      {/* Right column (Sign Out button) */}
      <div className="hidden sm:flex justify-end">
        <button
          onClick={() => window.location.href = '/'}
          className="text-red-600 font-medium hover:underline"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
