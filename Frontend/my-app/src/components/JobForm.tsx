"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Job } from "@/lib/types";

// Fix: Update props interface to match page component
interface JobFormProps {
  editingJob: Job | null;
  onCreate: (job: Omit<Job, "id" | "created_at">) => void;
  onUpdate: (job: Job) => void;
  onClear: () => void;
}

// Default options for select fields
const defaultOptions = {
  jobTitles: ["Software Engineer", "Product Manager", "Data Scientist"],
  departments: ["Engineering", "Product", "Marketing", "Sales", "HR"],
  qualifications: ["Bachelor of Computer Science (BSCS)", "Bachelor of Software Engineering (BSSE)", "Bachelor of Artificial Intelligence (BSAI)", "Bachelor of Marketing (BSM)","Master of Business Administration (MBA)"],
  schedules: ["Full-time", "Part-time", "Flexible"],
  managers: ["John Doe", "Jane Smith", "Mike Johnson"],
  experienceLevels: ["Entry Level", "1-3 years", "3-5 years", "5+ years", "10+ years"],
  urgencies: ["High", "Medium", "Low"],
  skills: ["JavaScript", "Python", "React", "Node.js", "SQL"],
  jobTypes: ["Full-time", "Part-time", "Contract", "Temporary", "Internship"],
};

export default function JobForm({ editingJob, onCreate, onUpdate, onClear }: JobFormProps) {
  const [form, setForm] = useState<Omit<Job, "id" | "created_at">>({
    title: "",
    description: "",
    department: "",
    qualifications: "",
    experience: "",
    salaryFrom: 0,
    salaryTo: 0,
    jobType: "",
    schedule: "",
    location: "",
    reportingManager: "",
    skills: [],
    startDate: "",
    endDate: "",
    urgency: "",
    preferences: "",
    status: "Active"
  });

  // Update form when editingJob changes
  useEffect(() => {
    if (editingJob) {
      const { id, created_at, ...rest } = editingJob;
      setForm(rest);
    } else {
      // Reset form
      setForm({
        title: "",
        description: "",
        department: "",
        qualifications: "",
        experience: "",
        salaryFrom: 0,
        salaryTo: 0,
        jobType: "",
        schedule: "",
        location: "",
        reportingManager: "",
        skills: [],
        startDate: "",
        endDate: "",
        urgency: "",
        preferences: "",
        status: "Active",
      });
    }
  }, [editingJob]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name.includes('salary') ? Number(value) : value
    }));
  };

  // Handle select changes
  const handleSelectChange = (field: string, value: string | null) => {
    setForm(prev => ({ ...prev, [field]: value || "" }));
  };

  // Handle skills multi-select
  const handleSkillsChange = (selected: any) => {
    setForm(prev => ({
      ...prev,
      skills: selected ? selected.map((s: any) => s.value) : []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Log the form data for debugging
      console.log('Submitting form data:', form);

      // Validate required fields
      const requiredFields = {
        title: 'Job Title',
        department: 'Department',
        jobType: 'Job Type',
        location: 'Location',
        experience: 'Experience',
        salaryFrom: 'Minimum Salary',
        salaryTo: 'Maximum Salary',
        startDate: 'Start Date',
        urgency: 'Urgency',
        description: 'Job Description',
        qualifications: 'Qualifications',
        skills: 'Required Skills'
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([key]) => !form[key as keyof typeof form])
        .map(([_, label]) => label);

      if (missingFields.length > 0) {
        alert(`Please fill in the following required fields:\n${missingFields.join('\n')}`);
        return;
      }

      // Validate salary range
      if (Number(form.salaryFrom) > Number(form.salaryTo)) {
        alert("Minimum salary cannot be greater than maximum salary");
        return;
      }

      // Validate date
      if (form.startDate && form.endDate && new Date(form.startDate) > new Date(form.endDate)) {
        alert("Start date cannot be after end date");
        return;
      }

      // Ensure skills is an array
      if (!Array.isArray(form.skills) || form.skills.length === 0) {
        alert("Please select at least one required skill");
        return;
      }

      // Format the data before submission
      const formattedData = {
        ...form,
        salaryFrom: Number(form.salaryFrom),
        salaryTo: Number(form.salaryTo),
        startDate: form.startDate ? new Date(form.startDate).toISOString() : '',
        endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
        status: "Active"
      };

      // Replace these lines
      if (editingJob) {
        await onUpdate({ ...editingJob, ...formattedData });
      } else {
        await onCreate(formattedData);
      }

      // Reset form after successful submission
      resetForm();

      // Clear editing state
      onClear();

    } catch (error) {
      console.error('Error submitting form:', error);
      if (error instanceof Error) {
        alert(`Failed to save job: ${error.message}`);
      } else {
        alert('Failed to save job. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      department: "",
      qualifications: "",
      experience: "",
      salaryFrom: 0,
      salaryTo: 0,
      jobType: "",
      schedule: "",
      location: "",
      reportingManager: "",
      skills: [],
      startDate: "",
      endDate: "",
      urgency: "",
      preferences: "",
      status: "Active"
    });
  };

  return (
    <Card className="w-full max-w-5xl mx-auto my-10 shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold">
          {editingJob ? `Edit Job: ${editingJob.title}` : "Create New Job"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div>
              <Label>Job Title *</Label>
              <CreatableSelect
                isClearable
                onChange={(option) => handleSelectChange("title", option?.value || "")}
                options={defaultOptions.jobTitles.map(title => ({ value: title, label: title }))}
                value={form.title ? { value: form.title, label: form.title } : null}
              />
            </div>

            {/* Department */}
            <div>
              <Label>Department *</Label>
              <CreatableSelect
                isClearable
                onChange={(option) => handleSelectChange("department", option?.value || "")}
                options={defaultOptions.departments.map(d => ({ value: d, label: d }))}
                value={form.department ? { value: form.department, label: form.department } : null}
              />
            </div>

            {/* Job Type */}
            <div>
              <Label>Job Type *</Label>
              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="">Select type</option>
                {defaultOptions.jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <Label>Location *</Label>
              <Input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Experience */}
            <div>
              <Label>Experience *</Label>
              <select
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="">Select level</option>
                {defaultOptions.experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Salary From *</Label>
                <Input
                  type="number"
                  name="salaryFrom"
                  value={form.salaryFrom}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
              <div>
                <Label>Salary To *</Label>
                <Input
                  type="number"
                  name="salaryTo"
                  value={form.salaryTo}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
            </div>

            {/* Dates */}
            <div>
              <Label>Start Date *</Label>
              <DatePicker
                selected={form.startDate ? new Date(form.startDate) : null}
                onChange={(date) =>
                  setForm(prev => ({ ...prev, startDate: date?.toISOString() || "" }))
                }
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <div>
              <Label>End Date</Label>
              <DatePicker
                selected={form.endDate ? new Date(form.endDate) : null}
                onChange={(date) =>
                  setForm(prev => ({ ...prev, endDate: date?.toISOString() || "" }))
                }
                className="w-full border rounded-md p-2"
                minDate={form.startDate ? new Date(form.startDate) : undefined}
              />
            </div>

            {/* Other Fields */}
            <div>
              <Label>Urgency *</Label>
              <select
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="">Select urgency</option>
                {defaultOptions.urgencies.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <Label>Reporting Manager</Label>
              <CreatableSelect
                isClearable
                onChange={(option) => handleSelectChange("reportingManager", option?.value || "")}
                options={defaultOptions.managers.map(m => ({ value: m, label: m }))}
                value={form.reportingManager ? { value: form.reportingManager, label: form.reportingManager } : null}
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <Label>Required Skills *</Label>
            <CreatableSelect
              isMulti
              onChange={handleSkillsChange}
              options={defaultOptions.skills.map(skill => ({ value: skill, label: skill }))}
              value={form.skills.map(s => ({ value: s, label: s }))}
            />
          </div>

          {/* Description */}
          <div>
            <Label>Job Description *</Label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="min-h-[100px]"
              required
            />
          </div>

          {/* Qualifications */}
          <div>
            <Label>Qualifications *</Label>
            <CreatableSelect
              isClearable
              isMulti
              onChange={(selected) => {
                const values = selected ? selected.map(option => option.value) : [];
                setForm(prev => ({
                  ...prev,
                  qualifications: values.join('\n')
                }));
              }}
              options={defaultOptions.qualifications.map(qual => ({ 
                value: qual, 
                label: qual 
              }))}
              value={form.qualifications.split('\n')
                .filter(qual => qual.trim())
                .map(qual => ({
                  value: qual.trim(),
                  label: qual.trim()
                }))}
              placeholder="Select or create qualifications..."
              classNamePrefix="select"
            />
          </div>

          {/* Additional Preferences */}
          <div>
            <Label>Additional Preferences</Label>
            <Textarea
              name="preferences"
              value={form.preferences}
              onChange={handleChange}
              className="min-h-[100px]"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end pt-6">
            <Button 
              type="button" 
              onClick={() => {
                resetForm();
                onClear();
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="px-6 text-white bg-blue-600 hover:bg-blue-700"
            >
              {editingJob ? "Update Job" : "Create Job"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
