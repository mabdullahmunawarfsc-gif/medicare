import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Public Pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Departments from '../pages/public/Departments';
import DepartmentDetail from '../pages/public/DepartmentDetail';
import Services from '../pages/public/Services';
import Doctors from '../pages/public/Doctors';
import DoctorProfile from '../pages/public/DoctorProfile';
import BookAppointment from '../pages/public/BookAppointment';
import OnlineConsultation from '../pages/public/OnlineConsultation';
import HealthPackages from '../pages/public/HealthPackages';
import LabTests from '../pages/public/LabTests';
import Insurance from '../pages/public/Insurance';
import PatientGuide from '../pages/public/PatientGuide';
import Gallery from '../pages/public/Gallery';
import News from '../pages/public/News';
import NewsArticle from '../pages/public/NewsArticle';
import Careers from '../pages/public/Careers';
import Contact from '../pages/public/Contact';
import Emergency from '../pages/public/Emergency';
import Privacy from '../pages/public/Privacy';
import Terms from '../pages/public/Terms';
import NotFound from '../pages/public/NotFound';

// Auth Pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import OTPVerification from '../pages/auth/OTPVerification';
import ResetPassword from '../pages/auth/ResetPassword';

// Portal Pages
import PortalDashboard from '../pages/portal/Dashboard';
import PortalProfile from '../pages/portal/Profile';
import MedicalHistory from '../pages/portal/MedicalHistory';
import Appointments from '../pages/portal/Appointments';
import LabReports from '../pages/portal/LabReports';
import Prescriptions from '../pages/portal/Prescriptions';
import Billing from '../pages/portal/Billing';
import Vitals from '../pages/portal/Vitals';
import HealthRecords from '../pages/portal/HealthRecords';
import Messages from '../pages/portal/Messages';
import Settings from '../pages/portal/Settings';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/portal" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/:id" element={<DepartmentDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/online-consultation" element={<OnlineConsultation />} />
        <Route path="/health-packages" element={<HealthPackages />} />
        <Route path="/lab-tests" element={<LabTests />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/patient-guide" element={<PatientGuide />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsArticle />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/404" element={<NotFound />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />
      <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />
      <Route path="/otp-verification" element={<PublicOnlyRoute><OTPVerification /></PublicOnlyRoute>} />
      <Route path="/reset-password" element={<PublicOnlyRoute><ResetPassword /></PublicOnlyRoute>} />

      {/* Protected Portal Routes */}
      <Route path="/portal" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<PortalDashboard />} />
        <Route path="profile" element={<PortalProfile />} />
        <Route path="medical-history" element={<MedicalHistory />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="reports" element={<LabReports />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="billing" element={<Billing />} />
        <Route path="vitals" element={<Vitals />} />
        <Route path="health-records" element={<HealthRecords />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
