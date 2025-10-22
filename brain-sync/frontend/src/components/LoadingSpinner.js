import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingSpinner.css';

function LoadingSpinner({ size = 'lg', text = 'Loading...' }) {
  return (
    <div className="loading-spinner-container">
      <Spinner animation="border" size={size} role="status">
        <span className="visually-hidden">{text}</span>
      </Spinner>
      <p className="loading-text">{text}</p>
    </div>
  );
}

export default LoadingSpinner;