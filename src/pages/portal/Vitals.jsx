import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, Heart, Droplets, Weight } from 'lucide-react';
import Card from '../../components/Card';
import Tabs from '../../components/Tabs';
import { patientVitals } from '../../data/patientData';

export default function Vitals() {
  const [activeTab, setActiveTab] = useState('bloodPressure');

  const tabs = [
    { value: 'bloodPressure', label: 'Blood Pressure' },
    { value: 'sugar', label: 'Blood Sugar' },
    { value: 'weight', label: 'Weight' },
    { value: 'heartRate', label: 'Heart Rate' },
  ];

  const chartConfig = {
    bloodPressure: {
      title: 'Blood Pressure Trend',
      icon: Heart,
      color: 'text-red-500',
      data: patientVitals.bloodPressure,
      lines: [
        { key: 'systolic', color: '#EF4444', name: 'Systolic' },
        { key: 'diastolic', color: '#3B82F6', name: 'Diastolic' },
      ],
      unit: 'mmHg',
    },
    sugar: {
      title: 'Blood Sugar Trend',
      icon: Droplets,
      color: 'text-blue-500',
      data: patientVitals.sugar,
      lines: [
        { key: 'fasting', color: '#10B981', name: 'Fasting' },
        { key: 'postMeal', color: '#F59E0B', name: 'Post Meal' },
      ],
      unit: 'mg/dL',
    },
    weight: {
      title: 'Weight Trend',
      icon: Weight,
      color: 'text-teal-500',
      data: patientVitals.weight,
      lines: [
        { key: 'weight', color: '#14B8A6', name: 'Weight' },
      ],
      unit: 'kg',
    },
    heartRate: {
      title: 'Heart Rate Trend',
      icon: Activity,
      color: 'text-pink-500',
      data: patientVitals.heartRate,
      lines: [
        { key: 'rate', color: '#EC4899', name: 'Heart Rate' },
      ],
      unit: 'bpm',
    },
  };

  const config = chartConfig[activeTab];
  const Icon = config.icon;

  return (
    <>
      <Helmet>
        <title>Vitals Tracker - MEDICARE Patient Portal</title>
      </Helmet>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vitals Tracker</h1>
          <p className="text-gray-500 dark:text-gray-400">Monitor your health metrics over time.</p>
        </motion.div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center`}>
              <Icon size={20} className={config.color} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{config.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Unit: {config.unit}</p>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={config.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#F9FAFB',
                  }}
                />
                <Legend />
                {config.lines.map((line) => (
                  <Line
                    key={line.key}
                    type="monotone"
                    dataKey={line.key}
                    stroke={line.color}
                    strokeWidth={2}
                    dot={{ fill: line.color, r: 4 }}
                    name={line.name}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Latest Reading', value: activeTab === 'bloodPressure' ? '120/76' : activeTab === 'sugar' ? '98/140' : activeTab === 'weight' ? '75.5' : '70', unit: config.unit },
            { label: 'Average', value: activeTab === 'bloodPressure' ? '126/81' : activeTab === 'sugar' ? '106/152' : activeTab === 'weight' ? '76.8' : '74', unit: config.unit },
            { label: 'Highest', value: activeTab === 'bloodPressure' ? '135/88' : activeTab === 'sugar' ? '115/170' : activeTab === 'weight' ? '78' : '80', unit: config.unit },
            { label: 'Lowest', value: activeTab === 'bloodPressure' ? '120/76' : activeTab === 'sugar' ? '98/140' : activeTab === 'weight' ? '75.5' : '70', unit: config.unit },
          ].map((stat) => (
            <Card key={stat.label} className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {stat.value} <span className="text-sm font-normal text-gray-500">{stat.unit}</span>
              </p>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
