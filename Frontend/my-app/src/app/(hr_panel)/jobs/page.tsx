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

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
      alert('Failed to load jobs. Please refresh the page.');
    }
  };

  const handleCreate = async (job: Omit<Job, "id" | "created_at">) => {
    try {
      setIsLoading(true);
      const newJob = await createJob(job);
      setJobs(prev => [newJob, ...prev]);
      alert('Job created successfully!');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (job: Job) => {
    try {
      setIsLoading(true);
      const updated = await updateJob(job.id, job);
      setJobs(prev => prev.map(j => (j.id === job.id ? updated : j)));
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
      setJobs(prev => prev.filter(j => j.id !== id));
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
    <div className="p-6 space-y-6">
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
