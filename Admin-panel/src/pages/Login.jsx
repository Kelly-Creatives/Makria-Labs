import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE, setToken } from '../auth';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: 'admin', password: 'admin123' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE}/auth/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      if (response.status < 200 || response.status >= 300) {
        throw new Error(data.message || 'Login failed');
      }

      setToken(data.token);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <img src="/makria logo.png" alt="Makria" className="auth-logo" />
          <div>
            <div className="auth-kicker">Admin Access</div>
            <h1>Makria</h1>
          </div>
        </div>

        <div className="auth-demo">
          <div className="auth-demo-label">Demo login</div>
          <div><strong>Username:</strong> admin</div>
          <div><strong>Password:</strong> admin123</div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={formData.username}
              onChange={(event) => setFormData({ ...formData, username: event.target.value })}
              placeholder="admin"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={formData.password}
              onChange={(event) => setFormData({ ...formData, password: event.target.value })}
              placeholder="admin123"
              required
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="btn btn-primary auth-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
