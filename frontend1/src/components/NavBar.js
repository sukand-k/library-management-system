import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NavBar() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <nav style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ marginRight: 10 }}>Home</Link>
      <Link to="/books" style={{ marginRight: 10 }}>Books</Link>
      {!token ? (
        <>
          <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
          <Link to="/signup" style={{ marginRight: 10 }}>Sign Up</Link>
        </>
      ) : (
        <button onClick={handleLogout} style={{ marginLeft: 8 }}>Logout</button>
      )}
    </nav>
  );
}
