import { Link, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-brand">
          PW2&nbsp;·&nbsp;<span style={{ fontWeight: 500 }}>Todo API Client</span>
        </div>

        <nav className="app-nav">
          <Link to="/todos">Todos</Link>
          {!isAuthenticated && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>

        <div className="app-header-right">
          {isAuthenticated ? (
            <>
              <span className="tag">
                <span>Login:</span>
                <strong>{user?.name}</strong>
              </span>
              <button className="btn btn-ghost" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <span className="tag">Belum login</span>
          )}
        </div>
      </header>

      <main className="app-main">
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
      </main>
    </div>
  );
}

export default App;