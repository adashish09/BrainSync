import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-custom">
      <Container>
        <Row className="footer-content">
          <Col lg={4} md={6} className="mb-4">
            <div className="footer-brand">
              <h5 className="footer-title">
                <i className="fas fa-brain me-2"></i>
                BrainSync
              </h5>
              <p className="footer-description">
                Your structured video learning platform. Learn anything, anywhere, at your own pace.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <h6 className="footer-heading">Platform</h6>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/upload">Upload</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <h6 className="footer-heading">Account</h6>
            <ul className="footer-links">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/profile">Settings</Link></li>
              <li><a href="#help">Help Center</a></li>
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <h6 className="footer-heading">Resources</h6>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <h6 className="footer-heading">Categories</h6>
            <ul className="footer-links">
              <li><a href="#programming">Programming</a></li>
              <li><a href="#design">Design</a></li>
              <li><a href="#business">Business</a></li>
              <li><a href="#marketing">Marketing</a></li>
            </ul>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <Row className="footer-bottom">
          <Col md={6}>
            <p className="footer-copyright">
              &copy; 2024 BrainSync. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="footer-version">
              Version 1.0.0 | Made with <i className="fas fa-heart text-danger"></i>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;