import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SuccessCheckmark } from '../components/SuccessCheckmark';

export function BecomeFreelancer() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rateType, setRateType] = useState<'hourly' | 'fixed'>('hourly');
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    rate: '',
    about: '',
    email: '',
    phone: '',
  });

  const skills = [
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
    if (selectedSkills.length === 0) {
      alert('Please select at least one skill');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'freelancers'), {
        ...formData,
        skills: selectedSkills,
        rateType,
        createdAt: new Date(),
      });

      setShowSuccess(true);

      // Combine form reset and hiding the success animation
      setTimeout(() => {
        setShowSuccess(false); // Hide the animation
        setFormData({ // Reset form
          name: '',
          title: '',
          rate: '',
          about: '',
          email: '',
          phone: '',
        });
        setSelectedSkills([]);
        setRateType('hourly');
      }, 2000);

    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Error creating profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <SuccessCheckmark 
        show={showSuccess} 
        onAnimationEnd={() => {}}  // onAnimationEnd is no longer needed
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Become a Freelancer</h1>
        <p className="text-gray-400">Join our community of talented developers and start earning in Bitcoin</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Full Name</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Professional Title</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Full Stack Developer"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Phone Number</label>
          <input
            type="tel"
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Rate Type</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio text-purple-600"
                checked={rateType === 'hourly'}
                onChange={() => setRateType('hourly')}
              />
              <span className="ml-2">Per Hour</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio text-purple-600"
                checked={rateType === 'fixed'}
                onChange={() => setRateType('fixed')}
              />
              <span className="ml-2">Per Project</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            {rateType === 'hourly' ? 'Hourly Rate (BTC)' : 'Average Project Rate (BTC)'}
          </label>
          <input
            type="number"
            required
            step="0.001"
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder={rateType === 'hourly' ? '0.005' : '0.5'}
            value={formData.rate}
            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Skills</label>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <button
                key={skill}
                type="button"
                className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                  selectedSkills.includes(skill)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => {
                  setSelectedSkills(prev =>
                    prev.includes(skill)
                      ? prev.filter(s => s !== skill)
                      : [...prev, skill]
                  );
                }}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">About</label>
          <textarea
            required
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 min-h-[120px]"
            placeholder="Tell us about your experience and expertise..."
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
}
