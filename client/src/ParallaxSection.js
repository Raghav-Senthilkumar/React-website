import React, { useState, useEffect } from 'react';
import './ParallaxSection.css'; // You'll create this CSS file for styling
import backgroundImage from './rectangle.png';

function ParallaxSection() {
    const [scrollY, setScrollY] = useState(0);
    const [showUploadButton, setShowUploadButton] = useState(false);
  
    // Update scrollY on scroll
    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
  
      // Check scroll position to show/hide the upload button
      if (scrollY > 500) {
        setShowUploadButton(true);
      } else {
        setShowUploadButton(false);
      }
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [scrollY]);
  
    // Calculate the scale based on the scroll position
    const scale = 1 + scrollY * 0.001;
  
    return (
      <div className="parallax-section">
        <div className="content">
          <h1>Welcome to My Parallax Website</h1>
          <p>Scroll down to see the parallax effect</p>
        </div>
        <div
          className="parallax-background"
          style={{
            transform: `scale(${scale})`,
            backgroundImage: `url(${backgroundImage})`,
          }}
        ></div>
        
        
      </div>
    );
  }
  
  export default ParallaxSection;