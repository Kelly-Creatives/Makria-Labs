import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { API_BASE, apiFetch } from '../auth';

const API_URL = `${API_BASE}/portfolio`;

export default function PortfolioManager() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '', category: '', description: '', technologies: '', image: ''
  });

  const fetchPortfolio = async () => {
    const response = await apiFetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch portfolio items');
    }
    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    fetchPortfolio().catch(() => {});
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        ...item,
        technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : ''
      });
    } else {
      setEditingItem(null);
      setFormData({ title: '', category: '', description: '', technologies: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setFormData((prev) => ({ ...prev, image: '' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    };

    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `${API_URL}/${editingItem.id}` : API_URL;

    const response = await apiFetch(url, {
      method,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to save portfolio item');
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
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    const response = await apiFetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Failed to delete portfolio item');
    }

    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Portfolio Manager</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Technologies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }}
                    />
                  ) : (
                    <div style={{ width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      Img
                    </div>
                  )}
                </td>
                <td style={{ fontWeight: 500 }}>{item.title}</td>
                <td>{item.category}</td>
                <td>
                  {(item.technologies || []).map((tech) => (
                    <span key={`${item.id}-${tech}`} className="badge">{tech}</span>
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
              <h2>{editingItem ? 'Edit Portfolio Item' : 'Add Portfolio Item'}</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input required type="text" className="form-input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <input required type="text" className="form-input" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Technologies (comma separated)</label>
                <input required type="text" className="form-input" value={formData.technologies} onChange={(e) => setFormData({ ...formData, technologies: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-input"
                  onChange={handleImageChange}
                />
                {formData.image && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <img
                      src={formData.image}
                      alt="Preview"
                      style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)' }}
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea required className="form-textarea" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingItem ? 'Save Changes' : 'Add Item'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
