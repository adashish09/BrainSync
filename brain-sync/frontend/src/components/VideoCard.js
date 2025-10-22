import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useVideo } from '../context/VideoContext';
import './VideoCard.css';

function VideoCard({ video }) {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const { deleteVideo } = useVideo();

  const handleVideoClick = () => {
    navigate(`/video/${video._id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await deleteVideo(video._id);
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  return (
    <Card className="video-card" onClick={handleVideoClick}>
      <div className="video-thumbnail">
        <iframe
          src={video.videoUrl}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
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
        {userRole === 'instructor' && (
          <Button 
            variant="danger" 
            size="sm" 
            onClick={handleDelete}
            className="delete-btn"
          >
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default VideoCard;