import React, { memo, useCallback, useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useVideo } from '../context/VideoContext';
import './VideoCard.css';

const VideoCard = memo(({ video, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const { userRole, currentUser } = useAuth();
  const { deleteVideo } = useVideo();
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleVideoClick = useCallback(() => {
    navigate(`/video/${video._id}`);
  }, [navigate, video._id]);

  const handleDelete = useCallback(async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        setIsDeleting(true);
        await deleteVideo(video._id);
      } catch (error) {
        console.error('Error deleting video:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  }, [deleteVideo, video._id]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const isOwner = userRole === 'instructor' && video.instructorId === currentUser?.uid;

  // Generate thumbnail URL from video URL (simplified - in real app, use proper video thumbnail service)
  const getThumbnailUrl = (videoUrl) => {
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const videoId = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg`;
      }
    }
    return null;
  };

  const thumbnailUrl = getThumbnailUrl(video.videoUrl);

  if (viewMode === 'list') {
    return (
      <Card className="video-card video-card-list" onClick={handleVideoClick}>
        <div className="video-thumbnail-list">
          {thumbnailUrl ? (
            <div className="thumbnail-container">
              {!imageLoaded && (
                <div className="thumbnail-placeholder">
                  <i className="fas fa-video"></i>
                </div>
              )}
              <img
                src={thumbnailUrl}
                alt={video.title}
                onLoad={handleImageLoad}
                style={{ display: imageLoaded ? 'block' : 'none' }}
                className="thumbnail-image"
              />
              <div className="play-overlay">
                <i className="fas fa-play"></i>
              </div>
            </div>
          ) : (
            <div className="thumbnail-placeholder">
              <i className="fas fa-video"></i>
            </div>
          )}
        </div>
        <Card.Body className="video-content-list">
          <div className="video-header">
            <Card.Title className="video-title">{video.title}</Card.Title>
            {isOwner && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="delete-btn"
              >
                {isDeleting ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <i className="fas fa-trash"></i>
                )}
              </Button>
            )}
          </div>
          <Card.Text className="video-description">
            {video.description}
          </Card.Text>
          <div className="video-meta">
            <span className="category-badge">{video.category}</span>
            <span className="instructor">By {video.instructor}</span>
            <span className="date">
              {new Date(video.createdAt).toLocaleDateString()}
            </span>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="video-card" onClick={handleVideoClick}>
      <div className="video-thumbnail">
        {thumbnailUrl ? (
          <div className="thumbnail-container">
            {!imageLoaded && (
              <div className="thumbnail-placeholder">
                <i className="fas fa-video"></i>
              </div>
            )}
            <img
              src={thumbnailUrl}
              alt={video.title}
              onLoad={handleImageLoad}
              style={{ display: imageLoaded ? 'block' : 'none' }}
              className="thumbnail-image"
            />
            <div className="play-overlay">
              <i className="fas fa-play"></i>
            </div>
          </div>
        ) : (
          <div className="thumbnail-placeholder">
            <i className="fas fa-video"></i>
          </div>
        )}
      </div>
      <Card.Body>
        <Card.Title className="video-title">{video.title}</Card.Title>
        <Card.Text className="video-description">
          {video.description.length > 100 
            ? `${video.description.substring(0, 100)}...` 
            : video.description
          }
        </Card.Text>
        <div className="video-meta">
          <span className="category-badge">{video.category}</span>
          <span className="instructor">By {video.instructor}</span>
        </div>
        {isOwner && (
          <Button 
            variant="danger" 
            size="sm" 
            onClick={handleDelete}
            disabled={isDeleting}
            className="delete-btn"
          >
            {isDeleting ? (
              <Spinner animation="border" size="sm" />
            ) : (
              'Delete'
            )}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
});

VideoCard.displayName = 'VideoCard';

export default VideoCard;