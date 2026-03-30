import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import axios from 'axios';
import '../styles/StudentDashboard.css';

const StudentDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('clubs');
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'alert' });

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/');
      return;
    }

    fetchClubs();
    fetchApplications();
  }, [user, navigate]);

  const fetchClubs = async () => {
    try {
      console.log('Fetching clubs from:', axios.defaults.baseURL + '/api/student/clubs');
      const response = await axios.get('/api/student/clubs', { withCredentials: true });
      console.log('Clubs fetched successfully:', response.data);
      setClubs(response.data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      console.error('URL:', error.config?.url);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/api/student/my-applications', {
        withCredentials: true,
      });
      setApplications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
  };

  const handleApplyClub = async (clubId) => {
    try {
      await axios.post(
        '/api/student/apply-club',
        { clubId },
        { withCredentials: true }
      );
      fetchApplications();
      setModal({
        isOpen: true,
        title: 'Success!',
        message: 'Applied to club successfully!',
        type: 'success',
      });
    } catch (error) {
      setModal({
        isOpen: true,
        title: 'Application Failed',
        message: error.response?.data?.message || 'Failed to apply',
        type: 'error',
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isAlreadyApplied = (clubId) => {
    return applications.some((app) => {
      const isCurrentApplication = app.clubId._id === clubId && (app.status === 'pending' || app.status === 'accepted');
      // If removed from club, they can reapply
      const isRemoved = app.clubId._id === clubId && app.status === 'accepted' && app.removedAt;
      return isCurrentApplication && !isRemoved;
    });
  };

  const isPreviouslyRejected = (clubId) => {
    return applications.some(
      (app) => app.clubId._id === clubId && app.status === 'rejected'
    );
  };

  const isRemovedFromClub = (clubId) => {
    return applications.some(
      (app) => app.clubId._id === clubId && app.status === 'accepted' && app.removedAt
    );
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Student Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.name}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'clubs' ? 'active' : ''}`}
          onClick={() => setActiveTab('clubs')}
        >
          Available Clubs
        </button>
        <button
          className={`tab-button ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          My Applications
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'clubs' && (
          <div className="clubs-grid">
            {clubs.length > 0 ? (
              clubs.map((club) => (
                <div key={club._id} className="club-card">
                  <h3>{club.name}</h3>
                  <p className="club-category">📁 {club.category}</p>
                  <p className="club-description">{club.description}</p>
                  
                  {club.requiredSkills && club.requiredSkills.length > 0 && (
                    <div className="skills-section">
                      <p className="skills-label">Required Skills:</p>
                      <div className="skills-tags">
                        {club.requiredSkills.map((skill, idx) => (
                          <span key={idx} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    className={`apply-btn ${isAlreadyApplied(club._id) ? 'disabled' : isRemovedFromClub(club._id) || isPreviouslyRejected(club._id) ? 'reapply' : ''}`}
                    onClick={() => handleApplyClub(club._id)}
                    disabled={isAlreadyApplied(club._id)}
                  >
                    {isAlreadyApplied(club._id)
                      ? 'Already Applied'
                      : isRemovedFromClub(club._id)
                      ? 'Reapply to Club'
                      : isPreviouslyRejected(club._id)
                      ? 'Reapply to Club'
                      : 'Apply to Club'}
                  </button>
                </div>
              ))
            ) : (
              <p className="no-data">No clubs available</p>
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications-list">
            {loading ? (
              <p>Loading...</p>
            ) : applications.length > 0 ? (
              applications.map((app) => (
                <div key={app._id} className="application-card">
                  <div className="app-header">
                    <h3>{app.clubId.name}</h3>
                    <span className={`status-badge ${app.status} ${app.removedAt ? 'removed' : ''}`}>
                      {app.removedAt
                        ? 'Accepted but Removed'
                        : app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                  <p className="app-category">Category: {app.clubId.category}</p>
                  <p className="app-date">
                    Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                  {app.removedAt && (
                    <p className="app-removed-date">
                      Removed on: {new Date(app.removedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="no-data">No applications yet</p>
            )}
          </div>
        )}
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

export default StudentDashboard;
