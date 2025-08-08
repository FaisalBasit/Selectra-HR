"use client";

import { Job } from "@/lib/types";

type JobTableProps = {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
};

export default function JobTable({ jobs, onEdit, onDelete }: JobTableProps) {
  return (
    <div className="w-full max-w-[95vw] mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Posted Jobs</h2>
      <div className="overflow-x-auto border rounded-xl shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="p-4 whitespace-nowrap">#</th>
              <th className="p-4 whitespace-nowrap">Title</th>
              <th className="p-4 whitespace-nowrap">Department</th>
              <th className="p-4 whitespace-nowrap">Location</th>
              <th className="p-4 whitespace-nowrap">Type</th>
              <th className="p-4 whitespace-nowrap">Experience</th>
              <th className="p-4 whitespace-nowrap">Salary Range</th>
              <th className="p-4 whitespace-nowrap">Start Date</th>
              <th className="p-4 whitespace-nowrap">Status</th>
              <th className="p-4 whitespace-nowrap">Urgency</th>
              <th className="p-4 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id} className="border-t hover:bg-gray-50">
                <td className="p-4 whitespace-nowrap font-mono text-xs">{index + 1}</td>
                <td className="p-4 whitespace-nowrap">{job.title}</td>
                <td className="p-4 whitespace-nowrap">{job.department}</td>
                <td className="p-4 whitespace-nowrap">{job.location}</td>
                <td className="p-4 whitespace-nowrap">{job.jobType}</td>
                <td className="p-4 whitespace-nowrap">{job.experience}</td>
                <td className="p-4 whitespace-nowrap">
                  {job.salaryFrom.toLocaleString()} - {job.salaryTo.toLocaleString()}
                </td>
                <td className="p-4 whitespace-nowrap">
                  {new Date(job.startDate).toLocaleDateString()}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    job.status === 'Active' ? 'bg-green-100 text-green-800' :
                    job.status === 'Closed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    job.urgency === 'High' ? 'bg-red-100 text-red-800' :
                    job.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {job.urgency}
                  </span>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(job)}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this job?')) {
                          onDelete(job.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-800 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={11} className="text-center p-6 text-gray-500">
                  No jobs posted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
