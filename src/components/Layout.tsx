import React from 'react';
import { Page } from '../App';
import { Menu, X } from 'lucide-react';
import { Bitcoin } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const NavButton = ({ page, children }: { page: Page; children: React.ReactNode }) => (
    <button
      onClick={() => {
        onNavigate(page);
        setMobileMenuOpen(false);
      }}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        currentPage === page
          ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]'
          : 'hover:bg-purple-600/10'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button className="flex items-center gap-4" onClick={() => onNavigate('home')}>
              <Bitcoin className="w-8 h-8 text-purple-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Bitwork
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <NavButton page="freelancers">Freelancers</NavButton>
              <NavButton page="jobs">Jobs</NavButton>
              <NavButton page="become-freelancer">Become a Freelancer</NavButton>
              <NavButton page="post-job">Post a Job</NavButton>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavButton page="freelancers">Freelancers</NavButton>
              <NavButton page="jobs">Jobs</NavButton>
              <NavButton page="become-freelancer">Become a Freelancer</NavButton>
              <NavButton page="post-job">Post a Job</NavButton>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

      <footer className="border-t border-gray-800 bg-gray-900/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Bitwork</h3>
              <p className="text-gray-400">
                Revolutionizing freelance work with secure Bitcoin payments and a
                community of talented developers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => onNavigate('freelancers')}
                    className="text-gray-400 hover:text-purple-500"
                  >
                    Find Freelancers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('jobs')}
                    className="text-gray-400 hover:text-purple-500"
                  >
                    Browse Jobs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('become-freelancer')}
                    className="text-gray-400 hover:text-purple-500"
                  >
                    Become a Freelancer
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <button
              onClick={() => onNavigate('terms-of-service')}
              className="text-gray-400 hover:text-purple-500 mr-4"
            >
              Terms of Service
            </button>
            <p>&copy; {new Date().getFullYear()} Bitwork. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
