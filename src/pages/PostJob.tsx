import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SuccessCheckmark } from '../components/SuccessCheckmark';

export function PostJob() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: 'full-time',
    budget: '',
    description: '',
    skills: '',
    email: '',
    phone: ''
  });

  const categories = [
    'Web Development',
    'Mobile Development',
    'Software Development',
    'Frontend',
    'Backend',
    'Full Stack',
    'Database',
    'Cloud Computing',
    'DevOps',
    'Cybersecurity',
    'Artificial Intelligence',
    'Machine Learning',
    'Game Development',
    'E-commerce',
    'API Development',
    'Automation',
    'UI/UX Design',
    'Data Science',
    'Blockchain',
    'Scripting'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      alert('Please select at least one category');
      return;
    }

    setIsSubmitting(true);
    try {
      const skills = formData.skills.split(',').map(skill => skill.trim()).filter(Boolean);

      await addDoc(collection(db, 'jobs'), {
        ...formData,
        categories: selectedCategories,
        skills,
        createdAt: new Date(),
      });

      setShowSuccess(true);

      // Combine form reset and hiding success
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          title: '',
          company: '',
          type: 'full-time',
          budget: '',
          description: '',
          skills: '',
          email: '',
          phone: ''
        });
        setSelectedCategories([]);
      }, 2000);

    } catch (error) {
      console.error('Error posting job:', error);
      alert('Error posting job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <SuccessCheckmark show={showSuccess} onAnimationEnd={() => {}} />

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Post a Job</h1>
        <p className="text-gray-400">Find the perfect developer for your project</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Job Title</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Senior React Developer"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Company Name</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Your Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Job Type</label>
          <select
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Budget (BTC)</label>
          <input
            type="number"
            required
            step="0.001"
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="0.015"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          />
        </div>


        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Contact Email</label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="your_email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Contact Phone Number</label>
          <input
            type="tel"
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="+1-123-456-7890"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                  selectedCategories.includes(category)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => {
                  setSelectedCategories(prev =>
                    prev.includes(category)
                      ? prev.filter(c => c !== category)
                      : [...prev, category]
                  );
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Job Description</label>
          <textarea
            required
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 min-h-[120px]"
            placeholder="Describe the job requirements and responsibilities..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Required Skills</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="React, TypeScript, Node.js"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
          <p className="text-sm text-gray-400">Separate skills with commas</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Posting Job...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
}
