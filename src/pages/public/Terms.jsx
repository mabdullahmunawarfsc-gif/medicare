import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FileText, AlertCircle, CheckCircle, Users, CreditCard, Clock } from 'lucide-react';
import Card from '../../components/Card';

const sections = [
  {
    icon: FileText,
    title: 'Acceptance of Terms',
    content: 'By accessing and using MEDICARE Hospital\'s services, you accept and agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please do not use our services.',
  },
  {
    icon: Users,
    title: 'Patient Responsibilities',
    content: 'Patients are expected to provide accurate medical information, follow treatment plans, respect hospital staff and policies, and fulfill financial obligations for services rendered.',
  },
  {
    icon: CreditCard,
    title: 'Payment & Billing',
    content: 'Payment is due at the time of service unless otherwise arranged. We accept cash, credit/debit cards, and insurance. Please ensure your insurance information is current and valid.',
  },
  {
    icon: Clock,
    title: 'Appointments & Cancellations',
    content: 'We recommend arriving 15 minutes before your scheduled appointment. Please provide 24-hour notice for cancellations or rescheduling to avoid cancellation fees.',
  },
  {
    icon: AlertCircle,
    title: 'Medical Disclaimer',
    content: 'While we strive to provide accurate medical information, our website content is for general informational purposes only and should not replace professional medical advice, diagnosis, or treatment.',
  },
  {
    icon: CheckCircle,
    title: 'Limitation of Liability',
    content: 'MEDICARE Hospital shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the cost of services provided.',
  },
];

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - MEDICARE Hospital</title>
        <meta name="description" content="MEDICARE Hospital's terms and conditions of service." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Please read these terms carefully before using our services.
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
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              For questions about these Terms & Conditions, please contact us:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>Email: legal@medicare.com</li>
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
