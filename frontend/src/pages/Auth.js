import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Modal from '../components/Modal';
import '../styles/Auth.css';

export const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="role-selection-container">
      <div className="role-card">
        <h1>Club Management System</h1>
        <p className="subtitle">Select your role to continue</p>
        
        <div className="role-buttons">
          <button 
            className="role-button student-btn"
            onClick={() => navigate('/student/login')}
          >
            <div className="role-icon">👨‍🎓</div>
            <span>Student</span>
          </button>
          
          <button 
            className="role-button admin-btn"
            onClick={() => navigate('/admin/login')}
          >
            <div className="role-icon">⚙️</div>
            <span>Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const StudentLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'alert' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form, 'student');
      navigate('/student/dashboard');
    } catch (err) {
      const errorMessage = typeof err === 'string' ? err : (err?.message || 'Login failed. Please try again.');
      setModal({
        isOpen: true,
        title: 'Login Failed',
        message: errorMessage,
        type: 'error',
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Student Login</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p className="toggle-text">
          Don't have an account? <a href="/student/signup">Sign up here</a>
        </p>
        
        <button className="back-btn" onClick={() => navigate('/')}>
          Back to Role Selection
        </button>
      </div>

      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onConfirm={() => setModal({ ...modal, isOpen: false })}
      />
    </div>
  );
};

export const StudentSignup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phone: '',
    skills: [],
    bio: '',
  });
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'alert' });
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'skills' ? value.split(',').map(s => s.trim()) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      setModal({
        isOpen: true,
        title: 'Success!',
        message: 'Account created successfully! Redirecting to dashboard...',
        type: 'success',
        onConfirm: () => navigate('/student/dashboard'),
      });
    } catch (err) {
      const errorMessage = typeof err === 'string' ? err : (err?.message || 'Signup failed. Please try again.');
      setModal({
        isOpen: true,
        title: 'Signup Failed',
        message: errorMessage,
        type: 'error',
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Student Sign Up</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma-separated)"
            value={form.skills.join(', ')}
            onChange={handleChange}
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={form.bio}
            onChange={handleChange}
            rows="4"
          />
          <button type="submit">Sign Up</button>
        </form>

        <p className="toggle-text">
          Already have an account? <a href="/student/login">Login here</a>
        </p>
        
        <button className="back-btn" onClick={() => navigate('/')}>
          Back to Role Selection
        </button>
      </div>

      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onConfirm={() => {
          setModal({ ...modal, isOpen: false });
          if (modal.onConfirm) {
            modal.onConfirm();
          }
        }}
      />
    </div>
  );
};

export const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'alert' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form, 'admin');
      navigate('/admin/dashboard');
    } catch (err) {
      const errorMessage = typeof err === 'string' ? err : (err?.message || 'Login failed. Please try again.');
      setModal({
        isOpen: true,
        title: 'Login Failed',
        message: errorMessage,
        type: 'error',
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Admin Login</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p className="toggle-text" style={{ textAlign: 'center' }}>
          Contact administrator for account creation
        </p>
        
        <button className="back-btn" onClick={() => navigate('/')}>
          Back to Role Selection
        </button>
      </div>

      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onConfirm={() => setModal({ ...modal, isOpen: false })}
      />
    </div>
  );
};
