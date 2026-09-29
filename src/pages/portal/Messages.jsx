import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, Bell, Check, Trash2 } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Tabs from '../../components/Tabs';
import { patientMessages, patientNotifications } from '../../data/patientData';

export default function Messages() {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const tabs = [
    { value: 'messages', label: 'Messages' },
    { value: 'notifications', label: 'Notifications' },
  ];

  return (
    <>
      <Helmet>
        <title>Messages - MEDICARE Patient Portal</title>
      </Helmet>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages & Notifications</h1>
          <p className="text-gray-500 dark:text-gray-400">Stay updated with your healthcare communications.</p>
        </motion.div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'messages' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Message List */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden">
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {patientMessages.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={() => setSelectedMessage(msg)}
                      className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                        selectedMessage?.id === msg.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center shrink-0">
                          <Mail size={18} className="text-primary-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{msg.from}</p>
                            {!msg.read && <span className="w-2 h-2 bg-primary-500 rounded-full shrink-0" />}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{msg.subject}</p>
                          <p className="text-xs text-gray-400 mt-1">{msg.date}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Message Content */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedMessage.subject}</h2>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">From: {selectedMessage.from}</p>
                      <p className="text-gray-400 text-xs mt-1">{selectedMessage.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Check size={18} className="text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Trash2 size={18} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{selectedMessage.message}</p>
                  </div>
                </Card>
              ) : (
                <Card className="p-12 text-center">
                  <Mail size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Select a message to read</p>
                </Card>
              )}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            {patientNotifications.map((notif, index) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center shrink-0">
                      <Bell size={18} className="text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-white">{notif.title}</h3>
                        {!notif.read && <Badge variant="primary">New</Badge>}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
