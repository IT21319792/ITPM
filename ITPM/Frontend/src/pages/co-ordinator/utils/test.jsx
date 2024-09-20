import React, { useEffect } from 'react';
import VANTA from 'vanta/dist/vanta.dots.min'; // Import VANTA library

const MyComponent = () => {
  useEffect(() => {
    const setVanta = () => {
      if (window.VANTA) {
        window.VANTA.DOTS({
          el: ".s-page-1 .s-section-1 .s-section",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          size: 5.20,
          spacing: 36.00,
          showLines: false
        });
      }
    };

    setVanta();

    return () => {
      // Clean up VANTA effect when component unmounts
      if (window.VANTA) {
        window.VANTA.DOTS.destroy();
      }
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="s-page-1 s-section-1 s-section">
      {/* Content of your component */}
    </div>
  );
};

export default MyComponent;
