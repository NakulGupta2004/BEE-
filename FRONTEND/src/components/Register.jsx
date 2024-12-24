import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      if (confirmPassword === password) {
        const response = await fetch('http://localhost:5000/saveData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });
  
        const data = await response.json();

        if (response.ok) {
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          alert('Registration successful!');
          navigate('/login');
        } else {
          setError(data.message || 'Registration failed!');
        }
      } else {
        setError('Passwords do not match!');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Registration failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="register-container">
      <div className="register-card">
        <div className="sign-in-section">
          <h1>Register</h1>
          
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

          <p className="divider">or use your email and password</p>

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
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="sign-in-button" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Sign Up'}
            </button>
          </form>
        </div>

        <div className="welcome-section">
          <h2>Hello, Friend!</h2>
          <p>Create your account to access our services</p>
          <div className="btn">
            <button className="sign-up-button" onClick={() => navigate('/login')}>LOGIN</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

