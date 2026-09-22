import { useEffect, useState } from 'react';
import { Briefcase, Image, MessageSquare, TrendingUp, Mail } from 'lucide-react';
import { API_BASE, apiFetch } from '../auth';

export default function Dashboard() {
  const [stats, setStats] = useState({ services: 0, portfolio: 0, testimonials: 0, contacts: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [servicesRes, portfolioRes, testimonialsRes, contactsRes] = await Promise.all([
          apiFetch(`${API_BASE}/services`),
          apiFetch(`${API_BASE}/portfolio`),
          apiFetch(`${API_BASE}/testimonials`),
          apiFetch(`${API_BASE}/contacts`)
        ]);

        const [services, portfolio, testimonials, contacts] = await Promise.all([
          servicesRes.json(),
          portfolioRes.json(),
          testimonialsRes.json(),
          contactsRes.json()
        ]);

        setStats({
          services: services.length,
          portfolio: portfolio.length,
          testimonials: testimonials.length,
          contacts: Array.isArray(contacts) ? contacts.length : 0
        });
      } catch (error) {
        // Failed to load dashboard stats silently.
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <button className="btn btn-primary">
          <TrendingUp size={16} /> Generate Report
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Briefcase size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Services</h3>
            <p>{stats.services}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Image size={24} />
          </div>
          <div className="stat-info">
            <h3>Portfolio Items</h3>
            <p>{stats.portfolio}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <MessageSquare size={24} />
          </div>
          <div className="stat-info">
            <h3>Testimonials</h3>
            <p>{stats.testimonials}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Mail size={24} />
          </div>
          <div className="stat-info">
            <h3>Leads / Contacts</h3>
            <p>{stats.contacts}</p>
          </div>
        </div>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Recent Activity</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Added new portfolio item</td>
              <td>Today</td>
              <td><span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}>Completed</span></td>
            </tr>
            <tr>
              <td>Updated service data</td>
              <td>Yesterday</td>
              <td><span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}>Completed</span></td>
            </tr>
            <tr>
              <td>Synced testimonial records</td>
              <td>Recent</td>
              <td><span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}>Completed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
