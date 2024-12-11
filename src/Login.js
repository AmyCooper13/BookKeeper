
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      onLogin(); 
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  <div>
    <h1> Login: </h1>
  </div>

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <Link to="/books">View Books (Guest View)</Link>
    </form>
  );
};

export default Login;
