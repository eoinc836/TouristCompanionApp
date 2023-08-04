import React, { useState, useEffect } from 'react';
import './StartUpGuide.scss';

const StartUpGuide = () => {
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
        //Checking if the user has seen the guide before using local storage 
    const hasSeenGuide = localStorage.getItem('hasSeenGuide');
    if (!hasSeenGuide) {
      setShowGuide(true);
      //Setting the flag in local storage to indicate that the user has seen the guide
      localStorage.setItem('hasSeenGuide', 'true');
    }
  }, []);

  const handleDismiss = () => {
    setShowGuide(false);
  };

  if (!showGuide) {
    return null;
  }

  return (
    <div className="guide-container">
      <h2>Welcome to BusyBuddy!</h2>
      <p>
        This is a quick startup guide to help you get familiar with the features
        and navigation of our app.
      </p>
      <div className="guide-step">
        <h3>Step 1: Explore the Dashboard</h3>
        <p>
          You can find links to each page on the dashboard. Take some time
          to explore the various widgets and charts.
        </p>
      </div>
      <div className="guide-step">
        <h3>Step 2: Find Inspiration</h3>
        <p>
          Have a read of our Top Attractions page and get some inspiration on where to visit in New York.
        </p>
      </div>
      <div className="guide-step">
        <h3>Step 3: Manage Your Profile</h3>
        <p>
          Click on the profile icon to access your profile settings. You can
          update your information and manage your account
          settings here.
        </p>
      </div>
      <button className="dismiss-button" onClick={handleDismiss}>
        Got it!
      </button>
    </div>
  );
};

export default StartUpGuide;
