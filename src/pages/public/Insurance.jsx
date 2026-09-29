import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Shield, CheckCircle, Phone, FileText } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { insuranceCompanies } from '../../data/insurance';

export default function Insurance() {
  return (
    <>
      <Helmet>
        <title>Insurance & Panel Companies - MEDICARE Hospital</title>
        <meta name="description" content="MEDICARE Hospital accepts all major insurance plans. Check our list of panel insurance companies." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Insurance & Panel Companies</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              We accept all major insurance plans to make healthcare affordable and accessible for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-surface dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Panel Companies"
            title="Insurance Partners"
            description="We work with leading insurance companies to provide cashless and reimbursement options for our patients."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {insuranceCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="p-6 text-center h-full">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield size={32} className="text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{company.name}</h3>
                  <Badge variant="teal">{company.type}</Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cashless Treatment</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Direct billing with panel insurance companies for hassle-free treatment.</p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText size={28} className="text-teal-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Claims</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Our billing department assists with insurance claims and documentation.</p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone size={28} className="text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Our insurance helpdesk is available round the clock to assist you.</p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
