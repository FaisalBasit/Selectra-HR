"use client";

import { useEffect, useState } from "react";
import JobForm from "@/components/JobForm";
import JobTable from "@/components/JobTable";
import type { Job } from "@/lib/types";
import { fetchJobs, createJob, updateJob, deleteJob } from "@/lib/supabaseJobs";

export default function JobPostingPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Add refresh function
  const refreshJobs = async () => {
    setIsLoading(true);
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error refreshing jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use refreshJobs in useEffect
  useEffect(() => {
    refreshJobs();
  }, []);

  const handleCreate = async (job: Omit<Job, "id" | "created_at">) => {
    try {
      setIsLoading(true);
      console.log('Attempting to create job:', job);
      const newJob = await createJob(job);
      console.log('Job created successfully:', newJob);
      await refreshJobs();
      alert('Job created successfully!');
    } catch (error) {
      console.error('Detailed error creating job:', error);
      if (error instanceof Error) {
        alert(`Failed to create job: ${error.message}`);
      } else {
        alert('Failed to create job. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (job: Job) => {
    try {
      setIsLoading(true);
      await updateJob(job.id, job);
      await refreshJobs(); // Refresh the jobs list after updating
      setEditingJob(null);
      alert('Job updated successfully!');
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteJob(id);
      await refreshJobs(); // Refresh the jobs list after deleting
      setEditingJob(null);
      alert('Job deleted successfully!');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3 space-y-6">
      <JobForm
        editingJob={editingJob}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onClear={() => setEditingJob(null)}
      />

      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <JobTable
          jobs={jobs}
          onEdit={setEditingJob}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
