// src/app/(hr_panel)/layout.tsx

import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sélectra HR Manager Panel",
  description: "Dashboard & Hiring Automation Panel",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      <Sidebar />

      <div className="lg:pl-72 pt-16">
        {/* lg:pl-72 ensures space on large screens; on small, Sidebar is overlay or hidden */}
        <Navbar />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
