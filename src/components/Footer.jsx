import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Footer.css';

const socialLinks = [
  {
    label: 'X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.9 2h3.4l-7.4 8.5L22.8 22h-6.7l-5.2-7.3L4.8 22H1.4l7.9-9.1L1 2h6.9l4.7 6.6L18.9 2Zm-1.1 18.2h1.9L7.2 3.7H5.2l12.6 16.5Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.94 8.5A1.56 1.56 0 1 1 6.93 5.4a1.56 1.56 0 0 1 .01 3.1ZM5.5 9.8h2.9v9.7H5.5V9.8Zm5.1 0h2.8v1.3h.04c.4-.7 1.3-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.7v5.2h-2.9v-4.9c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7v5h-2.9V9.8Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.8 2.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.3A5.7 5.7 0 1 1 12 17.7 5.7 5.7 0 0 1 12 6.3Zm0 1.8A3.9 3.9 0 1 0 12 16.1 3.9 3.9 0 0 0 12 8.1Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.36-1.32-3.36-1.32-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.02 1.53 1.02.9 1.54 2.33 1.1 2.9.84.09-.66.35-1.1.63-1.35-2.21-.25-4.54-1.1-4.54-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.02A9.4 9.4 0 0 1 12 6.8c.85 0 1.7.11 2.5.33 1.9-1.3 2.74-1.02 2.74-1.02.56 1.4.21 2.42.1 2.67.64.7 1.02 1.59 1.02 2.68 0 3.84-2.34 4.68-4.57 4.92.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" fill="currentColor"/>
      </svg>
    )
  }
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top grid">
          <div className="footer-brand">
            <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
              <img
                className="brand-mark"
                src="/makria logo.png"
                alt="Makria Labs logo"
              />
              MAKRIA<span>LABS</span>
            </Link>
            <p className="footer-desc">
              We build digital ideas into real-world impact. Technology meets creativity to move your business forward.
            </p>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="social-icon" aria-label={social.label} title={social.label}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><Link to="/#services">Software Development</Link></li>
              <li><Link to="/#services">Creative Design</Link></li>
              <li><Link to="/#services">Virtual Assistance</Link></li>
              <li><Link to="/#services">Content Creation</Link></li>
              <li><Link to="/#services">Consulting</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link to="/#about">About Us</Link></li>
              <li><Link to="/#process">Our Process</Link></li>
              <li><Link to="/#work">Portfolio</Link></li>
              <li><Link to="/#insights">Insights</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Get in Touch</h4>
            <p>hello@makrialabs.com</p>
            <p>+250794716827</p>
            <p className="location">Kigali Rwanda,Worldwide</p>
            <Link to="/contact" className="btn btn-secondary mt-4">
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Makria Labs. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
