export const patientAppointments = [
  { id: 1, doctor: 'Dr. Sarah Ahmed', department: 'Cardiology', date: '2026-10-05', time: '10:00 AM', status: 'upcoming', type: 'In-person', fee: 3000 },
  { id: 2, doctor: 'Dr. James Wilson', department: 'Neurology', date: '2026-10-12', time: '02:00 PM', status: 'upcoming', type: 'Video', fee: 3500 },
  { id: 3, doctor: 'Dr. Emily Chen', department: 'Orthopedics', date: '2026-09-20', time: '11:00 AM', status: 'completed', type: 'In-person', fee: 4000 },
  { id: 4, doctor: 'Dr. Michael Brown', department: 'Pediatrics', date: '2026-09-15', time: '09:00 AM', status: 'completed', type: 'In-person', fee: 2500 },
  { id: 5, doctor: 'Dr. Lisa Anderson', department: 'Gynecology', date: '2026-09-10', time: '03:00 PM', status: 'cancelled', type: 'In-person', fee: 3000 },
  { id: 6, doctor: 'Dr. David Lee', department: 'Dermatology', date: '2026-08-28', time: '10:00 AM', status: 'completed', type: 'Video', fee: 2500 },
];

export const patientReports = [
  { id: 1, name: 'Complete Blood Count (CBC)', date: '2026-09-20', doctor: 'Dr. Sarah Ahmed', status: 'ready', type: 'Lab Report' },
  { id: 2, name: 'Lipid Profile', date: '2026-09-18', doctor: 'Dr. Sarah Ahmed', status: 'ready', type: 'Lab Report' },
  { id: 3, name: 'Chest X-Ray', date: '2026-09-15', doctor: 'Dr. William Harris', status: 'ready', type: 'Radiology' },
  { id: 4, name: 'ECG', date: '2026-09-10', doctor: 'Dr. Sarah Ahmed', status: 'pending', type: 'Cardiology' },
  { id: 5, name: 'MRI Brain', date: '2026-09-05', doctor: 'Dr. James Wilson', status: 'ready', type: 'Radiology' },
  { id: 6, name: 'HbA1c', date: '2026-08-30', doctor: 'Dr. Michael Brown', status: 'ready', type: 'Lab Report' },
];

export const patientPrescriptions = [
  {
    id: 1,
    date: '2026-09-20',
    doctor: 'Dr. Sarah Ahmed',
    department: 'Cardiology',
    medicines: [
      { name: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take after meal' },
      { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at night', duration: '30 days', instructions: 'Take before bedtime' },
      { name: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily', duration: '30 days', instructions: 'Take with food' },
    ],
  },
  {
    id: 2,
    date: '2026-09-15',
    doctor: 'Dr. James Wilson',
    department: 'Neurology',
    medicines: [
      { name: 'Levetiracetam', dosage: '500mg', frequency: 'Twice daily', duration: '60 days', instructions: 'Take with or without food' },
      { name: 'Vitamin B Complex', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days', instructions: 'Take after breakfast' },
    ],
  },
  {
    id: 3,
    date: '2026-09-10',
    doctor: 'Dr. Emily Chen',
    department: 'Orthopedics',
    medicines: [
      { name: 'Ibuprofen', dosage: '400mg', frequency: 'Three times daily', duration: '7 days', instructions: 'Take after meal' },
      { name: 'Calcium + Vitamin D3', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days', instructions: 'Take with food' },
    ],
  },
];

export const patientInvoices = [
  { id: 'INV-2026-001', date: '2026-09-20', description: 'Cardiology Consultation', amount: 3000, status: 'paid', method: 'Credit Card' },
  { id: 'INV-2026-002', date: '2026-09-18', description: 'Lab Tests - Lipid Profile', amount: 1500, status: 'paid', method: 'Cash' },
  { id: 'INV-2026-003', date: '2026-09-15', description: 'Chest X-Ray', amount: 2000, status: 'pending', method: null },
  { id: 'INV-2026-004', date: '2026-09-10', description: 'ECG', amount: 1000, status: 'paid', method: 'Insurance' },
  { id: 'INV-2026-005', date: '2026-09-05', description: 'MRI Brain', amount: 15000, status: 'pending', method: null },
  { id: 'INV-2026-006', date: '2026-08-30', description: 'HbA1c Test', amount: 1200, status: 'paid', method: 'Debit Card' },
];

export const patientVitals = {
  bloodPressure: [
    { date: '2026-09-01', systolic: 130, diastolic: 85 },
    { date: '2026-09-05', systolic: 128, diastolic: 82 },
    { date: '2026-09-10', systolic: 135, diastolic: 88 },
    { date: '2026-09-15', systolic: 125, diastolic: 80 },
    { date: '2026-09-20', systolic: 122, diastolic: 78 },
    { date: '2026-09-25', systolic: 120, diastolic: 76 },
  ],
  sugar: [
    { date: '2026-09-01', fasting: 110, postMeal: 160 },
    { date: '2026-09-05', fasting: 105, postMeal: 155 },
    { date: '2026-09-10', fasting: 115, postMeal: 170 },
    { date: '2026-09-15', fasting: 108, postMeal: 150 },
    { date: '2026-09-20', fasting: 102, postMeal: 145 },
    { date: '2026-09-25', fasting: 98, postMeal: 140 },
  ],
  weight: [
    { date: '2026-09-01', weight: 78 },
    { date: '2026-09-05', weight: 77.5 },
    { date: '2026-09-10', weight: 77 },
    { date: '2026-09-15', weight: 76.5 },
    { date: '2026-09-20', weight: 76 },
    { date: '2026-09-25', weight: 75.5 },
  ],
  heartRate: [
    { date: '2026-09-01', rate: 78 },
    { date: '2026-09-05', rate: 76 },
    { date: '2026-09-10', rate: 80 },
    { date: '2026-09-15', rate: 74 },
    { date: '2026-09-20', rate: 72 },
    { date: '2026-09-25', rate: 70 },
  ],
};

export const patientAllergies = [
  { id: 1, allergen: 'Penicillin', severity: 'High', reaction: 'Skin rash, difficulty breathing', diagnosed: '2015-03-10' },
  { id: 2, allergen: 'Peanuts', severity: 'Medium', reaction: 'Stomach pain, nausea', diagnosed: '2018-07-22' },
  { id: 3, allergen: 'Dust Mites', severity: 'Low', reaction: 'Sneezing, watery eyes', diagnosed: '2020-11-05' },
];

export const patientConditions = [
  { id: 1, condition: 'Hypertension', diagnosed: '2019-05-15', status: 'Active', doctor: 'Dr. Sarah Ahmed', notes: 'Controlled with medication. Regular monitoring required.' },
  { id: 2, condition: 'Type 2 Diabetes', diagnosed: '2021-02-20', status: 'Active', doctor: 'Dr. Michael Brown', notes: 'Diet controlled. HbA1c within target range.' },
  { id: 3, condition: 'Asthma', diagnosed: '2010-08-10', status: 'Managed', doctor: 'Dr. Robert Taylor', notes: 'Mild persistent. Inhaler as needed.' },
];

export const patientVaccinations = [
  { id: 1, vaccine: 'COVID-19 (Pfizer)', date: '2021-06-15', dose: 'Dose 1', doctor: 'Dr. Michael Brown' },
  { id: 2, vaccine: 'COVID-19 (Pfizer)', date: '2021-07-10', dose: 'Dose 2', doctor: 'Dr. Michael Brown' },
  { id: 3, vaccine: 'COVID-19 Booster', date: '2022-01-20', dose: 'Booster', doctor: 'Dr. Michael Brown' },
  { id: 4, vaccine: 'Influenza', date: '2025-10-05', dose: 'Annual', doctor: 'Dr. Sarah Ahmed' },
  { id: 5, vaccine: 'Hepatitis B', date: '2015-03-10', dose: 'Dose 1', doctor: 'Dr. James Wilson' },
  { id: 6, vaccine: 'Hepatitis B', date: '2015-04-10', dose: 'Dose 2', doctor: 'Dr. James Wilson' },
  { id: 7, vaccine: 'Hepatitis B', date: '2015-05-10', dose: 'Dose 3', doctor: 'Dr. James Wilson' },
];

export const patientMedicalHistory = [
  { id: 1, date: '2026-09-20', type: 'Consultation', doctor: 'Dr. Sarah Ahmed', department: 'Cardiology', diagnosis: 'Hypertension follow-up', notes: 'BP controlled. Continue current medication.' },
  { id: 2, date: '2026-09-15', type: 'Lab Test', doctor: 'Dr. James Wilson', department: 'Neurology', diagnosis: 'Routine blood work', notes: 'All values within normal range.' },
  { id: 3, date: '2026-09-10', type: 'Imaging', doctor: 'Dr. William Harris', department: 'Radiology', diagnosis: 'Chest X-Ray', notes: 'No abnormalities detected.' },
  { id: 4, date: '2026-09-05', type: 'Consultation', doctor: 'Dr. Emily Chen', department: 'Orthopedics', diagnosis: 'Knee pain evaluation', notes: 'Mild osteoarthritis. Physiotherapy recommended.' },
  { id: 5, date: '2026-08-28', type: 'Consultation', doctor: 'Dr. David Lee', department: 'Dermatology', diagnosis: 'Skin allergy', notes: 'Prescribed antihistamines. Follow-up in 2 weeks.' },
  { id: 6, date: '2026-08-20', type: 'Lab Test', doctor: 'Dr. Michael Brown', department: 'Pediatrics', diagnosis: 'HbA1c test', notes: 'HbA1c: 6.8%. Good control.' },
  { id: 7, date: '2026-08-15', type: 'Consultation', doctor: 'Dr. Lisa Anderson', department: 'Gynecology', diagnosis: 'Annual checkup', notes: 'All normal. Next visit in 1 year.' },
  { id: 8, date: '2026-08-10', type: 'Imaging', doctor: 'Dr. William Harris', department: 'Radiology', diagnosis: 'MRI Brain', notes: 'No significant findings.' },
];

export const patientMessages = [
  { id: 1, from: 'Dr. Sarah Ahmed', subject: 'Your test results are ready', message: 'Your recent blood work results are now available. All values are within normal range. Please continue your current medication.', date: '2026-09-20 10:30', read: false },
  { id: 2, from: 'MEDICARE Lab', subject: 'Lab report notification', message: 'Your Complete Blood Count (CBC) report is ready for download from your patient portal.', date: '2026-09-18 14:15', read: false },
  { id: 3, from: 'Dr. James Wilson', subject: 'Appointment reminder', message: 'This is a reminder for your upcoming appointment on October 12, 2026 at 2:00 PM.', date: '2026-09-15 09:00', read: true },
  { id: 4, from: 'MEDICARE Billing', subject: 'Invoice generated', message: 'Your invoice INV-2026-003 for Chest X-Ray has been generated. Amount: PKR 2,000.', date: '2026-09-15 11:30', read: true },
  { id: 5, from: 'Dr. Emily Chen', subject: 'Physiotherapy schedule', message: 'Your physiotherapy sessions have been scheduled for Monday, Wednesday, and Friday at 10:00 AM starting next week.', date: '2026-09-10 16:45', read: true },
];

export const patientNotifications = [
  { id: 1, type: 'appointment', title: 'Appointment Reminder', message: 'You have an appointment with Dr. Sarah Ahmed tomorrow at 10:00 AM.', time: '2 hours ago', read: false },
  { id: 2, type: 'report', title: 'Report Ready', message: 'Your Lipid Profile report is now available.', time: '5 hours ago', read: false },
  { id: 3, type: 'billing', title: 'Payment Due', message: 'Invoice INV-2026-003 for PKR 2,000 is pending payment.', time: '1 day ago', read: true },
  { id: 4, type: 'health', title: 'Health Tip', message: 'Remember to take your blood pressure medication daily.', time: '2 days ago', read: true },
  { id: 5, type: 'system', title: 'System Maintenance', message: 'Patient portal will be under maintenance on Sunday from 2:00 AM to 4:00 AM.', time: '3 days ago', read: true },
];
