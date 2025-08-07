// src/app/dashboard/page.tsx
import DashboardMetrics from "@/components/DashboardMetrics";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardMetrics />

      <section className="bg-white shadow-md p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">🟢 Live Activity Feed</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✅ New application from John Doe for Software Engineer</li>
          <li>📨 Interview feedback submitted by recruiter Sarah</li>
          <li>🧠 Agent screened candidate Emily for Data Analyst</li>
          <li>⏰ Reminder: Interview with Alex in 1 hour</li>
          <li>⚠️ Job post for "Product Manager" expires tomorrow</li>
        </ul>
      </section>
    </div>
  );
}
