import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jammingLogo from '../assets/jamming_logo.svg';
import placeHolderUser from "../assets/placeholder_user.png"

const Header = ({ loggOut, isLoggedIn, userData }) => {
  const navigate = useNavigate();

  const containerStyle = {
    width: '100vw',
    padding: '25px 20px',
    boxShadow: '0px 6px 8px -2px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  const titleStyle = {
    flex: 1,
    // Makes the title occupy the center space between elements
    textAlign: 'center',
  };

  const logoutStyle = {
    // Pushes 'Log out' to the right
    cursor: 'pointer',
    // Optional for clickable effect
    fontWeight: 'bold',
  };

  const logoutContainerStyle = {
    position: 'absolute',
    marginRight: 50,
    right: 30,
    display: 'flex',
    gap: 35,
    alignItems: "center"
  };

  const logoStyle = {
    height: 50,
  };

  function logOutHandler() {
    loggOut();
    navigate('/login');
  }

  return (
    <div style={containerStyle}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 15 }}
        className="logo-container"
      >
        <img style={logoStyle} src={jammingLogo} alt="" />
        <h1 style={titleStyle}>
          JA<span style={{ color: '#f230ac' }}>MMM</span>ING
        </h1>
      </div>
      {isLoggedIn && (
    <div style={logoutContainerStyle}>
    {userData.images && userData.images.length > 0 ? (
      <img style={{ width: 60, border: "2px solid #f230ac", borderRadius: 30 }} src={userData.images[0].url} alt="User" />
    ) : (
      <img style={{ width: 60, border: "2px solid #f230ac", borderRadius: 30 }} src={placeHolderUser} alt="Placeholder User" />
    )}
    <p>{userData.display_name}</p>
    <p style={logoutStyle} onClick={logOutHandler}>
      Log out
    </p>
  </div>
)}
    </div>
  );
};

export default Header;
