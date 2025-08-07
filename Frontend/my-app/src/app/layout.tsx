// ✅ src/app/layout.tsx — Used for Login Page only
import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sélectra HR Manager Login",
  description: "Login to access the Sélectra Hiring Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F5F7FA]">
        {children}
      </body>
    </html>
  );
}
