import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CreditCard, Download, Eye, X, CheckCircle } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { patientInvoices } from '../../data/patientData';
import { useToast } from '../../context/ToastContext';

export default function Billing() {
  const { addToast } = useToast();
  const [payModal, setPayModal] = useState(null);

  const handlePay = () => {
    addToast('Payment processed successfully!', 'success');
    setPayModal(null);
  };

  const handleDownload = (invoiceId) => {
    addToast(`Invoice ${invoiceId} downloaded!`, 'success');
  };

  const totalPending = patientInvoices.filter((i) => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = patientInvoices.filter((i) => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);

  return (
    <>
      <Helmet>
        <title>Billing & Payments - MEDICARE Patient Portal</title>
      </Helmet>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Payments</h1>
          <p className="text-gray-500 dark:text-gray-400">View your invoices and make payments online.</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Paid</p>
            <p className="text-2xl font-bold text-green-500">PKR {totalPaid.toLocaleString()}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pending Amount</p>
            <p className="text-2xl font-bold text-yellow-500">PKR {totalPending.toLocaleString()}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Invoices</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{patientInvoices.length}</p>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Invoice</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {patientInvoices.map((invoice, index) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{invoice.id}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{invoice.date}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{invoice.description}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">PKR {invoice.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <Badge variant={invoice.status === 'paid' ? 'green' : 'yellow'}>{invoice.status}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {invoice.status === 'pending' && (
                          <Button size="sm" onClick={() => setPayModal(invoice)}>
                            <CreditCard size={14} className="mr-1" />
                            Pay Now
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => handleDownload(invoice.id)}>
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

      {/* Payment Modal */}
      <Modal isOpen={!!payModal} onClose={() => setPayModal(null)} title="Make Payment" size="sm">
        {payModal && (
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Payment Summary</h3>
              <p className="text-gray-600 dark:text-gray-400">{payModal.description}</p>
              <p className="text-3xl font-bold text-primary-500 mt-4">PKR {payModal.amount.toLocaleString()}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={handlePay}>
                <CreditCard size={18} className="mr-2" />
                Pay PKR {payModal.amount.toLocaleString()}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
