import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useVideo } from '../context/VideoContext';
import { useAuth } from '../context/AuthContext';
import VideoCard from '../components/VideoCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { debounce } from 'lodash';
import './Home.css';

function Home() {
  const { videos, loading, error } = useVideo();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

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

  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading videos..." />;
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Videos</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6}>
              <h1 className="hero-title">
                Learn Anything with <span className="text-primary">BrainSync</span>
              </h1>
              <p className="hero-subtitle">
                Discover thousands of video courses from expert instructors. 
                Learn at your own pace and advance your skills.
              </p>
              <div className="hero-buttons">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="me-3"
                >
                  {currentUser ? 'Go to Dashboard' : 'Get Started'}
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Browse Courses
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image">
                <div className="hero-placeholder">
                  <i className="fas fa-play-circle"></i>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search and Filter Section */}
      <section className="search-section py-4 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <Button variant="primary" id="search-button">
                  <i className="fas fa-search"></i>
                </Button>
              </InputGroup>
              
              <div className="filter-controls">
                <div className="filter-group">
                  <Form.Label className="filter-label">Category:</Form.Label>
                  <Form.Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                
                <div className="filter-group">
                  <Form.Label className="filter-label">Sort by:</Form.Label>
                  <Form.Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">Title A-Z</option>
                    <option value="instructor">Instructor A-Z</option>
                  </Form.Select>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Videos Section */}
      <section className="videos-section py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="section-title">
                Featured Courses
                <Badge bg="primary" className="ms-2">
                  {filteredVideos.length}
                </Badge>
              </h2>
            </Col>
          </Row>
          
          {filteredVideos.length === 0 ? (
            <Row>
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
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <Row>
              {filteredVideos.map(video => (
                <Col key={video._id} lg={4} md={6} className="mb-4">
                  <VideoCard video={video} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </div>
  );
}

export default Home;