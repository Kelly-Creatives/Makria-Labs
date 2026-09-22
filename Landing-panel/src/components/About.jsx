import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import './About.css';

export default function About() {
  const stats = [
    { label: 'Projects Completed', value: '50+' },
    { label: 'Technologies', value: '20+' },
    { label: 'Digital Services', value: '5+' },
    { label: 'Client Success', value: '100%' }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg">Why Makria Labs?</h2>
            <p className="text-lg about-lead">
              Makria Labs is a multidisciplinary digital studio built around one idea: great technology should solve real problems and create meaningful experiences.
            </p>
            <p className="about-text">
              We bring together <strong>Technology + Design + Strategy + Creativity + Digital Operations</strong> to deliver solutions that are not just beautiful, but drive tangible business growth.
            </p>
            
            <ul className="about-list">
              <li><CheckCircle size={20} className="text-accent" /> Business-focused solutions</li>
              <li><CheckCircle size={20} className="text-accent" /> Human-centered design</li>
              <li><CheckCircle size={20} className="text-accent" /> Flexible, long-term partnership</li>
              <li><CheckCircle size={20} className="text-accent" /> Fast and thoughtful execution</li>
            </ul>
          </motion.div>

          <motion.div 
            className="about-stats-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="about-stats grid grid-cols-2">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card glass-panel">
                  <div className="stat-value text-accent">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="about-image-wrapper">
               <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team collaborating" className="about-img" />
               <div className="about-img-overlay"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
