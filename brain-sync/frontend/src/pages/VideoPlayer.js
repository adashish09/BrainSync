import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { useVideo } from '../context/VideoContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './VideoPlayer.css';

function VideoPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getVideoById, deleteVideo } = useVideo();
  const { userRole, currentUser } = useAuth();
  
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);
        const videoData = await getVideoById(id);
        if (videoData) {
          setVideo(videoData);
        } else {
          setError('Video not found');
        }
      } catch (err) {
        setError('Failed to load video');
        console.error('Error fetching video:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVideo();
    }
  }, [id, getVideoById]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      if (!isFullscreen) {
        if (playerRef.current.requestFullscreen) {
          playerRef.current.requestFullscreen();
        } else if (playerRef.current.webkitRequestFullscreen) {
          playerRef.current.webkitRequestFullscreen();
        } else if (playerRef.current.msRequestFullscreen) {
          playerRef.current.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await deleteVideo(id);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const isOwner = userRole === 'instructor' && video?.instructorId === currentUser?.uid;

  if (loading) {
    return <LoadingSpinner text="Loading video..." />;
  }

  if (error || !video) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Video</Alert.Heading>
          <p>{error || 'Video not found'}</p>
          <Button variant="outline-danger" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="video-player-page">
      <Container fluid>
        <Row>
          <Col lg={8}>
            <Card className="video-player-card">
              <div className="video-container" ref={playerRef}>
                <video
                  ref={videoRef}
                  className="video-element"
                  src={video.videoUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
                
                {/* Custom Controls */}
                <div className="video-controls">
                  <div className="progress-container" onClick={handleSeek}>
                    <div 
                      className="progress-bar"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="controls-row">
                    <div className="controls-left">
                      <Button
                        variant="link"
                        className="control-btn"
                        onClick={handlePlayPause}
                      >
                        <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                      </Button>
                      
                      <span className="time-display">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                    
                    <div className="controls-right">
                      <div className="volume-control">
                        <i className="fas fa-volume-up"></i>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="volume-slider"
                        />
                      </div>
                      
                      <Button
                        variant="link"
                        className="control-btn"
                        onClick={handleFullscreen}
                      >
                        <i className="fas fa-expand"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          
          <Col lg={4}>
            <div className="video-info">
              <Card className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h2 className="video-title">{video.title}</h2>
                    {isOwner && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={handleDelete}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    )}
                  </div>
                  
                  <div className="video-meta mb-3">
                    <Badge bg="primary" className="me-2">{video.category}</Badge>
                    <span className="text-muted">By {video.instructor}</span>
                  </div>
                  
                  <p className="video-description">{video.description}</p>
                  
                  <div className="video-stats">
                    <small className="text-muted">
                      <i className="fas fa-calendar me-1"></i>
                      {new Date(video.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </Card.Body>
              </Card>
              
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Course Information</h5>
                </Card.Header>
                <Card.Body>
                  <div className="info-item">
                    <strong>Instructor:</strong> {video.instructor}
                  </div>
                  <div className="info-item">
                    <strong>Category:</strong> {video.category}
                  </div>
                  <div className="info-item">
                    <strong>Duration:</strong> {formatTime(duration)}
                  </div>
                  <div className="info-item">
                    <strong>Uploaded:</strong> {new Date(video.createdAt).toLocaleDateString()}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default VideoPlayer;