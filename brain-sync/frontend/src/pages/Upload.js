import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, ProgressBar, Spinner } from 'react-bootstrap';
import { useVideo } from '../context/VideoContext';
import { useAuth } from '../context/AuthContext';
import './Upload.css';

function Upload() {
  const { addVideo } = useVideo();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    instructor: '',
    videoUrl: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef(null);
  const dropRef = useRef(null);

  const categories = [
    'Programming',
    'Design',
    'Business',
    'Marketing',
    'Photography',
    'Music',
    'Language',
    'Health',
    'Fitness',
    'Cooking',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith('video/')) {
      // In a real application, you would upload the file to a cloud service
      // For now, we'll just use a placeholder URL
      const videoUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        videoUrl: videoUrl
      }));
      setSuccess('Video file selected successfully!');
    } else {
      setError('Please select a valid video file.');
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.videoUrl) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const videoData = {
        ...formData,
        instructor: currentUser?.email?.split('@')[0] || 'Unknown',
        instructorId: currentUser?.uid || 'unknown'
      };

      await addVideo(videoData);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setSuccess('Video uploaded successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        instructor: '',
        videoUrl: ''
      });
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (err) {
      setError('Failed to upload video. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      instructor: '',
      videoUrl: ''
    });
    setError('');
    setSuccess('');
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="upload-page">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="upload-card">
              <Card.Header className="upload-header">
                <h2 className="upload-title">
                  <i className="fas fa-upload me-2"></i>
                  Upload New Course
                </h2>
                <p className="upload-subtitle">
                  Share your knowledge with the world
                </p>
              </Card.Header>
              
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {/* File Upload Section */}
                  <div className="upload-section mb-4">
                    <Form.Label className="upload-label">Video File *</Form.Label>
                    <div
                      ref={dropRef}
                      className={`file-drop-zone ${dragActive ? 'drag-active' : ''} ${formData.videoUrl ? 'has-file' : ''}`}
                      onDragEnter={handleDragIn}
                      onDragLeave={handleDragOut}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleFileInput}
                        className="file-input"
                        hidden
                      />
                      
                      {formData.videoUrl ? (
                        <div className="file-selected">
                          <i className="fas fa-video fa-3x text-success mb-3"></i>
                          <p className="file-name">Video file selected</p>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData(prev => ({ ...prev, videoUrl: '' }));
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="file-placeholder">
                          <i className="fas fa-cloud-upload-alt fa-3x text-muted mb-3"></i>
                          <p className="upload-text">
                            Drag and drop your video file here, or click to browse
                          </p>
                          <p className="upload-hint">
                            Supported formats: MP4, AVI, MOV, WMV
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Progress */}
                  {loading && (
                    <div className="upload-progress mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <ProgressBar 
                        now={uploadProgress} 
                        variant="primary" 
                        animated 
                      />
                    </div>
                  )}

                  {/* Form Fields */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Course Title *</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Enter course title"
                          required
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Category *</Form.Label>
                        <Form.Select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select a category</option>
                          {categories.map(category => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Description *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe what students will learn in this course"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Instructor Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleInputChange}
                      placeholder="Your name as instructor"
                    />
                    <Form.Text className="text-muted">
                      Leave empty to use your email username
                    </Form.Text>
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

                  {/* Action Buttons */}
                  <div className="upload-actions">
                    <Button
                      variant="outline-secondary"
                      onClick={handleReset}
                      disabled={loading}
                      className="me-2"
                    >
                      Reset
                    </Button>
                    
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={loading || !formData.videoUrl}
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-upload me-2"></i>
                          Upload Course
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Upload;