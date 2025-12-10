import { useState, useEffect } from 'react';
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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

  // kalau sudah login, redirect ke /todos
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos');
    }
  }, [isAuthenticated]);


  return (
    <main style={{ padding: '2rem' }}>
      <h1>Login</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 400 }}
      >
        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Login...' : 'Login'}
        </button>

        {error && <p style={{ color: 'crimson' }}>{error}</p>}
      </form>
    </main>
  );
}

export default LoginPage;