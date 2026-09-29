import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Video, Calendar, Shield, Clock, CheckCircle, Phone, Monitor } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const benefits = [
  { icon: Video, title: 'Face-to-Face Consultation', description: 'Connect with specialists via secure video calls from anywhere.' },
  { icon: Clock, title: 'Flexible Scheduling', description: 'Book appointments at your convenience, including evenings and weekends.' },
  { icon: Shield, title: 'Secure & Private', description: 'Your consultations are encrypted and completely confidential.' },
  { icon: Monitor, title: 'E-Prescriptions', description: 'Receive digital prescriptions that can be used at any pharmacy.' },
];

const steps = [
  { step: 1, title: 'Book Appointment', description: 'Choose your preferred doctor and time slot.' },
  { step: 2, title: 'Receive Link', description: 'Get a secure video link via SMS and email.' },
  { step: 3, title: 'Join Consultation', description: 'Click the link at your scheduled time to start.' },
  { step: 4, title: 'Get Prescription', description: 'Receive e-prescription and follow-up instructions.' },
];

export default function OnlineConsultation() {
  return (
    <>
      <Helmet>
        <title>Online Consultation - MEDICARE Hospital</title>
        <meta name="description" content="Consult with MEDICARE specialists online via secure video calls from the comfort of your home." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Online Consultation</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Consult with our specialists from the comfort of your home via secure video calls.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop"
                alt="Online consultation"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Virtual Healthcare at Your Fingertips</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our online consultation service allows you to connect with our experienced specialists without leaving your home. Whether you're unable to visit the hospital or prefer the convenience of virtual care, we've got you covered.
              </p>
              <ul className="space-y-3 mb-8">
                {['Secure and private video consultations', 'E-prescriptions sent directly to your phone', 'Follow-up care and support', 'Available 7 days a week'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <CheckCircle size={20} className="text-teal-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/book-appointment">
                <Button size="lg">
                  <Calendar size={18} className="mr-2" />
                  Book Online Consultation
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Benefits"
            title="Why Choose Online Consultation?"
            description="Experience quality healthcare without the hassle of travel and waiting rooms."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full">
                    <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon size={28} className="text-primary-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="How It Works"
            title="Get Started in 4 Simple Steps"
            description="Your virtual consultation is just a few clicks away."
          />
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((item, index) => (
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

      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Consult Online?</h2>
          <p className="text-blue-100 mb-8">Book your virtual appointment today and get expert medical advice from home.</p>
          <Link to="/book-appointment">
            <Button size="lg" variant="white">
              <Video size={18} className="mr-2" />
              Book Now
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
