import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { newsArticles } from '../../data/news';

export default function NewsArticle() {
  const { id } = useParams();
  const article = newsArticles.find((a) => a.id === parseInt(id));

  if (!article) return <Navigate to="/news" replace />;

  const relatedArticles = newsArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{article.title} - MEDICARE Hospital</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <section className="bg-surface dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/news" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-6 transition-colors">
            <ArrowLeft size={18} />
            Back to News
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img src={article.image} alt={article.title} className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8" />
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="teal">{article.category}</Badge>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><User size={14} /> {article.author}</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{article.title}</h1>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.article>

          {/* Related Articles */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link key={related.id} to={`/news/${related.id}`}>
                  <Card hover className="overflow-hidden h-full">
                    <img src={related.image} alt={related.title} className="w-full h-32 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">{related.title}</h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
