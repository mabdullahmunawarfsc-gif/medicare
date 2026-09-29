import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Clock, Briefcase, X, Send } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { jobs } from '../../data/jobs';
import { useToast } from '../../context/ToastContext';

export default function Careers() {
  const { addToast } = useToast();
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterDept, setFilterDept] = useState('');

  const departments = [...new Set(jobs.map((j) => j.department))];
  const filteredJobs = filterDept ? jobs.filter((j) => j.department === filterDept) : jobs;

  const handleApply = () => {
    addToast('Application submitted successfully! We will review your application and contact you soon.', 'success');
    setSelectedJob(null);
  };

  return (
    <>
      <Helmet>
        <title>Careers - MEDICARE Hospital</title>
        <meta name="description" content="Join MEDICARE Hospital's team of healthcare professionals. View current job openings and apply online." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Careers at MEDICARE</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Join our team of dedicated healthcare professionals and make a difference in people's lives.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-surface dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter */}
          <div className="mb-8">
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
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                        <Badge variant="teal">{job.type}</Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><Briefcase size={14} /> {job.department}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {job.experience}</span>
                      </div>
                    </div>
                    <Button onClick={() => setSelectedJob(job)}>Apply Now</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <Modal isOpen={!!selectedJob} onClose={() => setSelectedJob(null)} title="Apply for Position" size="lg">
        {selectedJob && (
          <div>
            <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white">{selectedJob.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{selectedJob.department} | {selectedJob.location}</p>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="Enter your full name" />
                <Input label="Email" type="email" placeholder="Enter your email" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Phone" placeholder="Enter your phone number" />
                <Input label="CNIC" placeholder="Enter your CNIC" />
              </div>
              <Input label="Address" placeholder="Enter your address" />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Cover Letter / Message</label>
                <textarea
                  placeholder="Tell us why you're interested in this position..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Upload CV/Resume</label>
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Drag and drop your CV here, or click to browse</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOC up to 5MB</p>
                </div>
              </div>
              <Button className="w-full" onClick={handleApply}>
                <Send size={16} className="mr-2" />
                Submit Application
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
