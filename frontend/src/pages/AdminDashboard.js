import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedClubMembers, setSelectedClubMembers] = useState(null);
  const [clubMembers, setClubMembers] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'alert', onConfirm: null });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchApplications();
    fetchClubs();
  }, [user, navigate]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/api/admin/applications', {
        withCredentials: true,
      });
      setApplications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
  };

  const fetchClubs = async () => {
    try {
      const response = await axios.get('/api/admin/clubs', {
        withCredentials: true,
      });
      setClubs(response.data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const fetchClubMembers = async (clubId) => {
    try {
      const response = await axios.get(`/api/admin/clubs/${clubId}/members`, {
        withCredentials: true,
      });
      setClubMembers(response.data);
      setSelectedClubMembers(clubId);
      setActiveTab('clubs');
    } catch (error) {
      console.error('Error fetching club members:', error);
      alert('Failed to fetch club members');
    }
  };

  const handleRemoveMember = async (studentId, studentName) => {
    setModal({
      isOpen: true,
      title: 'Remove Student',
      message: `Are you sure you want to remove ${studentName} from this club?`,
      type: 'confirm',
      confirmText: 'Remove',
      onConfirm: async () => {
        try {
          await axios.post(
            '/api/admin/remove-member',
            { clubId: selectedClubMembers, studentId },
            { withCredentials: true }
          );
          fetchClubMembers(selectedClubMembers);
          setModal({
            isOpen: true,
            title: 'Success!',
            message: `${studentName} removed from club successfully!`,
            type: 'success',
          });
        } catch (error) {
          setModal({
            isOpen: true,
            title: 'Error',
            message: error.response?.data?.message || 'Failed to remove member',
            type: 'error',
          });
        }
      }
    });
  };

  const handleAcceptApplication = async (studentId, clubId) => {
    try {
      await axios.post(
        '/api/admin/accept-application',
        { studentId, clubId },
        { withCredentials: true }
      );
      fetchApplications();
      setSelectedApplication(null);
      setModal({
        isOpen: true,
        title: 'Success!',
        message: 'Application accepted successfully!',
        type: 'success',
      });
    } catch (error) {
      setModal({
        isOpen: true,
        title: 'Error',
        message: error.response?.data?.message || 'Failed to accept application',
        type: 'error',
      });
    }
  };

  const handleRejectApplication = async (studentId, clubId) => {
    try {
      await axios.post(
        '/api/admin/reject-application',
        { studentId, clubId },
        { withCredentials: true }
      );
      fetchApplications();
      setSelectedApplication(null);
      setModal({
        isOpen: true,
        title: 'Success!',
        message: 'Application rejected successfully!',
        type: 'success',
      });
    } catch (error) {
      setModal({
        isOpen: true,
        title: 'Error',
        message: error.response?.data?.message || 'Failed to reject application',
        type: 'error',
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getClubName = (clubId) => {
    const club = clubs.find((c) => c._id === clubId);
    return club ? club.name : 'Unknown Club';
  };

  return (
    <div className="admin-dashboard-container">
      <header className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.name}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          Pending Applications ({applications.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'clubs' ? 'active' : ''}`}
          onClick={() => setActiveTab('clubs')}
        >
          Clubs
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'applications' && (
          <>
            {selectedApplication ? (
              <div className="application-detail">
                <button
                  className="back-button"
                  onClick={() => setSelectedApplication(null)}
                >
                  ← Back to Applications
                </button>

                <div className="detail-card">
                  <h2>Application Details</h2>
                  
                  <div className="student-info">
                    <h3>Student Information</h3>
                    <p><strong>Name:</strong> {selectedApplication.studentName}</p>
                    <p><strong>Email:</strong> {selectedApplication.studentEmail}</p>
                    <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                    <p><strong>Date of Birth:</strong> {new Date(selectedApplication.dateOfBirth).toLocaleDateString()}</p>
                    <p><strong>Bio:</strong> {selectedApplication.bio || 'N/A'}</p>
                    
                    {selectedApplication.skills && selectedApplication.skills.length > 0 && (
                      <div className="skills-section">
                        <p><strong>Skills:</strong></p>
                        <div className="skills-tags">
                          {selectedApplication.skills.map((skill, idx) => (
                            <span key={idx} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="club-info">
                    <h3>Applied Club: {getClubName(selectedApplication.clubId)}</h3>
                    <p><strong>Applied On:</strong> {new Date(selectedApplication.appliedAt).toLocaleString()}</p>
                  </div>

                  <div className="action-buttons">
                    <button
                      className="accept-btn"
                      onClick={() =>
                        handleAcceptApplication(
                          selectedApplication.studentId,
                          selectedApplication.clubId
                        )
                      }
                    >
                      Accept Application
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() =>
                        handleRejectApplication(
                          selectedApplication.studentId,
                          selectedApplication.clubId
                        )
                      }
                    >
                      Reject Application
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="applications-table">
                {loading ? (
                  <p>Loading...</p>
                ) : applications.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Club</th>
                        <th>Applied On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.applicationId}>
                          <td>{app.studentName}</td>
                          <td>{app.studentEmail}</td>
                          <td>{getClubName(app.clubId)}</td>
                          <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                          <td>
                            <button
                              className="view-btn"
                              onClick={() => setSelectedApplication(app)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="no-data">No pending applications</p>
                )}
              </div>
            )}
          </>
        )}

        {activeTab === 'clubs' && (
          <div className="clubs-management">
            {selectedClubMembers ? (
              <div className="members-view">
                <button
                  className="back-button"
                  onClick={() => setSelectedClubMembers(null)}
                >
                  ← Back to Clubs
                </button>

                <div className="members-card">
                  <h2>
                    Club Members: {clubs.find(c => c._id === selectedClubMembers)?.name}
                  </h2>
                  
                  {clubMembers.length > 0 ? (
                    <div className="members-list">
                      <table>
                        <thead>
                          <tr>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Skills</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clubMembers.map((member) => (
                            <tr key={member._id}>
                              <td>{member.name}</td>
                              <td>{member.email}</td>
                              <td>{member.phone}</td>
                              <td>
                                <div className="member-skills">
                                  {member.skills && member.skills.length > 0 ? (
                                    member.skills.map((skill, idx) => (
                                      <span key={idx} className="skill-tag">
                                        {skill}
                                      </span>
                                    ))
                                  ) : (
                                    <span>No skills listed</span>
                                  )}
                                </div>
                              </td>
                              <td>
                                <button
                                  className="delete-member-btn"
                                  onClick={() => handleRemoveMember(member._id, member.name)}
                                  title="Remove this student from the club"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="no-data">No members in this club yet</p>
                  )}
                  
                  <div className="member-stats">
                    <p>Total Members: {clubMembers.length}</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2>Clubs ({clubs.length})</h2>
                <div className="clubs-grid">
                  {clubs.length > 0 ? (
                    clubs.map((club) => (
                      <div key={club._id} className="club-card">
                        <h3>{club.name}</h3>
                        <p className="club-category">{club.category}</p>
                        <p className="club-description">{club.description}</p>
                        <p className="members-count">
                          Members: {club.currentMembers.length}
                          {club.maxMembers && ` / ${club.maxMembers}`}
                        </p>
                        <button
                          className="view-members-btn"
                          onClick={() => fetchClubMembers(club._id)}
                        >
                          View Members ({club.currentMembers.length})
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No clubs available</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        confirmText={modal.confirmText || 'OK'}
        cancelText={modal.cancelText || 'Cancel'}
        onConfirm={() => {
          setModal({ ...modal, isOpen: false });
          if (modal.onConfirm) {
            modal.onConfirm();
          }
        }}
        onCancel={() => setModal({ ...modal, isOpen: false })}
      />
    </div>
  );
};

export default AdminDashboard;
