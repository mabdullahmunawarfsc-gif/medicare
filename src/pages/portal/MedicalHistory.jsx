import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, FileText, Filter } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { patientMedicalHistory } from '../../data/patientData';

export default function MedicalHistory() {
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterType, setFilterType] = useState('');

  const doctors = [...new Set(patientMedicalHistory.map((h) => h.doctor))];
  const departments = [...new Set(patientMedicalHistory.map((h) => h.department))];
  const types = [...new Set(patientMedicalHistory.map((h) => h.type))];

  const filtered = useMemo(() => {
    return patientMedicalHistory.filter((item) => {
      const matchesDoctor = !filterDoctor || item.doctor === filterDoctor;
      const matchesDept = !filterDept || item.department === filterDept;
      const matchesType = !filterType || item.type === filterType;
      return matchesDoctor && matchesDept && matchesType;
    });
  }, [filterDoctor, filterDept, filterType]);

  return (
    <>
      <Helmet>
        <title>Medical History - MEDICARE Patient Portal</title>
      </Helmet>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medical History</h1>
          <p className="text-gray-500 dark:text-gray-400">View your complete medical timeline and visit history.</p>
        </motion.div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-4">
            <select
              value={filterDoctor}
              onChange={(e) => setFilterDoctor(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Doctors</option>
              {doctors.map((doc) => (
                <option key={doc} value={doc}>{doc}</option>
              ))}
            </select>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </Card>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-6">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative pl-16"
              >
                <div className="absolute left-4 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-gray-900" />
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="primary">{item.type}</Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.diagnosis}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.notes}</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><User size={14} /> {item.doctor}</span>
                        <span className="flex items-center gap-1"><FileText size={14} /> {item.department}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
