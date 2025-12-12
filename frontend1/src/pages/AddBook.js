import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [copies, setCopies] = useState(1);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/books', { title, author, copies });
      navigate('/books');
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={submit}>
        <div>
          <label>Title</label><br />
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Author</label><br />
          <input value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div>
          <label>Copies</label><br />
          <input type="number" value={copies} onChange={e => setCopies(Number(e.target.value))} min="1" />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
