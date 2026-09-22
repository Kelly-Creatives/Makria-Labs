import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import './CTA.css';

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div 
          className="cta-card glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-bg-glow"></div>
          
          <div className="cta-content">
            <h2 className="heading-lg cta-title">
              Have an idea? <br/>
              <span className="text-accent">Let's build it.</span>
            </h2>
            <p className="text-lg cta-desc">
              Whether you need software, design, digital content, virtual assistance or strategic guidance, Makria Labs can help turn your next idea into something real.
            </p>
            
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary cta-btn">
                Start a Project <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn-secondary cta-btn">
                Talk to Makria Labs <MessageSquare size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
