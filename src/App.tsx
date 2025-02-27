import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Freelancers } from './pages/Freelancers';
import { Jobs } from './pages/Jobs';
import { BecomeFreelancer } from './pages/BecomeFreelancer';
import { PostJob } from './pages/PostJob';
import { TermsOfService } from './pages/TermsOfService';

export type Page = 'home' | 'freelancers' | 'jobs' | 'become-freelancer' | 'post-job' | 'terms-of-service';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'freelancers':
        return <Freelancers />;
      case 'jobs':
        return <Jobs />;
      case 'become-freelancer':
        return <BecomeFreelancer />;
      case 'post-job':
        return <PostJob />;
      case 'terms-of-service':
        return <TermsOfService />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
