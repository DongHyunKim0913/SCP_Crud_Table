import React from "react";
import "./CoverPage.css"; // Make sure to add your CSS file

const CoverPage = () => {
  return (
    <div className="cover-container">
      <div className="overlay">
        <h1 className="title">SCP Foundation</h1>
        <p className="subtitle">Secure. Contain. Protect.</p>
        <p className="description">
          Welcome to the SCP Foundation, a secretive organization dedicated to
          securing, containing, and protecting anomalous objects, creatures, and
          phenomena. Explore the classified world of the SCP universe.
        </p>
       
      </div>
    </div>
  );
};

export default CoverPage;
