import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, Video, MapPin, X, AlertCircle } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Tabs from '../../components/Tabs';
import { patientAppointments } from '../../data/patientData';
import { useToast } from '../../context/ToastContext';

export default function Appointments() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [cancelModal, setCancelModal] = useState(null);
  const [appointments, setAppointments] = useState(patientAppointments);

  const tabs = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'past', label: 'Past' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const filtered = appointments.filter((a) => a.status === activeTab);

  const handleCancel = () => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === cancelModal.id ? { ...a, status: 'cancelled' } : a))
    );
    addToast('Appointment cancelled successfully', 'info');
    setCancelModal(null);
  };

  const handleReschedule = (id) => {
    addToast('Reschedule request submitted. We will contact you shortly.', 'success');
  };

  return (
    <>
      <Helmet>
        <title>Appointments - MEDICARE Patient Portal</title>
      </Helmet>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Appointments</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your upcoming, past, and cancelled appointments.</p>
        </motion.div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="space-y-4">
          {filtered.length > 0 ? filtered.map((apt, index) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                      <Calendar size={24} className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{apt.doctor}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{apt.department}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {apt.date}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {apt.time}</span>
                        <span className="flex items-center gap-1">
                          {apt.type === 'Video' ? <Video size={14} /> : <MapPin size={14} />}
                          {apt.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={apt.status === 'upcoming' ? 'green' : apt.status === 'completed' ? 'primary' : 'red'}>
                      {apt.status}
                    </Badge>
                    {apt.status === 'upcoming' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleReschedule(apt.id)}>
                          Reschedule
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => setCancelModal(apt)}>
                          <X size={14} className="mr-1" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )) : (
            <Card className="p-12 text-center">
              <Calendar size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No {activeTab} appointments found.</p>
            </Card>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <Modal isOpen={!!cancelModal} onClose={() => setCancelModal(null)} title="Cancel Appointment" size="sm">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cancel Appointment?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to cancel your appointment with {cancelModal?.doctor} on {cancelModal?.date}?
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setCancelModal(null)}>
              Keep Appointment
            </Button>
            <Button variant="danger" className="flex-1" onClick={handleCancel}>
              Yes, Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
