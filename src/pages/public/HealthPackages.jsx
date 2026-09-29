import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Phone } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { healthPackages } from '../../data/packages';
import { useToast } from '../../context/ToastContext';

export default function HealthPackages() {
  const { addToast } = useToast();

  const handleBook = (pkgName) => {
    addToast(`${pkgName} booked successfully! We will contact you shortly.`, 'success');
  };

  return (
    <>
      <Helmet>
        <title>Health Packages - MEDICARE Hospital</title>
        <meta name="description" content="Comprehensive health checkup packages at affordable prices. Basic, Executive, Women's Health, Cardiac, and Diabetes packages available." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Health Packages</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Comprehensive health checkup packages designed for prevention and early detection of diseases.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-surface dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-48">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {pkg.popular && (
                      <Badge variant="teal" className="absolute top-4 right-4">Most Popular</Badge>
                    )}
                    <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{pkg.name}</h3>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{pkg.description}</p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-primary-500">PKR {pkg.price.toLocaleString()}</span>
                      <span className="text-lg text-gray-400 line-through ml-2">PKR {pkg.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="mb-6 flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Included Tests:</h4>
                      <ul className="space-y-2">
                        {pkg.tests.slice(0, 5).map((test) => (
                          <li key={test} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle size={16} className="text-teal-500 shrink-0 mt-0.5" />
                            {test}
                          </li>
                        ))}
                        {pkg.tests.length > 5 && (
                          <li className="text-sm text-primary-500 font-medium">
                            +{pkg.tests.length - 5} more tests
                          </li>
                        )}
                      </ul>
                    </div>
                    <Button className="w-full" onClick={() => handleBook(pkg.name)}>
                      Book Now
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Help Choosing?</h2>
          <p className="text-blue-100 mb-8">Our health experts can help you select the right package for your needs.</p>
          <a href="tel:080012345">
            <Button size="lg" variant="white">
              <Phone size={18} className="mr-2" />
              Call: 0800-12345
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
