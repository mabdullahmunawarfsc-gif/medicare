import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Phone } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { services } from '../../data/services';

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services - MEDICARE Hospital</title>
        <meta name="description" content="Explore MEDICARE Hospital's comprehensive healthcare services including emergency, ICU, ambulance, pharmacy, laboratory, and more." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Comprehensive healthcare services designed to meet all your medical needs under one roof.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-surface dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card hover className="overflow-hidden h-full">
                    <div className="relative h-48">
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Icon size={24} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{service.name}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle size={16} className="text-teal-500 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="bg-red-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Phone size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Need Emergency Assistance?</h3>
                <p className="text-red-100">Our emergency team is available 24/7</p>
              </div>
            </div>
            <a href="tel:080012345">
              <Button size="lg" variant="white">
                <Phone size={18} className="mr-2" />
                Call: 0800-12345
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
