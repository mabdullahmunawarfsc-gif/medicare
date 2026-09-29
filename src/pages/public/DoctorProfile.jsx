import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Star, Calendar, Clock, Award, GraduationCap, Briefcase, MessageSquare } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Tabs from '../../components/Tabs';
import { doctors } from '../../data/doctors';

export default function DoctorProfile() {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === parseInt(id));

  if (!doctor) return <Navigate to="/doctors" replace />;

  const tabs = [
    { value: 'about', label: 'About' },
    { value: 'schedule', label: 'Schedule' },
    { value: 'reviews', label: `Reviews (${doctor.reviews.length})` },
  ];

  return (
    <>
      <Helmet>
        <title>{doctor.name} - MEDICARE Hospital</title>
        <meta name="description" content={`${doctor.name} - ${doctor.specialty} at MEDICARE Hospital. ${doctor.qualification}, ${doctor.experience} years experience.`} />
      </Helmet>

      <section className="bg-surface dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/doctors" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-6 transition-colors">
            <ArrowLeft size={18} />
            Back to Doctors
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-32 h-32 rounded-2xl object-cover"
                    />
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{doctor.name}</h1>
                      <p className="text-primary-500 font-medium text-lg mb-2">{doctor.specialty}</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{doctor.qualification}</p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Star size={18} className="text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-gray-500 dark:text-gray-400">({doctor.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Briefcase size={18} />
                          <span>{doctor.experience} years experience</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="primary">{doctor.department}</Badge>
                        <Badge variant="teal">{doctor.gender}</Badge>
                        <Badge variant="green">Available</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Tabs */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="p-8 mt-6">
                  <Tabs tabs={tabs} activeTab="about" onChange={() => {}} />
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About</h3>
                    <p className="text-gray-600 dark:text-gray-400">{doctor.about}</p>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Education</h3>
                    <ul className="space-y-2">
                      {doctor.education.map((edu, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                          <GraduationCap size={18} className="text-primary-500 shrink-0 mt-0.5" />
                          {edu}
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Work Experience</h3>
                    <ul className="space-y-3">
                      {doctor.workHistory.map((exp, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{exp.role}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{exp.hospital} | {exp.period}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Consultation Fee</h3>
                  <div className="text-3xl font-bold text-primary-500 mb-4">
                    PKR {doctor.fee.toLocaleString()}
                  </div>
                  <Link to={`/book-appointment?doctor=${doctor.id}`}>
                    <Button className="w-full" size="lg">
                      <Calendar size={18} className="mr-2" />
                      Book Appointment
                    </Button>
                  </Link>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Schedule</h3>
                  <div className="space-y-3">
                    {doctor.schedule.map((day) => (
                      <div key={day.day} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{day.day}</span>
                        <span className="text-gray-900 dark:text-white font-medium">{day.slots[0]} - {day.slots[day.slots.length - 1]}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((lang) => (
                      <Badge key={lang} variant="gray">{lang}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
