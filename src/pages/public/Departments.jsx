import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Users } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';
import { departments } from '../../data/departments';

export default function Departments() {
  return (
    <>
      <Helmet>
        <title>Departments - MEDICARE Hospital</title>
        <meta name="description" content="Explore MEDICARE Hospital's 12+ specialized departments with expert doctors and advanced facilities." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Departments</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Comprehensive medical care across 12+ specialized departments with state-of-the-art facilities.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-surface dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/departments/${dept.id}`}>
                  <Card hover className="overflow-hidden h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img src={dept.image} alt={dept.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{dept.name}</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{dept.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Users size={16} />
                          <span>{dept.doctors} Doctors</span>
                        </div>
                        <span className="text-primary-500 font-medium text-sm flex items-center gap-1">
                          View Details <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
