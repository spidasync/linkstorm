import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, startAfter, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Search, Mail, Phone, Github, Linkedin } from 'lucide-react';

interface Freelancer {
  id: string;
  name: string;
  title: string;
  rate: string;
  rateType: 'hourly' | 'fixed';
  about: string;
  skills: string[];
  email: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  profilePicture?: string;
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

const FREELANCERS_PER_PAGE = 24;

export function Freelancers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFreelancer, setSelectedFreelancer] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastDocument, setLastDocument] = useState<any>(null);

  const skills = ALL_TAGS;

  useEffect(() => {
    fetchFreelancers();
  }, [currentPage, selectedSkills, searchTerm]);

  const fetchFreelancers = async () => {
    setLoading(true);
    try {
      let freelancersQuery = query(
        collection(db, 'freelancers'),
        orderBy('createdAt', 'desc')
      );

      if (lastDocument && currentPage > 1) {
        freelancersQuery = query(
          collection(db, 'freelancers'),
          orderBy('createdAt', 'desc'),
          startAfter(lastDocument)
        );
      }

      freelancersQuery = query(freelancersQuery, limit(FREELANCERS_PER_PAGE));

      const querySnapshot = await getDocs(freelancersQuery);
      const freelancersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Freelancer[];

      setFreelancers(freelancersData);

      if (querySnapshot.docs.length > 0) {
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } else {
        setLastDocument(null);
      }

      // Calculate total pages (inefficient, but works without aggregation)
      const allFreelancersSnapshot = await getDocs(collection(db, 'freelancers'));
      const totalFreelancers = allFreelancersSnapshot.size;
      setTotalPages(Math.ceil(totalFreelancers / FREELANCERS_PER_PAGE));

    } catch (error) {
      console.error('Error fetching freelancers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.about.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 ||
                         selectedSkills.some(skill => freelancer.skills?.includes(skill));
    return matchesSearch && matchesSkills;
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
            placeholder="Search freelancers..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Filter by skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <button
                key={skill}
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
      </div>

      {/* Freelancers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading freelancers...</p>
          </div>
        ) : filteredFreelancers.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-400">No freelancers found matching your criteria.</p>
          </div>
        ) : (
          filteredFreelancers.map(freelancer => (
            <div key={freelancer.id} className="glass-card rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {freelancer.profilePicture ? (
                    <img 
                      src={freelancer.profilePicture} 
                      alt={freelancer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-purple-500">
                        {freelancer.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{freelancer.name}</h3>
                    <p className="text-gray-400">{freelancer.title}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{freelancer.about}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {freelancer.skills?.map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-500 font-semibold">
                    {freelancer.rate} BTC
                    {freelancer.rateType === 'hourly' ? '/hour' : '/project'}
                  </span>
                  <button
                    onClick={() => setSelectedFreelancer(selectedFreelancer === freelancer.id ? null : freelancer.id)}
                    className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-all duration-300"
                  >
                    {selectedFreelancer === freelancer.id ? 'Hide Contact' : 'Contact'}
                  </button>
                </div>
                
                {/* Contact Information */}
                {selectedFreelancer === freelancer.id && (
                  <div className="mt-4 pt-4 border-t border-gray-700 space-y-2 animate-fade-in">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${freelancer.email}`} className="hover:text-purple-500">
                        {freelancer.email}
                      </a>
                    </div>
                    {freelancer.phone && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${freelancer.phone}`} className="hover:text-purple-500">
                          {freelancer.phone}
                        </a>
                      </div>
                    )}
                    {freelancer.github && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Github className="w-4 h-4" />
                        <a href={freelancer.github} target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">
                          GitHub Profile
                        </a>
                      </div>
                    )}
                    {freelancer.linkedin && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Linkedin className="w-4 h-4" />
                        <a href={freelancer.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
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
