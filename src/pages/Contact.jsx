import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

const sanitizeInput = (value) => String(value ?? '').replace(/[<>]/g, '').trim();

const socialLinks = [
  {
    label: 'X',
    href: 'https://x.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.9 2h3.4l-7.4 8.5L22.8 22h-6.7l-5.2-7.3L4.8 22H1.4l7.9-9.1L1 2h6.9l4.7 6.6L18.9 2Zm-1.1 18.2h1.9L7.2 3.7H5.2l12.6 16.5Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.94 8.5A1.56 1.56 0 1 1 6.93 5.4a1.56 1.56 0 0 1 .01 3.1ZM5.5 9.8h2.9v9.7H5.5V9.8Zm5.1 0h2.8v1.3h.04c.4-.7 1.3-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.7v5.2h-2.9v-4.9c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7v5h-2.9V9.8Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.8 2.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.3A5.7 5.7 0 1 1 12 17.7 5.7 5.7 0 0 1 12 6.3Zm0 1.8A3.9 3.9 0 1 0 12 16.1 3.9 3.9 0 0 0 12 8.1Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.36-1.32-3.36-1.32-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.02 1.53 1.02.9 1.54 2.33 1.1 2.9.84.09-.66.35-1.1.63-1.35-2.21-.25-4.54-1.1-4.54-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.02A9.4 9.4 0 0 1 12 6.8c.85 0 1.7.11 2.5.33 1.9-1.3 2.74-1.02 2.74-1.02.56 1.4.21 2.42.1 2.67.64.7 1.02 1.59 1.02 2.68 0 3.84-2.34 4.68-4.57 4.92.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" fill="currentColor"/>
      </svg>
    )
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: 'Software Development',
    budget: '',
    description: '',
    contactMethod: 'Email'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, sanitizeInput(value)])
    );

    if (!cleanedData.name || !cleanedData.email || !cleanedData.service || !cleanedData.budget || !cleanedData.description) {
      alert('Please complete the required fields before submitting.');
      return;
    }

    if (cleanedData.description.length < 20) {
      alert('Please provide a more detailed project description.');
      return;
    }

    console.log('Form submitted:', cleanedData);
    alert('Thank you for reaching out! We will get back to you shortly.');
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-grid">
          
          <motion.div 
            className="contact-info-section"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-lg">Let's build something amazing together.</h1>
            <p className="text-lg contact-lead">
              Fill out the form and our team will get back to you within 24 hours to discuss your project.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="detail-icon"><Mail size={24} /></div>
                <div>
                  <h4>Email Us</h4>
                  <p>hello@makrialabs.com</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="detail-icon"><Phone size={24} /></div>
                <div>
                  <h4>Call Us</h4>
                  <p>+250794716827</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="detail-icon"><MapPin size={24} /></div>
                <div>
                  <h4>Visit Us</h4>
                  <div className="location">
                 <a href="https://www.google.com/maps/place/Norsken+House+Kigali" target="_blank" rel="noopener noreferrer">
                    Norsken house kigali
                  </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <h4>Follow Our Journey</h4>
              <div className="social-links">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} className="social-icon" aria-label={social.label} title={social.label} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-section glass-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" required maxLength={80} value={formData.name} onChange={handleChange} placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" required maxLength={120} value={formData.email} onChange={handleChange} placeholder="john@company.com" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company (Optional)</label>
                  <input type="text" id="company" name="company" maxLength={120} value={formData.company} onChange={handleChange} placeholder="Your Company" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number (Optional)</label>
                  <input type="tel" id="phone" name="phone" maxLength={25} value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="service">Service Needed *</label>
                <select id="service" name="service" value={formData.service} onChange={handleChange} required>
                  <option value="Software Development">Software Development</option>
                  <option value="Creative Design">Creative Design</option>
                  <option value="Virtual Assistance">Virtual Assistance</option>
                  <option value="Digital Content Creation">Digital Content Creation</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="budget">Budget Range *</label>
                <select id="budget" name="budget" value={formData.budget} onChange={handleChange} required>
                  <option value="" disabled>Select a range</option>
                  <option value="<$5k">Less than $5,000</option>
                  <option value="$5k-$10k">$5,000 - $10,000</option>
                  <option value="$10k-$25k">$10,000 - $25,000</option>
                  <option value="$25k-$50k">$25,000 - $50,000</option>
                  <option value=">$50k">$50,000+</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Project Description *</label>
                <textarea id="description" name="description" rows="5" required value={formData.description} onChange={handleChange} placeholder="Tell us about your project goals, timeline, and requirements..."></textarea>
              </div>

              <div className="form-group">
                <label>Preferred Contact Method</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="contactMethod" value="Email" checked={formData.contactMethod === 'Email'} onChange={handleChange} />
                    <span>Email</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="contactMethod" value="Phone" checked={formData.contactMethod === 'Phone'} onChange={handleChange} />
                    <span>Phone</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                Send Project Request <Send size={18} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
