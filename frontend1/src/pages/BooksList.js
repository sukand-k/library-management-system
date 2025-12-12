import { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await API.get('/books');
      setBooks(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await API.delete(`/books/${id}`);
        setBooks(books.filter(b => b._id !== id));
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div>
      <h2>Books</h2>
      <Link to="/books/add">Add New Book</Link>
      <ul>
        {books.map(b => (
          <li key={b._id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Link to={`/books/${b._id}`}>{b.title}</Link> — {b.author} — Available: {b.available}
              </div>
              <div style={{ gap: '8px', display: 'flex' }}>
                <button onClick={() => navigate(`/books/${b._id}/edit`)} style={{ background: '#ffa500', padding: '6px 12px', fontSize: '14px' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(b._id)} style={{ background: '#dc3545', padding: '6px 12px', fontSize: '14px' }}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
