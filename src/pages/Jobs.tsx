import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, startAfter, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Search, Clock, DollarSign, Briefcase, Mail, Phone } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  type: string;
  budget: string;
  description: string;
  skills: string[];
  categories: string[];
  email: string;
  phone: string;
  createdAt: any;
}

const ALL_TAGS = [
  'Web Development', 'Mobile Development', 'Software Development',
  'Frontend', 'Backend', 'Full Stack', 'Database',
  'Cloud Computing', 'DevOps', 'Cybersecurity',
  'Artificial Intelligence', 'Machine Learning', 'Game Development',
  'E-commerce', 'API Development', 'Automation',
  'UI/UX Design', 'Data Science', 'Blockchain', 'Scripting'
];

const JOBS_PER_PAGE = 12;

export function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastDocument, setLastDocument] = useState<any>(null);

  const categories = ALL_TAGS;

  useEffect(() => {
    fetchJobs();
  }, [currentPage, selectedCategories, searchTerm]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      let jobsQuery = query(
        collection(db, 'jobs'),
        orderBy('createdAt', 'desc')
      );

      if (lastDocument && currentPage > 1) {
        jobsQuery = query(
          collection(db, 'jobs'),
          orderBy('createdAt', 'desc'),
          startAfter(lastDocument)
        );
      }

      jobsQuery = query(jobsQuery, limit(JOBS_PER_PAGE));

      const querySnapshot = await getDocs(jobsQuery);
      const jobsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Job[];

      setJobs(jobsData);

      if (querySnapshot.docs.length > 0) {
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } else {
        setLastDocument(null);
      }

      // Calculate total pages (inefficient, but works without aggregation)
      const allJobsSnapshot = await getDocs(collection(db, 'jobs'));
      const totalJobs = allJobsSnapshot.size;
      setTotalPages(Math.ceil(totalJobs / JOBS_PER_PAGE));

    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 ||
                          selectedCategories.some(cat => job.categories?.includes(cat));
    return matchesSearch && matchesCategory;
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="glass-card p-6 rounded-xl space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Filter by category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
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
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No jobs found matching your criteria.</p>
          </div>
        ) : (
          filteredJobs.map(job => (
            <div key={job.id} className="glass-card p-6 rounded-xl hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                  <p className="text-gray-400 mb-2">{job.company}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.budget} BTC</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(job.createdAt?.toDate()).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                  className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-all duration-300"
                >
                  {selectedJob === job.id ? 'Hide Contact' : 'Apply Now'}
                </button>
              </div>
              <p className="text-gray-300 mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {job.skills?.map(skill => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Contact Information */}
              {selectedJob === job.id && (
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${job.email}`} className="hover:text-purple-500">
                      {job.email}
                    </a>
                  </div>
                  {job.phone && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${job.phone}`} className="hover:text-purple-500">
                        {job.phone}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300'}`}
          >
            Previous
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
