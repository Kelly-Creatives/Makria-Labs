import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PortfolioManager from './pages/PortfolioManager';
import ServicesManager from './pages/ServicesManager';
import TestimonialsManager from './pages/TestimonialsManager';
import ContactsManager from './pages/ContactsManager';
import Login from './pages/Login';
import { isAuthenticated } from './auth';
import './index.css';

function ProtectedRoute({ children }) {
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Navigate to="/" replace />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="portfolio" element={<PortfolioManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="contacts" element={<ContactsManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
