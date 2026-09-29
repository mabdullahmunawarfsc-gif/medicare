import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Pill, Download, Calendar, User, Clock } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { patientPrescriptions } from '../../data/patientData';
import { useToast } from '../../context/ToastContext';

export default function Prescriptions() {
  const { addToast } = useToast();

  const handleDownload = (doctorName) => {
    addToast(`Prescription from ${doctorName} downloaded!`, 'success');
  };

  return (
    <>
      <Helmet>
        <title>Prescriptions - MEDICARE Patient Portal</title>
      </Helmet>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Prescriptions</h1>
          <p className="text-gray-500 dark:text-gray-400">View and download your current and past prescriptions.</p>
        </motion.div>

        <div className="space-y-6">
          {patientPrescriptions.map((prescription, index) => (
            <motion.div
              key={prescription.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                      <Pill size={24} className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{prescription.doctor}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{prescription.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Calendar size={14} /> {prescription.date}
                    </span>
                    <Button size="sm" variant="outline" onClick={() => handleDownload(prescription.doctor)}>
                      <Download size={14} className="mr-1" />
                      Download PDF
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Medicine</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Dosage</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Frequency</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Duration</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Instructions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {prescription.medicines.map((med, i) => (
                        <tr key={i}>
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{med.name}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{med.dosage}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{med.frequency}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{med.duration}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{med.instructions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
