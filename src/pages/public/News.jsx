import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Clock, User } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { newsArticles } from '../../data/news';

export default function News() {
  return (
    <>
      <Helmet>
        <title>Health News & Blog - MEDICARE Hospital</title>
        <meta name="description" content="Stay updated with the latest health news, medical tips, and hospital updates from MEDICARE." />
      </Helmet>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Health News & Blog</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Stay informed with the latest health tips, medical advancements, and hospital news.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-surface dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Link to={`/news/${newsArticles[0].id}`}>
              <Card hover className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <img src={newsArticles[0].image} alt={newsArticles[0].title} className="w-full h-64 md:h-full object-cover" />
                  <div className="p-8">
                    <Badge variant="teal" className="mb-3">{newsArticles[0].category}</Badge>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{newsArticles[0].title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{newsArticles[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><User size={14} /> {newsArticles[0].author}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {newsArticles[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Article Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.slice(1).map((article, index) => (
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
                        <span className="flex items-center gap-1 text-primary-500 font-medium">
                          Read More <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
