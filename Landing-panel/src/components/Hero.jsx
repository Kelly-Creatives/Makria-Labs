import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="grid-overlay"></div>
      </div>
      
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Makria Labs — Digital Studio
          </motion.div>
          
          <motion.h1 
            className="heading-xl hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We Build Digital <br/>
            Experiences That <br/>
            <span className="text-accent">Move Businesses Forward.</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Makria Labs combines software, design, strategy and digital creativity to turn ambitious ideas into powerful digital experiences.
          </motion.p>
          
          <motion.div 
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link to="/contact" className="btn btn-primary">
              Start a Project <ArrowRight size={18} />
            </Link>
            <a href="#work" className="btn btn-secondary">
              Explore Our Work
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
