import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { API_BASE, apiFetch } from '../auth';

const API_URL = `${API_BASE}/services`;

export default function ServicesManager() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '', description: '', icon: '', capabilities: ''
  });

  const fetchServices = async () => {
    const response = await apiFetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    fetchServices().catch(() => {});
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        ...item,
        capabilities: Array.isArray(item.capabilities) ? item.capabilities.join(', ') : ''
      });
    } else {
      setEditingItem(null);
      setFormData({ title: '', description: '', icon: 'Code', capabilities: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      capabilities: formData.capabilities.split(',').map((t) => t.trim()).filter(Boolean)
    };

    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `${API_URL}/${editingItem.id}` : API_URL;

    const response = await apiFetch(url, {
      method,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to save service');
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
    if (!confirm('Are you sure you want to delete this service?')) {
      return;
    }

    const response = await apiFetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Failed to delete service');
    }

    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Services Manager</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Icon</th>
              <th>Description</th>
              <th>Capabilities</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 500, minWidth: '150px' }}>{item.title}</td>
                <td><span className="badge">{item.icon}</span></td>
                <td style={{ maxWidth: '300px' }}>{item.description}</td>
                <td>
                  {(item.capabilities || []).map((cap) => (
                    <span key={`${item.id}-${cap}`} className="badge">{cap}</span>
                  ))}
                </td>
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
              <h2>{editingItem ? 'Edit Service' : 'Add Service'}</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Service Title</label>
                <input required type="text" className="form-input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Icon (Lucide name)</label>
                <input required type="text" className="form-input" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Capabilities (comma separated)</label>
                <input required type="text" className="form-input" value={formData.capabilities} onChange={(e) => setFormData({ ...formData, capabilities: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea required className="form-textarea" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingItem ? 'Save Changes' : 'Add Service'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
