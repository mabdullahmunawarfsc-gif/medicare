import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Calendar, Clock, User, FileText, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { useToast } from '../../context/ToastContext';
import { departments } from '../../data/departments';
import { doctors } from '../../data/doctors';

const steps = [
  { id: 1, label: 'Department', icon: FileText },
  { id: 2, label: 'Doctor', icon: User },
  { id: 3, label: 'Date & Time', icon: Calendar },
  { id: 4, label: 'Patient Details', icon: User },
  { id: 5, label: 'Confirm', icon: CheckCircle },
];

export default function BookAppointment() {
  const [searchParams] = useSearchParams();
  const { addToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    department: searchParams.get('dept') || '',
    doctor: searchParams.get('doctor') || '',
    date: '',
    time: '',
    patientName: '',
    patientAge: '',
    patientGender: '',
    patientPhone: '',
    patientEmail: '',
    reason: '',
  });
  const [booked, setBooked] = useState(false);

  const selectedDept = departments.find((d) => d.name === formData.department);
  const selectedDoctor = doctors.find((d) => d.id === parseInt(formData.doctor));
  const deptDoctors = doctors.filter((d) => d.department === formData.department);

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

  const updateForm = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    setBooked(true);
    addToast('Appointment booked successfully!', 'success');
  };

  if (booked) {
    return (
      <>
        <Helmet>
          <title>Appointment Confirmed - MEDICARE Hospital</title>
        </Helmet>
        <section className="py-20 bg-surface dark:bg-gray-900 min-h-screen">
          <div className="max-w-2xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Appointment Confirmed!</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Your appointment has been successfully booked. You will receive a confirmation SMS and email shortly.
              </p>
              <Card className="p-8 text-left mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Appointment Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Doctor</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedDoctor?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Department</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formData.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Date</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Time</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Fee</span>
                    <span className="font-medium text-primary-500">PKR {selectedDoctor?.fee.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
              <div className="flex gap-4 justify-center">
                <Link to="/portal/appointments">
                  <Button>View My Appointments</Button>
                </Link>
                <Link to="/">
                  <Button variant="outline">Back to Home</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book Appointment - MEDICARE Hospital</title>
        <meta name="description" content="Book an appointment with MEDICARE Hospital's expert specialists online." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book Appointment</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Schedule your visit with our specialists in just a few simple steps.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-surface dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isActive
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                      </div>
                      <span className={`text-xs mt-2 hidden sm:block ${isActive ? 'text-primary-500 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 sm:w-16 h-0.5 mx-2 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Steps */}
          <Card className="p-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Select Department</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {departments.map((dept) => (
                      <button
                        key={dept.id}
                        onClick={() => updateForm('department', dept.name)}
                        className={`p-4 rounded-xl border-2 text-left transition-colors ${
                          formData.department === dept.name
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                        }`}
                      >
                        <h3 className="font-medium text-gray-900 dark:text-white">{dept.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{dept.doctors} doctors</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Select Doctor</h2>
                  {deptDoctors.length > 0 ? (
                    <div className="space-y-4">
                      {deptDoctors.map((doc) => (
                        <button
                          key={doc.id}
                          onClick={() => updateForm('doctor', doc.id.toString())}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                            formData.doctor === doc.id.toString()
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-full object-cover" />
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 dark:text-white">{doc.name}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{doc.specialty} | {doc.experience} yrs exp</p>
                            </div>
                            <span className="text-primary-500 font-medium">PKR {doc.fee.toLocaleString()}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">Please select a department first.</p>
                  )}
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Select Date & Time</h2>
                  <div className="space-y-6">
                    <Input
                      label="Select Date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateForm('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available Time Slots</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => updateForm('time', slot)}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                              formData.time === slot
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-600'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Patient Details</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="Enter patient name"
                      value={formData.patientName}
                      onChange={(e) => updateForm('patientName', e.target.value)}
                    />
                    <Input
                      label="Age"
                      type="number"
                      placeholder="Enter age"
                      value={formData.patientAge}
                      onChange={(e) => updateForm('patientAge', e.target.value)}
                    />
                    <Select
                      label="Gender"
                      placeholder="Select gender"
                      value={formData.patientGender}
                      onChange={(e) => updateForm('patientGender', e.target.value)}
                      options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                        { value: 'Other', label: 'Other' },
                      ]}
                    />
                    <Input
                      label="Phone Number"
                      placeholder="0300-1234567"
                      value={formData.patientPhone}
                      onChange={(e) => updateForm('patientPhone', e.target.value)}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="patient@email.com"
                      value={formData.patientEmail}
                      onChange={(e) => updateForm('patientEmail', e.target.value)}
                    />
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Reason for Visit</label>
                      <textarea
                        placeholder="Briefly describe your symptoms or reason for visit"
                        value={formData.reason}
                        onChange={(e) => updateForm('reason', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        rows={3}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Confirm Appointment</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">Department</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formData.department}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">Doctor</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedDoctor?.name}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">Date</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formData.date}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">Time</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formData.time}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">Patient</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formData.patientName}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-gray-500 dark:text-gray-400">Consultation Fee</span>
                      <span className="font-bold text-primary-500 text-lg">PKR {selectedDoctor?.fee.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </Button>
              {currentStep < 5 ? (
                <Button onClick={nextStep}>
                  Next
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  <Check size={16} className="mr-1" />
                  Confirm Booking
                </Button>
              )}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
