import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Award, Target, Eye, Heart, Users, Shield, Clock, CheckCircle } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';
import { leadership } from '../../data/leadership';
import { timeline } from '../../data/timeline';

const values = [
  { icon: Heart, title: 'Compassion', description: 'We treat every patient with empathy, kindness, and respect.' },
  { icon: Shield, title: 'Integrity', description: 'We uphold the highest ethical standards in everything we do.' },
  { icon: Users, title: 'Teamwork', description: 'We collaborate across disciplines to provide comprehensive care.' },
  { icon: Award, title: 'Excellence', description: 'We strive for the best outcomes through continuous improvement.' },
];

const accreditations = [
  'Joint Commission International (JCI) Accreditation',
  'ISO 9001:2015 Quality Management Certification',
  'College of Physicians & Surgeons Pakistan (CPSP) Recognition',
  'Pakistan Medical Commission (PMC) Accreditation',
  'National Accreditation Board for Testing & Calibration Laboratories (NABL)',
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - MEDICARE Hospital</title>
        <meta name="description" content="Learn about MEDICARE Hospital's history, mission, values, and leadership team." />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About MEDICARE</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Two decades of compassionate care, medical excellence, and unwavering commitment to our patients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="p-8 h-full">
                <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-6">
                  <Target size={28} className="text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  To provide accessible, affordable, and high-quality healthcare services that improve the health and well-being of our patients and communities, while maintaining the highest standards of medical ethics and patient safety.
                </p>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="p-8 h-full">
                <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mb-6">
                  <Eye size={28} className="text-teal-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  To be the leading healthcare institution in the region, recognized for clinical excellence, innovative treatments, and compassionate care, while making quality healthcare accessible to all segments of society.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-surface dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Our Values"
            title="What We Stand For"
            description="The core principles that guide everything we do at MEDICARE."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full">
                    <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon size={28} className="text-primary-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{value.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Our Journey"
            title="Milestones & Achievements"
            description="Key moments that have shaped MEDICARE into what it is today."
          />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative flex items-start gap-4 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <Card className="p-6 inline-block">
                      <span className="text-primary-500 font-bold text-lg">{item.year}</span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{item.description}</p>
                    </Card>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full -translate-x-1/2 mt-6" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-surface dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Leadership"
            title="Meet Our Leadership Team"
            description="Experienced professionals guiding MEDICARE towards excellence."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6 text-center">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{leader.name}</h3>
                  <p className="text-primary-500 font-medium text-sm mb-3">{leader.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{leader.bio}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Accreditations"
            title="Certified Excellence"
            description="Our commitment to quality is recognized by leading international bodies."
          />
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <ul className="space-y-4">
                {accreditations.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle size={20} className="text-teal-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
