import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useVideo } from '../context/VideoContext';
import { useAuth } from '../context/AuthContext';
import VideoCard from '../components/VideoCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { debounce } from 'lodash';
import './Dashboard.css';

function Dashboard() {
  const { videos, loading, error, fetchVideos } = useVideo();
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(videos.map(video => video.category))];
    return ['all', ...uniqueCategories];
  }, [videos]);

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    let filtered = videos;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    // Sort videos
    switch (sortBy) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'title':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'instructor':
        return filtered.sort((a, b) => a.instructor.localeCompare(b.instructor));
      default:
        return filtered;
    }
  }, [videos, searchTerm, selectedCategory, sortBy]);

  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchTerm(value), 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleRefresh = () => {
    fetchVideos();
  };

  if (loading && videos.length === 0) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  return (
    <div className="dashboard-page">
      <Container fluid>
        {/* Header Section */}
        <Row className="dashboard-header">
          <Col>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h1 className="dashboard-title">
                  Welcome back, {currentUser?.email?.split('@')[0]}!
                </h1>
                <p className="dashboard-subtitle">
                  {userRole === 'instructor' 
                    ? 'Manage your courses and track student engagement'
                    : 'Continue your learning journey'
                  }
                </p>
              </div>
              <div className="dashboard-actions">
                <Button 
                  variant="outline-primary" 
                  onClick={handleRefresh}
                  className="me-2"
                >
                  <i className="fas fa-sync-alt"></i> Refresh
                </Button>
                {userRole === 'instructor' && (
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/upload')}
                  >
                    <i className="fas fa-plus"></i> Upload Course
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={3} sm={6} className="mb-3">
            <Card className="stats-card">
              <Card.Body className="text-center">
                <i className="fas fa-video stats-icon text-primary"></i>
                <h3 className="stats-number">{videos.length}</h3>
                <p className="stats-label">Total Courses</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="stats-card">
              <Card.Body className="text-center">
                <i className="fas fa-users stats-icon text-success"></i>
                <h3 className="stats-number">{categories.length - 1}</h3>
                <p className="stats-label">Categories</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="stats-card">
              <Card.Body className="text-center">
                <i className="fas fa-clock stats-icon text-warning"></i>
                <h3 className="stats-number">
                  {videos.filter(v => 
                    new Date(v.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length}
                </h3>
                <p className="stats-label">This Week</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="stats-card">
              <Card.Body className="text-center">
                <i className="fas fa-star stats-icon text-info"></i>
                <h3 className="stats-number">
                  {userRole === 'instructor' 
                    ? videos.filter(v => v.instructorId === currentUser?.uid).length
                    : '0'
                  }
                </h3>
                <p className="stats-label">My Courses</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Search and Filter Section */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={4} md={6} className="mb-3">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Search courses..."
                        onChange={handleSearchChange}
                        className="search-input"
                      />
                      <Button variant="outline-secondary" id="search-button">
                        <i className="fas fa-search"></i>
                      </Button>
                    </InputGroup>
                  </Col>
                  
                  <Col lg={2} md={6} className="mb-3">
                    <Form.Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  
                  <Col lg={2} md={6} className="mb-3">
                    <Form.Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="title">Title A-Z</option>
                      <option value="instructor">Instructor A-Z</option>
                    </Form.Select>
                  </Col>
                  
                  <Col lg={2} md={6} className="mb-3">
                    <div className="view-toggle">
                      <Button
                        variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="me-1"
                      >
                        <i className="fas fa-th"></i>
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                      >
                        <i className="fas fa-list"></i>
                      </Button>
                    </div>
                  </Col>
                  
                  <Col lg={2} className="mb-3">
                    <Badge bg="primary" className="results-badge">
                      {filteredVideos.length} results
                    </Badge>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Error Alert */}
        {error && (
          <Row className="mb-4">
            <Col>
              <Alert variant="danger" dismissible>
                <Alert.Heading>Error Loading Videos</Alert.Heading>
                <p>{error}</p>
                <Button variant="outline-danger" onClick={handleRefresh}>
                  Try Again
                </Button>
              </Alert>
            </Col>
          </Row>
        )}

        {/* Videos Section */}
        <Row>
          {filteredVideos.length === 0 ? (
            <Col>
              <Card className="text-center py-5">
                <Card.Body>
                  <i className="fas fa-search fa-3x text-muted mb-3"></i>
                  <h4>No courses found</h4>
                  <p className="text-muted">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'No courses available at the moment.'
                    }
                  </p>
                  {userRole === 'instructor' && (
                    <Button 
                      variant="primary" 
                      onClick={() => navigate('/upload')}
                    >
                      Upload Your First Course
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ) : (
            filteredVideos.map(video => (
              <Col 
                key={video._id} 
                lg={viewMode === 'grid' ? 4 : 12} 
                md={viewMode === 'grid' ? 6 : 12}
                className="mb-4"
              >
                <VideoCard 
                  video={video} 
                  viewMode={viewMode}
                />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;