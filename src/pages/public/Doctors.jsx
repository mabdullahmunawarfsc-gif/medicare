import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, Star, Filter, X } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { doctors } from '../../data/doctors';
import { departments } from '../../data/departments';

export default function Doctors() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSearch = !search || 
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
        doc.department.toLowerCase().includes(search.toLowerCase());
      const matchesDept = !selectedDept || doc.department === selectedDept;
      const matchesGender = !selectedGender || doc.gender === selectedGender;
      return matchesSearch && matchesDept && matchesGender;
    });
  }, [search, selectedDept, selectedGender]);

  const clearFilters = () => {
    setSearch('');
    setSelectedDept('');
    setSelectedGender('');
  };

  return (
    <>
      <Helmet>
        <title>Find a Doctor - MEDICARE Hospital</title>
        <meta name="description" content="Find and book appointments with MEDICARE Hospital's expert specialists across all departments." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find a Doctor</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Search from our team of 200+ expert specialists and book your appointment online.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-surface dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search & Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, specialty, or department..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter size={18} className="mr-2" />
                Filters
              </Button>
            </div>

            {/* Filter Options */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:block mt-4`}>
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {(search || selectedDept || selectedGender) && (
                  <Button variant="ghost" onClick={clearFilters}>
                    <X size={16} className="mr-1" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Showing {filteredDoctors.length} of {doctors.length} doctors
          </p>

          {/* Doctor Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/doctors/${doctor.id}`}>
                  <Card hover className="p-6 h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{doctor.name}</h3>
                        <p className="text-primary-500 font-medium">{doctor.specialty}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.qualification}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium">{doctor.rating}</span>
                          </div>
                          <span className="text-gray-300 dark:text-gray-600">|</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{doctor.reviews} reviews</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Experience</span>
                        <span className="font-medium text-gray-900 dark:text-white">{doctor.experience} years</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Fee</span>
                        <span className="font-medium text-primary-500">PKR {doctor.fee.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Next Available</span>
                        <Badge variant="green">{doctor.nextAvailable}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/doctors/${doctor.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">View Profile</Button>
                      </Link>
                      <Link to={`/book-appointment?doctor=${doctor.id}`} className="flex-1">
                        <Button className="w-full">Book Now</Button>
                      </Link>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No doctors found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">Clear Filters</Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
