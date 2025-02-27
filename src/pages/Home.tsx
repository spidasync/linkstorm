import React from 'react';
import { ArrowRight, Code2, Shield, Coins, Users, Search, Lightbulb } from 'lucide-react';
import { Page } from '../App';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-pink-700 opacity-20 rounded-2xl blur-2xl"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Find the Perfect <span className="text-purple-400">Freelance</span> Developer
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Connect with top-tier developers and unlock your project's potential. Secure Bitcoin payments, guaranteed satisfaction.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={() => onNavigate('freelancers')}
              className="group px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors duration-300"
            >
              Find a Developer <ArrowRight className="w-5 h-5 ml-2 inline-block transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate('post-job')}
              className="group px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-300"
            >
              Post a Job <ArrowRight className="w-5 h-5 ml-2 inline-block transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="glass-card p-6 rounded-xl text-center">
            <Code2 className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Vetted Developers</h3>
            <p className="text-gray-400">Only the best developers make it onto our platform. Ensuring quality and reliability.</p>
          </div>
          {/* Feature 2 */}
          <div className="glass-card p-6 rounded-xl text-center">
            <Shield className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Bitcoin Payments</h3>
            <p className="text-gray-400">Hassle-free and secure transactions using Bitcoin. Escrow services available for added protection.</p>
          </div>
          {/* Feature 3 */}
          <div className="glass-card p-6 rounded-xl text-center">
            <Coins className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Competitive Rates</h3>
            <p className="text-gray-400">Find developers that fit your budget. Transparent pricing and no hidden fees.</p>
          </div>
          {/* Feature 4 */}
          <div className="glass-card p-6 rounded-xl text-center">
            <Users className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
            <p className="text-gray-400">We're here to help you every step of the way. Get support when you need it.</p>
          </div>
          {/* Feature 5 */}
          <div className="glass-card p-6 rounded-xl text-center">
            <Search className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
            <p className="text-gray-400">Easily find developers with the skills you need. Filter by technology, experience, and more.</p>
          </div>
          {/* Feature 6 */}
          <div className="glass-card p-6 rounded-xl text-center">
            <Lightbulb className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Project Management Tools</h3>
            <p className="text-gray-400">Keep your projects on track with our integrated project management tools.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="glass-card p-6 rounded-xl">
            <p className="text-gray-400 italic mb-4">"Bitwork connected us with a fantastic developer who delivered our project on time and within budget. Highly recommended!"</p>
            <p className="font-semibold">- John Doe, CEO</p>
          </div>
          {/* Testimonial 2 */}
          <div className="glass-card p-6 rounded-xl">
            <p className="text-gray-400 italic mb-4">"The secure Bitcoin payment system gave us peace of mind. We knew our funds were safe and the developer was motivated to deliver quality work."</p>
            <p className="font-semibold">- Jane Smith, CTO</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-8">Ready to Transform Your Project?</h2>
        <p className="text-xl text-gray-400 mb-12">Join Bitwork today and experience the future of freelance development.</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => onNavigate('become-freelancer')}
            className="group px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors duration-300"
          >
            Become a Freelancer <ArrowRight className="w-5 h-5 ml-2 inline-block transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => onNavigate('post-job')}
            className="group px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-300"
          >
            Post a Job <ArrowRight className="w-5 h-5 ml-2 inline-block transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
