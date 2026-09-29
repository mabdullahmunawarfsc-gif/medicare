import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Clock, FileText, Car, CreditCard, Phone, MapPin, CheckCircle, Users } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';
import Accordion from '../../components/Accordion';
import { faqs } from '../../data/faqs';

const facilities = [
  { icon: Clock, title: '24/7 Emergency', description: 'Round-the-clock emergency services with rapid response team.' },
  { icon: Car, title: 'Free Parking', description: 'Complimentary parking for patients and visitors with 500+ spaces.' },
  { icon: CreditCard, title: 'Multiple Payment Options', description: 'Cash, card, insurance, and installment plans available.' },
  { icon: Users, title: 'Waiting Lounge', description: 'Comfortable waiting areas with TV, WiFi, and refreshments.' },
  { icon: MapPin, title: 'Cafeteria', description: 'In-house cafeteria serving healthy meals and snacks.' },
  { icon: Phone, title: 'Pharmacy', description: '24/7 in-house pharmacy with all essential medicines.' },
];

const visitingHours = [
  { area: 'General Wards', hours: '10:00 AM - 8:00 PM', days: 'Daily' },
  { area: 'ICU', hours: '11:00 AM - 12:00 PM, 5:00 PM - 6:00 PM', days: 'Daily' },
  { area: 'Pediatric Ward', hours: '24/7 (One attendant allowed)', days: 'Daily' },
  { area: 'Emergency', hours: '24/7', days: 'Daily' },
];

export default function PatientGuide() {
  return (
    <>
      <Helmet>
        <title>Patient Guide - MEDICARE Hospital</title>
        <meta name="description" content="Visitor information, visiting hours, admission process, facilities, and FAQs for MEDICARE Hospital patients." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Patient Guide</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Everything you need to know about visiting MEDICARE Hospital, admission process, and facilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visiting Hours */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Visiting Hours"
            title="When Can You Visit?"
            description="Please respect our visiting hours to ensure patients get adequate rest and recovery time."
          />
          <div className="max-w-3xl mx-auto">
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Area</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Hours</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Days</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {visitingHours.map((item) => (
                    <tr key={item.area}>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.area}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.hours}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-surface dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Admission Process"
            title="How to Get Admitted"
            description="Our admission process is designed to be smooth and hassle-free for patients and their families."
          />
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: 1, title: 'Registration', description: 'Visit the registration desk with your CNIC and doctor\'s referral.' },
              { step: 2, title: 'Documentation', description: 'Complete admission forms and provide insurance details if applicable.' },
              { step: 3, title: 'Room Allocation', description: 'Our team will assign a room based on your needs and availability.' },
              { step: 4, title: 'Treatment Begins', description: 'Our medical team will begin your treatment plan immediately.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Facilities"
            title="Amenities for Patients & Visitors"
            description="We provide a range of facilities to make your visit comfortable and convenient."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <motion.div
                  key={facility.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={24} className="text-primary-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{facility.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{facility.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-surface dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4">
          <SectionTitle
            subtitle="FAQs"
            title="Frequently Asked Questions"
            description="Find answers to common questions about visiting MEDICARE Hospital."
          />
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  );
}
