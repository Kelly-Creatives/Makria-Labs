import { useState, useEffect } from 'react';
import { Mail, Trash2, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { API_BASE, apiFetch } from '../auth';

const API_URL = `${API_BASE}/contacts`;

export default function ContactsManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState('');

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await apiFetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      setItems(data);
    } catch {
      // Silent fail — auth.js will redirect on 401
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this contact submission? This cannot be undone.')) return;
    const response = await apiFetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete contact');
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const filtered = items.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.name?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q) ||
      item.company?.toLowerCase().includes(q) ||
      item.service?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">
          <Mail size={22} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
          Contact Submissions
        </h1>
        <span className="badge" style={{ fontSize: '0.9rem', padding: '0.35rem 0.75rem' }}>
          {items.length} lead{items.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Search bar */}
      <div style={{ marginBottom: '1.25rem', position: 'relative', maxWidth: 380 }}>
        <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          className="form-input"
          placeholder="Search by name, email, service…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: '2.25rem' }}
        />
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-muted)', padding: '2rem 0' }}>Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="data-table-container" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <Mail size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-muted)' }}>
            {items.length === 0 ? 'No contact submissions yet. They will appear here once visitors submit the form.' : 'No results match your search.'}
          </p>
        </div>
      ) : (
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Service</th>
                <th>Budget</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <>
                  <tr key={item.id} style={{ cursor: 'pointer' }} onClick={() => toggleExpand(item.id)}>
                    <td style={{ fontWeight: 500 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {expandedId === item.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        {item.name}
                      </span>
                    </td>
                    <td>
                      <a href={`mailto:${item.email}`} style={{ color: 'var(--accent)', textDecoration: 'none' }} onClick={(e) => e.stopPropagation()}>
                        {item.email}
                      </a>
                    </td>
                    <td>{item.company || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                    <td>
                      {item.service ? (
                        <span className="badge">{item.service}</span>
                      ) : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                    </td>
                    <td>{item.budget || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatDate(item.created_at)}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        style={{ padding: '0.25rem 0.5rem' }}
                        onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>

                  {expandedId === item.id && (
                    <tr key={`${item.id}-expanded`}>
                      <td colSpan={7}>
                        <div style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 10,
                          padding: '1.25rem 1.5rem',
                          margin: '0.25rem 0 0.75rem',
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '1rem'
                        }}>
                          <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</p>
                            <p>{item.phone || '—'}</p>
                          </div>
                          <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preferred Contact</p>
                            <p>{item.contact_method || '—'}</p>
                          </div>
                          <div style={{ gridColumn: '1 / -1' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project Description</p>
                            <p style={{ lineHeight: 1.6, color: 'var(--text-main)' }}>{item.description || '—'}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
