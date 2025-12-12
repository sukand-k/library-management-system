import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to Library Management</h1>
      <p>Manage your books and member loans easily.</p>
      {token && <button onClick={handleLogout} style={{ backgroundColor: '#ff6b6b', color: 'white', marginTop: 20 }}>Logout</button>}
    </div>
  );
}

export default Home;
