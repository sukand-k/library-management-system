import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await API.get(`/books/${id}`);
      setBook(res.data);
    };
    load().catch(console.error);
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Copies: {book.copies}</p>
      <p>Available: {book.available}</p>
      <button onClick={() => navigate('/books')} style={{ marginRight: 10 }}>Back to list</button>
      {token && <button onClick={handleLogout} style={{ backgroundColor: '#ff6b6b', color: 'white' }}>Logout</button>}
    </div>
  );
}
