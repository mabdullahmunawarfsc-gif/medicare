import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Phone, Ambulance, AlertTriangle, Heart, Clock, MapPin, CheckCircle } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const emergencySteps = [
  { step: 1, title: 'Call Emergency Number', description: 'Dial 0800-12345 or 1122 for immediate assistance.' },
  { step: 2, title: 'Provide Location', description: 'Clearly state your location and the nature of the emergency.' },
  { step: 3, title: 'Follow Instructions', description: 'Our operator will guide you through first aid steps if needed.' },
  { step: 4, title: 'Wait for Ambulance', description: 'Our rapid response team will reach you as quickly as possible.' },
];

export default function Emergency() {
  return (
    <>
      <Helmet>
        <title>Emergency Services - MEDICARE Hospital</title>
        <meta name="description" content="24/7 Emergency services at MEDICARE Hospital. Call 0800-12345 for immediate medical assistance." />
      </Helmet>

      {/* Hero */}
      <section className="bg-red-600 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={40} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Emergency Services</h1>
            <p className="text-lg text-red-100 max-w-2xl mx-auto mb-8">
              Our emergency department is equipped to handle all types of medical emergencies 24/7.
            </p>
            <a href="tel:080012345">
              <Button size="xl" variant="white" className="text-xl">
                <Phone size={24} className="mr-3" />
                Call: 0800-12345
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Emergency Numbers */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone size={32} className="text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Emergency Helpline</h3>
              <p className="text-3xl font-bold text-red-500">0800-12345</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Toll Free - 24/7</p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Ambulance size={32} className="text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ambulance Service</h3>
              <p className="text-3xl font-bold text-red-500">1122</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Rescue Emergency</p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart size={32} className="text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cardiac Emergency</h3>
              <p className="text-3xl font-bold text-red-500">042-35771234</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Direct Line</p>
            </Card>
          </div>
        </div>
      </section>

      {/* What to Do */}
      <section className="py-16 bg-surface dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">What to Do in an Emergency</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {emergencySteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Facilities */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Our Emergency Facilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: '24/7 Availability', description: 'Our emergency department never closes.' },
              { icon: Ambulance, title: 'Advanced Ambulances', description: 'Fully-equipped with life support systems.' },
              { icon: Heart, title: 'Cardiac Emergency Unit', description: 'Specialized care for heart emergencies.' },
              { icon: MapPin, title: 'Central Location', description: 'Easily accessible from all parts of the city.' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full">
                    <div className="w-14 h-14 bg-red-50 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon size={28} className="text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">In Case of Emergency</h2>
          <p className="text-red-100 mb-8">Don't wait. Call immediately for life-threatening emergencies.</p>
          <a href="tel:080012345">
            <Button size="xl" variant="white" className="text-xl">
              <Phone size={24} className="mr-3" />
              Call Now: 0800-12345
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
