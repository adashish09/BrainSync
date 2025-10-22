import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-custom">
      <Container>
        <Row>
          <Col md={6}>
            <h5>BrainSync</h5>
            <p>Your structured video learning platform</p>
          </Col>
          <Col md={6}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 BrainSync. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;