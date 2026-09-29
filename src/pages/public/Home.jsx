import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Calendar, Users, Award, Clock, Phone, ArrowRight,
  Heart, Brain, Bone, Baby, Stethoscope, Star, ChevronLeft, ChevronRight,
  Shield, Truck, FlaskConical, Video, Home as HomeIcon, Droplet, Scan
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Button from '../../components/Button';
import Card from '../../components/Card';
import SectionTitle from '../../components/SectionTitle';
import Badge from '../../components/Badge';
import { departments } from '../../data/departments';
import { doctors } from '../../data/doctors';
import { testimonials } from '../../data/testimonials';
import { newsArticles } from '../../data/news';
import { healthPackages } from '../../data/packages';
import useCountUp from '../../hooks/useCountUp';

const stats = [
  { label: 'Years of Service', value: 20, suffix: '+' },
  { label: 'Expert Doctors', value: 200, suffix: '+' },
  { label: 'Happy Patients', value: 500, suffix: 'K+' },
  { label: 'Awards Won', value: 50, suffix: '+' },
];

const whyChooseUs = [
  { icon: Shield, title: 'JCI Accredited', description: 'International quality and safety standards certified by Joint Commission International.' },
  { icon: Clock, title: '24/7 Emergency', description: 'Round-the-clock emergency care with rapid response team and advanced life support.' },
  { icon: Users, title: 'Expert Specialists', description: '200+ highly qualified doctors across 50+ specialties with international training.' },
  { icon: Award, title: 'Advanced Technology', description: 'State-of-the-art medical equipment including 3T MRI, 128-slice CT, and robotic surgery.' },
];

const services = [
  { icon: Truck, title: 'Ambulance Service', description: 'Fleet of fully-equipped ambulances with trained paramedics.' },
  { icon: FlaskConical, title: 'Laboratory', description: 'Fully automated lab with home sampling and online reports.' },
  { icon: Video, title: 'Online Consultation', description: 'Consult specialists from home via secure video calls.' },
  { icon: HomeIcon, title: 'Home Sampling', description: 'Convenient sample collection at your doorstep.' },
];

function StatCounter({ value, suffix, label }) {
  const [count, ref] = useCountUp(value, 2000);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-blue-100 text-sm font-medium">{label}</div>
    </div>
  );
}

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredDoctors = doctors.slice(0, 6);
  const latestNews = newsArticles.slice(0, 3);
  const popularPackages = healthPackages.filter((p) => p.popular).slice(0, 2);

  return (
    <>
      <Helmet>
        <title>MEDICARE - Caring for Life, Every Day</title>
        <meta name="description" content="MEDICARE Hospital - World-class healthcare with compassionate doctors, advanced technology, and 24/7 emergency services." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="teal" className="mb-4">JCI Accredited Hospital</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Caring for Life, <span className="text-teal-300">Every Day</span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 max-w-lg">
                Experience world-class healthcare with our team of 200+ expert specialists, advanced technology, and compassionate care available 24/7.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/book-appointment">
                  <Button size="lg" variant="white">
                    <Calendar size={18} className="mr-2" />
                    Book Appointment
                  </Button>
                </Link>
                <Link to="/doctors">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Stethoscope size={18} className="mr-2" />
                    Find a Doctor
                  </Button>
                </Link>
              </div>
              {/* Quick Search */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-md">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search doctors, departments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                  <Link to={`/doctors?search=${searchQuery}`}>
                    <Button variant="secondary">Search</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&h=500&fit=crop"
                alt="Medical professionals"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-700 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Departments Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Our Departments"
            title="Comprehensive Medical Care"
            description="Explore our 12+ specialized departments with expert doctors and advanced facilities."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {departments.slice(0, 8).map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/departments/${dept.id}`}>
                  <Card hover className="p-6 text-center h-full">
                    <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Heart size={24} className="text-primary-500" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{dept.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{dept.doctors} Doctors</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/departments">
              <Button variant="outline">
                View All Departments
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-surface dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Why Choose Us"
            title="Excellence in Healthcare"
            description="We combine medical expertise with compassionate care to provide the best possible outcomes for our patients."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={24} className="text-teal-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Our Doctors"
            title="Meet Our Specialists"
            description="Highly qualified and experienced doctors dedicated to providing the best care."
          />
          <div className="relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/doctors/${doctor.id}`}>
                    <Card hover className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">{doctor.name}</h3>
                          <p className="text-sm text-primary-500 font-medium">{doctor.specialty}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{doctor.qualification}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <Star size={14} className="text-yellow-400 fill-yellow-400" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{doctor.rating}</span>
                            </div>
                            <span className="text-gray-300 dark:text-gray-600">|</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{doctor.experience} yrs exp</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Fee: PKR {doctor.fee.toLocaleString()}</span>
                        <Link to={`/doctors/${doctor.id}`} onClick={(e) => e.stopPropagation()}>
                          <Button size="sm" variant="outline">View Profile</Button>
                        </Link>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/doctors">
              <Button variant="outline">
                View All Doctors
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-red-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Phone size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">24/7 Emergency Services</h3>
                <p className="text-red-100">Immediate medical attention when you need it most</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:080012345">
                <Button size="lg" variant="white">
                  <Phone size={18} className="mr-2" />
                  Call: 0800-12345
                </Button>
              </a>
              <Link to="/emergency">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Emergency Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-surface dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Our Services"
            title="Comprehensive Healthcare Services"
            description="From emergency care to home sampling, we provide a wide range of medical services."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to="/services">
                    <Card hover className="p-6 h-full">
                      <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
                        <Icon size={24} className="text-primary-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{service.description}</p>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Testimonials"
            title="What Our Patients Say"
            description="Real stories from real patients who trusted us with their care."
          />
          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 italic">
                    "{testimonials[currentTestimonial].comment}"
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonials[currentTestimonial].name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonials[currentTestimonial].location}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentTestimonial ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Health News Preview */}
      <section className="py-20 bg-surface dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Health News"
            title="Latest Health Updates"
            description="Stay informed with the latest health news, tips, and medical advancements."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {latestNews.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/news/${article.id}`}>
                  <Card hover className="overflow-hidden h-full">
                    <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <Badge variant="teal" className="mb-3">{article.category}</Badge>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/news">
              <Button variant="outline">
                View All News
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Health Packages Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            subtitle="Health Packages"
            title="Affordable Health Checkups"
            description="Comprehensive health packages designed for prevention and early detection."
          />
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {popularPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{pkg.name}</h3>
                      {pkg.popular && <Badge variant="teal">Popular</Badge>}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{pkg.description}</p>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-primary-500">PKR {pkg.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-400 line-through">PKR {pkg.originalPrice.toLocaleString()}</span>
                    </div>
                    <Link to="/health-packages">
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-teal-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Medical Assistance?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Our team of experts is ready to help you. Book an appointment or consult online from the comfort of your home.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/book-appointment">
                <Button size="lg" variant="white">
                  <Calendar size={18} className="mr-2" />
                  Book Appointment
                </Button>
              </Link>
              <Link to="/online-consultation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Video size={18} className="mr-2" />
                  Online Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
