import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, Clock, Home, FileText } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { labTests } from '../../data/labTests';
import { useToast } from '../../context/ToastContext';

export default function LabTests() {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(labTests.map((t) => t.category))];

  const filteredTests = useMemo(() => {
    return labTests.filter((test) => {
      const matchesSearch = !search || test.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || test.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const handleBook = (testName) => {
    addToast(`${testName} booked successfully!`, 'success');
  };

  return (
    <>
      <Helmet>
        <title>Lab Tests - MEDICARE Hospital</title>
        <meta name="description" content="Book laboratory tests at MEDICARE Hospital. Home sampling available with online reports." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Lab Tests & Diagnostics</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Book laboratory tests online with home sampling and get reports delivered digitally.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-surface dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search & Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tests..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Showing {filteredTests.length} of {labTests.length} tests
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
              >
                <Card className="p-5 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex-1">{test.name}</h3>
                    <Badge variant="primary">{test.category}</Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <FileText size={14} />
                      <span>Sample: {test.sample}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock size={14} />
                      <span>Report: {test.reportTime}</span>
                    </div>
                    {test.fasting && (
                      <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
                        <span className="font-medium">Fasting Required</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary-500">PKR {test.price.toLocaleString()}</span>
                    <Button size="sm" onClick={() => handleBook(test.name)}>Book Test</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No tests found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Home Sampling CTA */}
      <section className="py-16 bg-teal-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Home size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Home Sampling Available</h3>
                <p className="text-teal-100">Get your samples collected from the comfort of your home</p>
              </div>
            </div>
            <a href="tel:080012345">
              <Button size="lg" variant="white">
                Book Home Sampling
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
