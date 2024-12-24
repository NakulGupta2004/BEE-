import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/validateData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="sign-in-section">
          <h1>Login</h1>

          <div className="social-buttons">
            <button className="social-button">
              <FaFacebook />
            </button>
            <button className="social-button">
              <FaTwitter />
            </button>
            <button className="social-button">
              <FaLinkedin />
            </button>
            <button className="social-button">
              <FaEnvelope />
            </button>
          </div>

          <p className="divider">or use your username and password</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="sign-in-button" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        <div className="welcome-section">
          <h2>Welcome Back!</h2>
          <p>To keep connected with us, please login with your personal info</p>
          <div className="button-group">
            <button className="sign-up-button" onClick={() => navigate('/register')}>REGISTER</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

