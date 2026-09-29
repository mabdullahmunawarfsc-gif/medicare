import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle, Users, Calendar } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { departments } from '../../data/departments';
import { doctors } from '../../data/doctors';

export default function DepartmentDetail() {
  const { id } = useParams();
  const department = departments.find((d) => d.id === id);

  if (!department) return <Navigate to="/departments" replace />;

  const deptDoctors = doctors.filter((d) => d.department === department.name);

  return (
    <>
      <Helmet>
        <title>{department.name} - MEDICARE Hospital</title>
        <meta name="description" content={department.description} />
      </Helmet>

      {/* Hero */}
      <section className="relative h-64 md:h-80">
        <img src={department.image} alt={department.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <Link to="/departments" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft size={18} />
              Back to Departments
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{department.name}</h1>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About {department.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">{department.description}</p>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Services</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {department.services.map((service) => (
                      <div key={service} className="flex items-center gap-3">
                        <CheckCircle size={20} className="text-teal-500 shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{service}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Doctors */}
              {deptDoctors.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our {department.name} Specialists</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {deptDoctors.map((doctor) => (
                      <Link key={doctor.id} to={`/doctors/${doctor.id}`}>
                        <Card hover className="p-6">
                          <div className="flex items-start gap-4">
                            <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-xl object-cover" />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
                              <p className="text-sm text-primary-500">{doctor.specialty}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{doctor.experience} years experience</p>
                              <div className="flex items-center gap-1 mt-2">
                                <span className="text-yellow-400">★</span>
                                <span className="text-sm font-medium">{doctor.rating}</span>
                                <span className="text-xs text-gray-400">({doctor.reviews} reviews)</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Department Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Doctors</span>
                      <Badge variant="primary">{department.doctors}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Patients Treated</span>
                      <Badge variant="teal">{department.patients}</Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Book Appointment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Schedule a consultation with our {department.name} specialists.
                  </p>
                  <Link to={`/book-appointment?dept=${department.name}`}>
                    <Button className="w-full">
                      <Calendar size={16} className="mr-2" />
                      Book Now
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
