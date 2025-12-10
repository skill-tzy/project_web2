import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      await registerApi(form);
      navigate('/login'); // setelah registrasi, user login manual
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <header className="card-header">
        <h1 className="card-title">Buat Akun Baru</h1>
        <p className="card-subtitle">
          Daftar terlebih dahulu untuk bisa mengelola Todo dari Laravel API.
        </p>
      </header>

      <div className="card-body">
        <form className="form-vertical" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label" htmlFor="name">
              Nama
            </label>
            <input
              id="name"
              name="name"
              className="input"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="password_confirmation">
              Konfirmasi Password
            </label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              className="input"
              value={form.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <div className="btn-row">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Mendaftar...' : 'Daftar'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RegisterPage;