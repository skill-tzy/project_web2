import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todo';

function TodoPage() {
  const { token, user } = useAuth();

  // State
  const [todos, setTodos]       = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading]   = useState(false);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');

  // READ: load data awal dari API
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getTodos(token);
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  // CREATE: tambah todo baru
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setSaving(true);
    setError('');

    try {
      await createTodo(token, { title: newTitle.trim() });
      setNewTitle('');

      // reload dari server supaya data sinkron
      const data = await getTodos(token);
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // UPDATE: toggle completed
  const handleToggle = async (todo) => {
    setError('');
    try {
      await updateTodo(token, todo.id, { completed: !todo.completed });

      // bisa pilih: reload dari server atau update lokal
      const data = await getTodos(token);
      setTodos(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE: hapus todo
  const handleDelete = async (todo) => {
    if (!window.confirm(`Hapus todo "${todo.title}"?`)) return;

    setError('');
    try {
      await deleteTodo(token, todo.id);
      // update state lokal
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card">
      <header className="card-header">
        <h1 className="card-title">Daftar Todo</h1>
        <p className="card-subtitle">
          Todo ini diambil dari Laravel API menggunakan token milik{' '}
          <strong>{user?.name}</strong>.
        </p>
      </header>

      <div className="card-body">
        {/* Form tambah todo */}
        <form className="form-vertical" onSubmit={handleCreate}>
          <div className="form-field">
            <label className="form-label" htmlFor="newTitle">
              Tambah Todo
            </label>
            <input
              id="newTitle"
              className="input"
              placeholder="Contoh: Kerjakan tugas PW2..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          <div className="btn-row">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving || !newTitle.trim()}
            >
              {saving ? 'Menyimpan...' : 'Tambah'}
            </button>
          </div>
        </form>

        {/* Tampilkan error global jika ada */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* List Todo */}
        <div style={{ marginTop: '1.25rem' }}>
          {loading ? (
            <p>Sedang memuat data...</p>
          ) : todos.length === 0 ? (
            <p>Belum ada todo. Silakan tambahkan di form di atas.</p>
          ) : (
            <ul className="todo-list">
              {todos.map((todo) => (
                <li key={todo.id} className="todo-item">
                  <div className="todo-main">
                    <span className="todo-title">
                      <input
                        type="checkbox"
                        checked={!!todo.completed}
                        onChange={() => handleToggle(todo)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      <span
                        style={{
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          opacity: todo.completed ? 0.6 : 1,
                        }}
                      >
                        {todo.title}
                      </span>
                    </span>

                    <span className="todo-meta">
                      ID: {todo.id} · Dibuat: {new Date(todo.created_at).toLocaleString()}
                    </span>
                  </div>

                  <div className="todo-actions">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => handleDelete(todo)}
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default TodoPage;