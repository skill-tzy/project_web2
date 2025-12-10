import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // efek: ambil data ketika komponen pertama kali muncul
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error('Error fetching todos', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []); // [] -> hanya sekali

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Todo Dummy (JSONPlaceholder)</h1>

      {loading && <p>Loading...</p>}

      {!loading && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} {todo.completed ? '✅' : '❌'}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;