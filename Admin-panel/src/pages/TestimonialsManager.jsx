import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { API_BASE, apiFetch } from '../auth';

const API_URL = `${API_BASE}/testimonials`;

export default function TestimonialsManager() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: '', company: '', role: '', text: '', avatar: ''
  });

  const fetchTestimonials = async () => {
    const response = await apiFetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }
    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    fetchTestimonials().catch(() => {});
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ name: '', company: '', role: '', text: '', avatar: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `${API_URL}/${editingItem.id}` : API_URL;

    const response = await apiFetch(url, {
      method,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to save testimonial');
    }

    const savedItem = await response.json();

    setItems((currentItems) => {
      if (editingItem) {
        return currentItems.map((item) => (item.id === savedItem.id ? savedItem : item));
      }
      return [...currentItems, savedItem];
    });

    handleCloseModal();
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    const response = await apiFetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Failed to delete testimonial');
    }

    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Testimonials Manager</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Company</th>
              <th>Review Text</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{item.name}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{item.role}</span>
                  </div>
                </td>
                <td>{item.company}</td>
                <td style={{ maxWidth: '400px', fontStyle: 'italic' }}>&ldquo;{item.text}&rdquo;</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleOpenModal(item)}>
                      <Edit2 size={14} />
                    </button>
                    <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleDelete(item.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingItem ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Client Name</label>
                <input required type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Role</label>
                  <input required type="text" className="form-input" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Company</label>
                  <input required type="text" className="form-input" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Review Text</label>
                <textarea required className="form-textarea" value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })}></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingItem ? 'Save Changes' : 'Add Testimonial'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
