import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { AlertCircle, Syringe, Calendar, User, Plus } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Tabs from '../../components/Tabs';
import { useState } from 'react';
import { patientAllergies, patientConditions, patientVaccinations } from '../../data/patientData';

export default function HealthRecords() {
  const [activeTab, setActiveTab] = useState('allergies');

  const tabs = [
    { value: 'allergies', label: 'Allergies' },
    { value: 'conditions', label: 'Chronic Conditions' },
    { value: 'vaccinations', label: 'Vaccinations' },
  ];

  return (
    <>
      <Helmet>
        <title>Health Records - MEDICARE Patient Portal</title>
      </Helmet>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Allergies, Conditions & Vaccinations</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your health records and immunization history.</p>
          </div>
          <Button>
            <Plus size={16} className="mr-2" />
            Add Record
          </Button>
        </motion.div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {/* Allergies */}
        {activeTab === 'allergies' && (
          <div className="space-y-4">
            {patientAllergies.map((allergy, index) => (
              <motion.div
                key={allergy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                        <AlertCircle size={24} className="text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{allergy.allergen}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant={allergy.severity === 'High' ? 'red' : allergy.severity === 'Medium' ? 'yellow' : 'green'}>
                            {allergy.severity} Severity
                          </Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Diagnosed: {allergy.diagnosed}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                          <strong>Reaction:</strong> {allergy.reaction}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Chronic Conditions */}
        {activeTab === 'conditions' && (
          <div className="space-y-4">
            {patientConditions.map((condition, index) => (
              <motion.div
                key={condition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                        <Calendar size={24} className="text-primary-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{condition.condition}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant={condition.status === 'Active' ? 'yellow' : 'green'}>{condition.status}</Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Since: {condition.diagnosed}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{condition.notes}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          <User size={14} className="inline mr-1" />
                          <strong>Doctor:</strong> {condition.doctor}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Vaccinations */}
        {activeTab === 'vaccinations' && (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Vaccine</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Dose</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Doctor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {patientVaccinations.map((vaccine, index) => (
                    <motion.tr
                      key={vaccine.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Syringe size={18} className="text-teal-500" />
                          <span className="font-medium text-gray-900 dark:text-white">{vaccine.vaccine}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{vaccine.dose}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{vaccine.date}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{vaccine.doctor}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
