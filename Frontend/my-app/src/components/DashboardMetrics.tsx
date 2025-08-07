// src/components/DashboardMetrics.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardMetrics() {
  const metrics = [
    { title: "Active Job Posts", value: 12 },
    { title: "Total Applicants", value: 134 },
    { title: "Interviews Scheduled", value: 27 },
    { title: "Hires This Month", value: 8 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader>
            <CardTitle>{metric.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metric.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
