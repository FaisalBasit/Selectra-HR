// src/lib/types.ts

export type Job = {
  id: string;           // UUID, auto-generated
  title: string;
  description: string;
  department: string;
  qualifications: string;
  experience: string;
  salaryFrom: number;
  salaryTo: number;
  jobType: string;     // Full-time, Part-time, Contract, etc.
  schedule: string;    // Work schedule/hours
  location: string;
  reportingManager: string;
  skills: string[];
  startDate: string;   // ISO date string
  endDate?: string;    // Optional end date for contract positions
  urgency: string;     // High, Medium, Low
  preferences?: string;
  created_at: string;  // Auto-generated timestamp
  status: string;      // Active, Closed, Draft
};
