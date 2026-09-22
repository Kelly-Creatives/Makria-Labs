import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { name: 'Services', path: '/#services' },
  { name: 'Work', path: '/#work' },
  { name: 'Process', path: '/#process' },
  { name: 'About', path: '/#about' },
  { name: 'Insights', path: '/#insights' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, path) => {
    setIsOpen(false);
    
    if (path.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(path.substring(2));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
          <img
            className="brand-mark"
            src="/makria logo.png"
            alt="Makria Labs logo"
          />
          MAKRIA<span>LABS</span>
        </Link>

        <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="nav-item"
              onClick={(e) => handleNavClick(e, link.path)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary nav-cta" onClick={() => setIsOpen(false)}>
            Start a Project <ArrowRight size={18} />
          </Link>
        </nav>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
}
