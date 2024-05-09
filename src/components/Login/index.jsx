// src/components/Login/index.jsx

import React, { useState } from 'react';
import axios from 'axios';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(true); // Para alternar entre login e cadastro
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password
      });
      if (response.data.success) {
        onLoginSuccess(response.data.user);
      } else {
        setError('Falha no login. Por favor, tente novamente.');
      }
    } catch (e) {
      setError('Erro ao conectar ao servidor.');
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        username,
        password
      });
      if (response.data.success) {
        setError('Cadastro realizado com sucesso. Por favor, faça login.');
        setIsSigningUp(false); // Troca de volta para o login após o registro bem-sucedido
      } else {
        setError('Falha no cadastro. Por favor, tente novamente.');
      }
    } catch (e) {
      setError('Erro ao conectar ao servidor.');
    }
  };

  return (
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
            aria-describedby="userHelp"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div id="userHelp" class="form-text">We'll never share your information with anyone else.</div>
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
  );
}

export default Login;
