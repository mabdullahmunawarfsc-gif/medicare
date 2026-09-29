import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import { galleryImages } from '../../data/gallery';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(galleryImages.map((img) => img.category))];
  const filtered = filter === 'All' ? galleryImages : galleryImages.filter((img) => img.category === filter);

  const currentIndex = selectedImage ? filtered.findIndex((img) => img.id === selectedImage.id) : -1;

  const nextImage = () => {
    if (currentIndex < filtered.length - 1) setSelectedImage(filtered[currentIndex + 1]);
  };

  const prevImage = () => {
    if (currentIndex > 0) setSelectedImage(filtered[currentIndex - 1]);
  };

  return (
    <>
      <Helmet>
        <title>Gallery - MEDICARE Hospital</title>
        <meta name="description" content="View photos of MEDICARE Hospital's facilities, medical equipment, and healthcare team." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Take a virtual tour of our world-class facilities and meet our dedicated healthcare team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-surface dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat
                    ? 'bg-primary-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                  <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium text-sm">{image.title}</p>
                    <p className="text-white/70 text-xs">{image.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
            {currentIndex > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronLeft size={32} />
              </button>
            )}
            {currentIndex < filtered.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronRight size={32} />
              </button>
            )}
            <motion.img
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] rounded-lg object-contain"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-white font-medium">{selectedImage.title}</p>
              <p className="text-white/70 text-sm">{selectedImage.category}</p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
