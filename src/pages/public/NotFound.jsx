import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - MEDICARE Hospital</title>
      </Helmet>

      <section className="min-h-[70vh] flex items-center justify-center bg-surface dark:bg-gray-900 py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-9xl font-bold text-primary-200 dark:text-primary-800 mb-4">404</div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/">
                <Button size="lg">
                  <Home size={18} className="mr-2" />
                  Go Home
                </Button>
              </Link>
              <Link to="/doctors">
                <Button size="lg" variant="outline">
                  <Search size={18} className="mr-2" />
                  Find a Doctor
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
