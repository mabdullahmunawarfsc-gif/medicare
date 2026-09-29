import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Shield, Eye, Lock, Database, UserCheck, Bell } from 'lucide-react';
import Card from '../../components/Card';

const sections = [
  {
    icon: Database,
    title: 'Information We Collect',
    content: 'We collect personal information including your name, contact details, medical history, and payment information when you use our services. This information is necessary to provide you with quality healthcare services.',
  },
  {
    icon: Eye,
    title: 'How We Use Your Information',
    content: 'Your information is used to provide medical services, process appointments, maintain medical records, communicate with you about your treatment, and improve our healthcare services.',
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: 'We implement industry-standard security measures to protect your personal and medical information. All data is encrypted and stored securely with restricted access authorized personnel only.',
  },
  {
    icon: UserCheck,
    title: 'Your Rights',
    content: 'You have the right to access, correct, or delete your personal information. You may also request a copy of your medical records or withdraw consent for data processing at any time.',
  },
  {
    icon: Bell,
    title: 'Cookies & Tracking',
    content: 'Our website may use cookies to enhance your browsing experience. You can control cookie settings through your browser preferences.',
  },
  {
    icon: Shield,
    title: 'Third-Party Disclosure',
    content: 'We do not sell or share your personal information with third parties except as required by law or with your explicit consent for treatment purposes.',
  },
];

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - MEDICARE Hospital</title>
        <meta name="description" content="MEDICARE Hospital's privacy policy. Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-surface dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center shrink-0">
                        <Icon size={24} className="text-primary-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{section.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <Card className="p-8 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>Email: privacy@medicare.com</li>
              <li>Phone: 0800-12345</li>
              <li>Address: 123 Healthcare Avenue, Gulberg III, Lahore, Pakistan</li>
            </ul>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-6">
              Last updated: September 2026
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
