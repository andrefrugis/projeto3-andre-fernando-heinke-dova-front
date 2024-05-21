// src/components/Login/index.jsx
import React, { useState } from 'react';
import axios from 'axios';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import AppBar from '../Appbar';



function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(true); // Para alternar entre login e cadastro
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');


  const handleLogin = async (event) => {
    event.preventDefault();
    const data = {
        username: username,
        email: email,
        password: password,
    }
    try {
      await axios.post('http://projeto-3-andre-fernando-heinke-dova.onrender.com/api/token/', data).then(response => {
        const token = response.data.token;
        console.log('isSigningUp:', isSigningUp);
        localStorage.setItem('token', token);
        console.log(token)
      });
      navigate('/');
    } catch (e) {
      setError('Erro ao conectar ao servidor.');
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const data = {
        username: username,
        email: email,
        password: password,
    }
    try {
      await axios.post('http://projeto-3-andre-fernando-heinke-dova.onrender.com/api/users/', data);
      setIsSigningUp(false);
    } catch (e) {
      setError('Erro ao conectar ao servidor.');
    }
  };

  return (
    <>
    <AppBar />
    <div className="login-container">
      <form onSubmit={isSigningUp ? handleSignUp : handleLogin}>
        <h2>{isSigningUp ? 'Cadastrar' : 'Login'}</h2>
        {error && <p className="error">{error}</p>}
        <div className="mb-3">
          <label for="username" className="form-label">Usuário</label>
          <input
            id="username"
            type="text"
            value={username}
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input 
          type="email" 
          className="form-control" 
          id="exampleInputEmail1" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">
          {isSigningUp ? 'Cadastrar' : 'Entrar'}
        </button>
        <button type="button" className="toggle-button" onClick={() => setIsSigningUp(!isSigningUp)}>
          {isSigningUp ? 'Já tem uma conta? Entrar' : 'Não tem uma conta? Cadastre-se'}
        </button>
      </form>
    </div>
    </>
  );
}

export default Login;
