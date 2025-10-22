import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, ListGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useVideo } from '../context/VideoContext';
import './Profile.css';

function Profile() {
  const { currentUser, userRole, logout } = useAuth();
  const { videos } = useVideo();
  
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    website: '',
    location: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get user's videos if they're an instructor
  const userVideos = videos.filter(video => video.instructorId === currentUser?.uid);

  useEffect(() => {
    // Load profile data from localStorage or API
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    } else {
      // Initialize with default values
      setProfileData(prev => ({
        ...prev,
        displayName: currentUser?.email?.split('@')[0] || ''
      }));
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      // Save to localStorage (in a real app, this would be an API call)
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      
      setSuccess('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="profile-page">
      <Container>
        <Row>
          <Col lg={4}>
            {/* Profile Card */}
            <Card className="profile-card mb-4">
              <Card.Body className="text-center">
                <div className="profile-avatar">
                  <i className="fas fa-user fa-3x text-primary"></i>
                </div>
                <h3 className="profile-name mt-3">
                  {profileData.displayName || currentUser?.email?.split('@')[0]}
                </h3>
                <p className="profile-email text-muted">
                  {currentUser?.email}
                </p>
                <Badge 
                  bg={userRole === 'instructor' ? 'success' : 'primary'}
                  className="profile-role"
                >
                  {userRole === 'instructor' ? 'Instructor' : 'Student'}
                </Badge>
                
                {profileData.bio && (
                  <p className="profile-bio mt-3">
                    {profileData.bio}
                  </p>
                )}
                
                <div className="profile-meta mt-3">
                  {profileData.location && (
                    <div className="meta-item">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      {profileData.location}
                    </div>
                  )}
                  {profileData.website && (
                    <div className="meta-item">
                      <i className="fas fa-globe me-2"></i>
                      <a 
                        href={profileData.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                      >
                        {profileData.website}
                      </a>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>

            {/* Quick Stats */}
            <Card className="stats-card">
              <Card.Header>
                <h5 className="mb-0">Quick Stats</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span>Account Type</span>
                    <Badge bg={userRole === 'instructor' ? 'success' : 'primary'}>
                      {userRole === 'instructor' ? 'Instructor' : 'Student'}
                    </Badge>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span>Member Since</span>
                    <span>{formatDate(currentUser?.metadata?.creationTime)}</span>
                  </ListGroup.Item>
                  {userRole === 'instructor' && (
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <span>Courses Created</span>
                      <Badge bg="info">{userVideos.length}</Badge>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span>Total Courses</span>
                    <Badge bg="secondary">{videos.length}</Badge>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            {/* Profile Settings */}
            <Card className="settings-card mb-4">
              <Card.Header>
                <h4 className="mb-0">Profile Settings</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSaveProfile}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="displayName"
                          value={profileData.displayName}
                          onChange={handleInputChange}
                          placeholder="Enter your display name"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                          type="text"
                          name="location"
                          value={profileData.location}
                          onChange={handleInputChange}
                          placeholder="Enter your location"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      type="url"
                      name="website"
                      value={profileData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                    />
                  </Form.Group>

                  {/* Alerts */}
                  {error && (
                    <Alert variant="danger" dismissible onClose={() => setError('')}>
                      {error}
                    </Alert>
                  )}
                  
                  {success && (
                    <Alert variant="success" dismissible onClose={() => setSuccess('')}>
                      {success}
                    </Alert>
                  )}

                  <div className="settings-actions">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {/* User's Courses (for instructors) */}
            {userRole === 'instructor' && userVideos.length > 0 && (
              <Card className="courses-card">
                <Card.Header>
                  <h4 className="mb-0">Your Courses</h4>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {userVideos.map(video => (
                      <ListGroup.Item key={video._id} className="course-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="course-title mb-1">{video.title}</h6>
                            <p className="course-meta text-muted mb-0">
                              {video.category} • {formatDate(video.createdAt)}
                            </p>
                          </div>
                          <div className="course-actions">
                            <Badge bg="primary" className="me-2">
                              {video.category}
                            </Badge>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              href={`/video/${video._id}`}
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}

            {/* Account Actions */}
            <Card className="account-card">
              <Card.Header>
                <h4 className="mb-0">Account Actions</h4>
              </Card.Header>
              <Card.Body>
                <div className="account-actions">
                  <Button
                    variant="outline-danger"
                    onClick={handleLogout}
                    className="me-2"
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Logout
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => window.location.reload()}
                  >
                    <i className="fas fa-sync-alt me-2"></i>
                    Refresh
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;