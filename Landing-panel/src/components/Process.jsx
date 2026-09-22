import { motion } from 'framer-motion';
import './Process.css';

export default function Process({ data }) {
  return (
    <section id="process" className="process">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Process
          </motion.h2>
          <motion.p 
            className="text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A systematic approach to turning complex challenges into elegant digital solutions.
          </motion.p>
        </div>

        <div className="process-timeline">
          {data.map((step, index) => (
            <motion.div 
              key={step.step}
              className="process-step"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="process-number">{step.step}</div>
              <div className="process-content glass-panel">
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
