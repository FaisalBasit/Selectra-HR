// src/lib/supabaseJobs.ts

import { supabase } from "./supabase";
import type { Job } from "./types";

// Fetch all jobs
export async function fetchJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }

  if (!data) return [];

  // Convert snake_case to camelCase for all jobs
  return data.map(job => ({
    id: job.id,
    title: job.title,
    description: job.description,
    department: job.department,
    qualifications: job.qualifications,
    experience: job.experience,
    salaryFrom: job.salary_from,
    salaryTo: job.salary_to,
    jobType: job.job_type,
    schedule: job.schedule,
    location: job.location,
    reportingManager: job.reporting_manager,
    skills: Array.isArray(job.skills) ? job.skills : [],
    startDate: job.start_date,
    endDate: job.end_date,
    urgency: job.urgency,
    preferences: job.preferences,
    status: job.status,
    created_at: job.created_at
  }));
}

// Create a new job
export async function createJob(job: Omit<Job, "id" | "created_at">): Promise<Job> {
  try {
    console.log('Creating job with data:', job);

    // Convert camelCase to snake_case for Postgres
    const jobData = {
      title: job.title,
      description: job.description,
      department: job.department,
      qualifications: job.qualifications,
      experience: job.experience,
      salary_from: Number(job.salaryFrom),
      salary_to: Number(job.salaryTo),
      job_type: job.jobType,
      schedule: job.schedule,
      location: job.location,
      reporting_manager: job.reportingManager,
      skills: Array.isArray(job.skills) ? job.skills : [],
      start_date: job.startDate,
      end_date: job.endDate,
      urgency: job.urgency,
      preferences: job.preferences,
      status: job.status || "Active"
    };

    console.log('Formatted job data for Supabase:', jobData);

    const { data, error } = await supabase
      .from("jobs")
      .insert([jobData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw new Error(`Failed to create job: ${error.message}`);
    }

    if (!data) {
      console.error('No data returned from Supabase after insert');
      throw new Error('No data returned from Supabase');
    }

    console.log('Successfully created job, returned data:', data);

    // Convert snake_case back to camelCase for frontend
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      department: data.department,
      qualifications: data.qualifications,
      experience: data.experience,
      salaryFrom: data.salary_from,
      salaryTo: data.salary_to,
      jobType: data.job_type,
      schedule: data.schedule,
      location: data.location,
      reportingManager: data.reporting_manager,
      skills: Array.isArray(data.skills) ? data.skills : [],
      startDate: data.start_date,
      endDate: data.end_date,
      urgency: data.urgency,
      preferences: data.preferences,
      status: data.status,
      created_at: data.created_at
    };
  } catch (error) {
    console.error('Detailed error in createJob:', error);
    throw error;
  }
}

// Update an existing job
export async function updateJob(id: string, job: Partial<Job>): Promise<Job> {
  // Convert camelCase to snake_case for Postgres
  const updateData: any = {};
  if (job.title) updateData.title = job.title;
  if (job.description) updateData.description = job.description;
  if (job.department) updateData.department = job.department;
  if (job.qualifications) updateData.qualifications = job.qualifications;
  if (job.experience) updateData.experience = job.experience;
  if (job.salaryFrom) updateData.salary_from = Number(job.salaryFrom);
  if (job.salaryTo) updateData.salary_to = Number(job.salaryTo);
  if (job.jobType) updateData.job_type = job.jobType;
  if (job.schedule) updateData.schedule = job.schedule;
  if (job.location) updateData.location = job.location;
  if (job.reportingManager) updateData.reporting_manager = job.reportingManager;
  if (job.skills) updateData.skills = job.skills;
  if (job.startDate) updateData.start_date = job.startDate;
  if (job.endDate) updateData.end_date = job.endDate;
  if (job.urgency) updateData.urgency = job.urgency;
  if (job.preferences) updateData.preferences = job.preferences;
  if (job.status) updateData.status = job.status;

  const { data, error } = await supabase
    .from("jobs")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  // Convert snake_case back to camelCase for frontend
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    department: data.department,
    qualifications: data.qualifications,
    experience: data.experience,
    salaryFrom: data.salary_from,
    salaryTo: data.salary_to,
    jobType: data.job_type,
    schedule: data.schedule,
    location: data.location,
    reportingManager: data.reporting_manager,
    skills: data.skills,
    startDate: data.start_date,
    endDate: data.end_date,
    urgency: data.urgency,
    preferences: data.preferences,
    status: data.status,
    created_at: data.created_at
  };
}

// Delete a job
export async function deleteJob(id: string): Promise<void> {
  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
