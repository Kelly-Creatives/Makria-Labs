import { motion } from 'framer-motion';
import { Code, PenTool, Headphones, Camera, Lightbulb, ArrowRight } from 'lucide-react';
import './Services.css';

const iconMap = {
  Code: <Code size={32} className="service-icon" />,
  PenTool: <PenTool size={32} className="service-icon" />,
  Headphones: <Headphones size={32} className="service-icon" />,
  Camera: <Camera size={32} className="service-icon" />,
  Lightbulb: <Lightbulb size={32} className="service-icon" />
};

export default function Services({ data }) {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Capabilities
          </motion.h2>
          <motion.p 
            className="text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Comprehensive digital services designed to scale your business and elevate your brand.
          </motion.p>
        </div>

        <div className="services-grid">
          {data.map((service, index) => (
            <motion.div 
              key={service.id}
              className="service-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="service-icon-wrapper">
                {iconMap[service.icon]}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              <ul className="service-list">
                {service.capabilities.map((cap, i) => (
                  <li key={i}>{cap}</li>
                ))}
              </ul>
              <button className="service-btn">
                Explore Service <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
