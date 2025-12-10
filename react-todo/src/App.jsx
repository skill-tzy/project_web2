import { Link, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          borderBottom: '1px solid #ddd',
        }}
      >
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/todos">Todos</Link>
          {!isAuthenticated && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>

        <div>
          {isAuthenticated ? (
            <>
              <span style={{ marginRight: '1rem' }}>
                Login sebagai: <strong>{user?.name}</strong>
              </span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <span>Belum login</span>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <TodoPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;