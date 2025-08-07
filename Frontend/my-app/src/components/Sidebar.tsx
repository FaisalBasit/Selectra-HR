"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  CalendarCheck,
  BarChart2,
  User,
  X
} from "lucide-react";

// Navigation items for sidebar
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Job Postings", icon: Briefcase, href: "/jobs" },
  { label: "Applications", icon: Users, href: "/applications" },
  { label: "Interviews", icon: CalendarCheck, href: "/interviews" },
  { label: "Analytics & Reports", icon: BarChart2, href: "/analytics" },
  { label: "User Profile", icon: User, href: "/profile" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar Toggle Button (only on small screens) */}
      <button
        className="sm:hidden fixed top-4 left-4 z-[100] bg-[#1E3768] text-white p-2 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar (Large screens or toggled mobile) */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#1E3768] text-white p-6 z-[90]
          flex flex-col transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0
        `}
      >
        {/* Close Button (only on mobile) */}
        <div className="w-full flex justify-end sm:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Logo */}
        <div className="w-full flex justify-center mb-10">
          <Image
            src="/logo.png"
            alt="Selectra X Zero Logo"
            className="w-[220px] h-auto object-contain"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>

        {/* Navigation */}
        <nav className="w-full space-y-6">
          {navItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center space-x-3 text-white hover:text-[#5885C4] transition px-4"
              onClick={() => setIsOpen(false)} // Close sidebar on link click (mobile)
            >
              <Icon className="w-5 h-5" />
              <span className="text-md">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto w-full text-center text-sm text-gray-300 pt-6">
          <span className="block">Powered by</span>
          <span className="font-semibold text-white">Neura Agency</span>
        </div>
      </aside>
    </>
  );
}
