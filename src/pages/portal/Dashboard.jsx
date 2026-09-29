import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Calendar, FileText, Activity, CreditCard, ArrowRight, Heart, Bell, Clock, User } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { patientAppointments, patientReports, patientNotifications } from '../../data/patientData';

const quickActions = [
  { icon: Calendar, label: 'Book Appointment', path: '/book-appointment', color: 'bg-primary-50 text-primary-500' },
  { icon: FileText, label: 'View Reports', path: '/portal/reports', color: 'bg-teal-50 text-teal-500' },
  { icon: Activity, label: 'Track Vitals', path: '/portal/vitals', color: 'bg-green-50 text-green-500' },
  { icon: CreditCard, label: 'Pay Bills', path: '/portal/billing', color: 'bg-yellow-50 text-yellow-500' },
];

const healthTips = [
  'Drink at least 8 glasses of water daily to stay hydrated.',
  'Get 7-8 hours of quality sleep every night for better health.',
  'Take a 30-minute walk daily to improve cardiovascular health.',
  'Eat a balanced diet rich in fruits, vegetables, and whole grains.',
];

export default function PortalDashboard() {
  const { user } = useAuth();
  const upcomingAppointments = patientAppointments.filter((a) => a.status === 'upcoming');
  const recentReports = patientReports.slice(0, 3);
  const unreadNotifications = patientNotifications.filter((n) => !n.read);

  return (
    <>
      <Helmet>
        <title>Dashboard - MEDICARE Patient Portal</title>
      </Helmet>

      <div className="space-y-6">
        {/* Welcome Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-gradient-to-r from-primary-600 to-teal-500 rounded-2xl p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}!</h1>
                <p className="text-blue-100">Here's an overview of your health dashboard.</p>
              </div>
              <Link to="/book-appointment">
                <Button variant="white">
                  <Calendar size={16} className="mr-2" />
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Upcoming Appointments', value: upcomingAppointments.length, icon: Calendar, color: 'text-primary-500' },
            { label: 'Reports Available', value: patientReports.length, icon: FileText, color: 'text-teal-500' },
            { label: 'Unread Messages', value: unreadNotifications.length, icon: Bell, color: 'text-yellow-500' },
            { label: 'Health Score', value: '85%', icon: Heart, color: 'text-red-500' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 md:p-6">
                  <div className={`w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-3`}>
                    <Icon size={20} className={stat.color} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Appointments</h2>
                <Link to="/portal/appointments" className="text-primary-500 text-sm font-medium flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingAppointments.length > 0 ? upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                      <Calendar size={20} className="text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{apt.doctor}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{apt.department} | {apt.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">{apt.date}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{apt.time}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">No upcoming appointments</p>
                )}
              </div>
            </Card>

            {/* Recent Reports */}
            <Card className="p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Reports</h2>
                <Link to="/portal/reports" className="text-primary-500 text-sm font-medium flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-teal-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{report.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{report.date}</p>
                      </div>
                    </div>
                    <Badge variant={report.status === 'ready' ? 'green' : 'yellow'}>{report.status}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link key={action.label} to={action.path}>
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center">
                        <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center mx-auto mb-2`}>
                          <Icon size={20} />
                        </div>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{action.label}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>

            {/* Health Tips */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Tips</h2>
              <ul className="space-y-3">
                {healthTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Heart size={14} className="text-red-400 shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Notifications */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
                <Link to="/portal/messages" className="text-primary-500 text-sm font-medium">View All</Link>
              </div>
              <div className="space-y-3">
                {unreadNotifications.slice(0, 3).map((notif) => (
                  <div key={notif.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{notif.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
