import React, { useState } from 'react';
import './learn.css';

const Learn = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Simplified video content
  const videos = [
    {
      id: 1,
      title: "Getting Started with Meesho Reselling",
      category: "Beginner",
      thumbnail: "https://imgs.search.brave.com/6YIqbaG7-Yir4MzyDfEZni9b3x7OvDGYRvnsaCc31Ok/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly9pLnl0/aW1nLmNvbS92aS9K/Uks3UmpPQjNCay9t/YXhyZXNkZWZhdWx0/LmpwZw",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
      description: "Learn the basics of setting up your reselling business on Meesho."
    },
    {
      id: 2,
      title: "Product Selection Strategy",
      category: "Beginner",
      thumbnail: "https://imgs.search.brave.com/tOEnDXNS6VCprQd8AhmtwujBHzAYFt_RHE1eZ0iS7s0/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly9pLnl0/aW1nLmNvbS92aS9l/YndvX0JYX1Z0VS9t/YXhyZXNkZWZhdWx0/LmpwZw",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
      description: "How to choose the right products for your target audience."
    },
    {
      id: 3,
      title: "Meesho Affiliate Marketing",
      category: "Intermediate",
      thumbnail: "https://imgs.search.brave.com/FQ67Gxq3XedM5GvE5XDSq-OJW7oA5J0FfJIIXh5zLpg/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly9pLnl0/aW1nLmNvbS92aS9B/MERKQ080bVR3Yy9t/YXhyZXNkZWZhdWx0/LmpwZw",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
      description: "Effective marketing strategies for Meesho resellers."
    },
    {
      id: 4,
      title: "Advanced Sales Techniques",
      category: "Advanced",
      thumbnail: "https://imgs.search.brave.com/kgFuQO9bBZYPBnby-NqD1TYo2ngiqy1RBcoTJ1lxWhY/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly9pLnl0/aW1nLmNvbS92aS9S/NDM4dXNNajV6dy9t/YXhyZXNkZWZhdWx0/LmpwZw",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_4",
      description: "Master advanced selling techniques to boost your sales."
    }
  ];

  return (
    <div className="learn-container">
      <div className="sidebar">
        <div className="logo">
          <img
            src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
            alt="Logo"
          />
        </div>
        <nav className="sidebar-menu">
          <a href="/dashboardhome">Home</a>
          <a href="/order">Orders</a>
          <a href="/return">Returns</a>
          <a href="/inventory">Inventory</a>
          <a href="/payment">Payments</a>
          <a href="/ai">AI Assistant</a>
          <a href="/learn" className="menu-item">Learn</a>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <a href="/myprofile" className="menu-item">MyProfile</a>
          <a href="#" className="menu-item">Support</a>
        </nav>
      </div>

      <div className="main-content">
        <div className="content-header">
          <h1>Meesho Learning Center</h1>
          <p>Watch tutorials to grow your reselling business</p>
        </div>

        <div className="videos-container">
          <div className="video-player">
            {selectedVideo ? (
              <>
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="video-info">
                  <h2>{selectedVideo.title}</h2>
                  <span className="category">{selectedVideo.category}</span>
                  <p>{selectedVideo.description}</p>
                </div>
              </>
            ) : (
              <div className="welcome-message">
                <h2>Welcome to Meesho Learning Center</h2>
                <p>Select a video from the playlist to start learning</p>
              </div>
            )}
          </div>

          <div className="playlist">
            <h3>Available Videos</h3>
            <div className="video-list">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className={`video-item ${selectedVideo?.id === video.id ? 'active' : ''}`}
                  onClick={() => setSelectedVideo(video)}
                >
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-details">
                    <h4>{video.title}</h4>
                    <span className="category">{video.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
