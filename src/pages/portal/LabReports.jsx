import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FileText, Download, Eye, Calendar, User } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { patientReports } from '../../data/patientData';
import { useToast } from '../../context/ToastContext';

export default function LabReports() {
  const { addToast } = useToast();

  const handleView = (reportName) => {
    addToast(`Opening ${reportName}...`, 'info');
  };

  const handleDownload = (reportName) => {
    addToast(`${reportName} downloaded successfully!`, 'success');
  };

  return (
    <>
      <Helmet>
        <title>Lab Reports - MEDICARE Patient Portal</title>
      </Helmet>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lab Reports</h1>
          <p className="text-gray-500 dark:text-gray-400">View and download your laboratory test reports.</p>
        </motion.div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Report Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Doctor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {patientReports.map((report, index) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-teal-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{report.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{report.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{report.date}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{report.doctor}</td>
                    <td className="px-6 py-4">
                      <Badge variant={report.status === 'ready' ? 'green' : 'yellow'}>{report.status}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleView(report.name)}>
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDownload(report.name)}>
                          <Download size={14} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
