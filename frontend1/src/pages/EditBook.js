import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [copies, setCopies] = useState('');
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await API.get(`/books/${id}`);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setIsbn(res.data.isbn || '');
        setCopies(res.data.copies);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/books/${id}`, { title, author, isbn, copies: parseInt(copies) });
      setSuccessMsg('Book updated successfully!');
      setTimeout(() => navigate('/books'), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Book</h2>
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Author:</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label>ISBN:</label>
          <input value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        </div>
        <div>
          <label>Copies:</label>
          <input type="number" value={copies} onChange={(e) => setCopies(e.target.value)} required />
        </div>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}
