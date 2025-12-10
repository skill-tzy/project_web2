import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [form, setForm]   = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const res = await loginApi(form);
    
      const token = res.data.token;
      const user  = res.data.user;
    
      login(token, user);
    
      navigate('/todos');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <header className="card-header">
        <h1 className="card-title">Login</h1>
        <p className="card-subtitle">
          Masuk untuk mengakses Todo API yang sudah dibuat di Laravel.
        </p>
      </header>

      <div className="card-body">
        <form className="form-vertical" onSubmit={handleSubmit}>
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

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <div className="btn-row">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Login...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;