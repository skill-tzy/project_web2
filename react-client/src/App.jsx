import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000/api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Fungsi untuk memuat data todos dari API
  const load = async () => {
    setLoading(true);
    setErr("");

    try {
      const r = await fetch(`${API}/todos`);
      if (!r.ok) throw new Error("Gagal memuat");
      setTodos(await r.json());
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menambahkan todo baru
  const create = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const r = await fetch(`${API}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!r.ok) throw new Error("Gagal menambah");
      setTitle("");
      await load();
    } catch (e) {
      setErr(e.message);
    }
  };

  // Jalankan load() saat komponen pertama kali dirender
  useEffect(() => {
    load();
  }, []);

  return (
    <main style={{ maxWidth: 720, margin: "2rem auto", padding: 16 }}>
      <h1>Todos</h1>

      <form
        onSubmit={create}
        style={{ display: "flex", gap: 8, marginBottom: 16 }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add todo..."
        />
        <button>Add</button>
      </form>

      {loading && <p>Loading…</p>}
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.title} {t.completed ? "✅" : "🕘"}
          </li>
        ))}
      </ul>
    </main>
  );
}
