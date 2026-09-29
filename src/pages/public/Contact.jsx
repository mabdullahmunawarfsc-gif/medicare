import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../context/ToastContext';

const contactInfo = [
  { icon: MapPin, title: 'Address', details: '123 Healthcare Avenue, Gulberg III, Lahore, Pakistan' },
  { icon: Phone, title: 'Phone', details: '0800-12345 (Toll Free)\n042-35771234' },
  { icon: Mail, title: 'Email', details: 'info@medicare.com\nsupport@medicare.com' },
  { icon: Clock, title: 'Working Hours', details: 'Emergency: 24/7\nOPD: Mon-Sat 9AM-9PM' },
];

const branches = [
  { name: 'MEDICARE Main Hospital', address: '123 Healthcare Avenue, Gulberg III, Lahore', phone: '042-35771234' },
  { name: 'MEDICARE North Clinic', address: '456 Health Street, Model Town, Lahore', phone: '042-35775678' },
  { name: 'MEDICARE South Clinic', address: '789 Medical Road, DHA Phase 5, Lahore', phone: '042-35779012' },
];

export default function Contact() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Message sent successfully! We will get back to you soon.', 'success');
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - MEDICARE Hospital</title>
        <meta name="description" content="Contact MEDICARE Hospital. Find our address, phone numbers, email, and get in touch with us." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us through any of the channels below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-surface dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Thank you for contacting us. We will respond within 24 hours.</p>
                    <Button variant="outline" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      <Input
                        label="Subject"
                        placeholder="Enter subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                      <textarea
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send size={16} className="mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <Card key={info.title} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center shrink-0">
                        <Icon size={24} className="text-primary-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{info.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">{info.details}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Map Placeholder */}
          <Card className="mt-8 overflow-hidden">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">123 Healthcare Avenue, Gulberg III, Lahore</p>
                <p className="text-sm text-gray-400 mt-1">Interactive map would be displayed here</p>
              </div>
            </div>
          </Card>

          {/* Branches */}
          <div className="mt-12">
            <SectionTitle
              subtitle="Our Locations"
              title="Hospital Branches"
              description="Visit us at any of our convenient locations."
            />
            <div className="grid md:grid-cols-3 gap-6">
              {branches.map((branch) => (
                <Card key={branch.name} className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{branch.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{branch.address}</p>
                  <p className="text-primary-500 font-medium text-sm">{branch.phone}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
