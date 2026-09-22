import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Insights.css';

export default function Insights({ data }) {
  return (
    <section id="insights" className="insights">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ideas from the Lab
          </motion.h2>
          <motion.p 
            className="text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Thoughts, trends, and strategies for navigating the digital landscape.
          </motion.p>
        </div>

        <div className="insights-grid">
          {data.map((post, index) => (
            <motion.div 
              key={post.id}
              className="insight-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="insight-img-wrapper">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
              <div className="insight-content glass-panel">
                <div className="insight-meta">
                  <span className="insight-category">{post.category}</span>
                  <span className="insight-date">{post.date}</span>
                </div>
                <h3 className="insight-title">{post.title}</h3>
                <button className="read-more">
                  Read Article <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
