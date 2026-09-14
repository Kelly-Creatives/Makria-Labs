import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import './Testimonials.css';

export default function Testimonials({ data }) {
  return (
    <section className="testimonials">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-lg">Client Success</h2>
          <p className="text-lg">Don't just take our word for it.</p>
        </motion.div>

        <div className="testimonials-grid">
          {data.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="testimonial-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Quote size={40} className="quote-icon" />
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
