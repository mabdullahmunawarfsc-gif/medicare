import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { User, Mail, Phone, CreditCard, Calendar, Droplet, MapPin, Heart, Edit2, Camera, Save } from 'lucide-react';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function PortalProfile() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    cnic: user?.cnic || '',
    dob: user?.dob || '',
    gender: user?.gender || '',
    bloodGroup: user?.bloodGroup || '',
    address: user?.address || '',
    emergencyName: user?.emergencyContact?.name || '',
    emergencyRelation: user?.emergencyContact?.relation || '',
    emergencyPhone: user?.emergencyContact?.phone || '',
  });

  const handleSave = () => {
    updateUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      cnic: formData.cnic,
      dob: formData.dob,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      address: formData.address,
      emergencyContact: {
        name: formData.emergencyName,
        relation: formData.emergencyRelation,
        phone: formData.emergencyPhone,
      },
    });
    setEditing(false);
    addToast('Profile updated successfully!', 'success');
  };

  return (
    <>
      <Helmet>
        <title>My Profile - MEDICARE Patient Portal</title>
      </Helmet>

      <div className="space-y-6">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                {editing && (
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
                <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="primary">{user?.bloodGroup}</Badge>
                  <Badge variant="teal">{user?.gender}</Badge>
                  <Badge variant="gray">Patient ID: {user?.id}</Badge>
                </div>
              </div>
              <Button
                variant={editing ? 'primary' : 'outline'}
                onClick={() => editing ? handleSave() : setEditing(true)}
              >
                {editing ? <><Save size={16} className="mr-2" /> Save Changes</> : <><Edit2 size={16} className="mr-2" /> Edit Profile</>}
              </Button>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!editing}
                  icon={User}
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!editing}
                  icon={Mail}
                />
                <Input
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!editing}
                  icon={Phone}
                />
                <Input
                  label="CNIC"
                  value={formData.cnic}
                  onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                  disabled={!editing}
                  icon={CreditCard}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    disabled={!editing}
                    icon={Calendar}
                  />
                  <Select
                    label="Gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    disabled={!editing}
                    options={[
                      { value: 'Male', label: 'Male' },
                      { value: 'Female', label: 'Female' },
                      { value: 'Other', label: 'Other' },
                    ]}
                  />
                </div>
                <Select
                  label="Blood Group"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  disabled={!editing}
                  options={[
                    { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' },
                    { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' },
                    { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
                    { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
                  ]}
                />
                <Input
                  label="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!editing}
                  icon={MapPin}
                />
              </div>
            </Card>
          </motion.div>

          {/* Emergency Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emergency Contact</h2>
              <div className="space-y-4">
                <Input
                  label="Contact Name"
                  value={formData.emergencyName}
                  onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                  disabled={!editing}
                  icon={User}
                />
                <Input
                  label="Relation"
                  value={formData.emergencyRelation}
                  onChange={(e) => setFormData({ ...formData, emergencyRelation: e.target.value })}
                  disabled={!editing}
                  icon={Heart}
                />
                <Input
                  label="Contact Phone"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  disabled={!editing}
                  icon={Phone}
                />
              </div>
            </Card>

            {/* Medical Summary */}
            <Card className="p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Medical Summary</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <span className="text-gray-600 dark:text-gray-400">Blood Group</span>
                  <Badge variant="red">{user?.bloodGroup}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <span className="text-gray-600 dark:text-gray-400">Allergies</span>
                  <Badge variant="yellow">Penicillin, Peanuts</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <span className="text-gray-600 dark:text-gray-400">Chronic Conditions</span>
                  <Badge variant="primary">Hypertension, Diabetes</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
