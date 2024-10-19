import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({isLoggedIn,setIsLoggedIn}) => {

  const navigate = useNavigate();

  const containerStyle = {
    width: "100vw",
    padding: "25px 20px",
    boxShadow: "0px 6px 8px -2px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
  }

  const titleStyle = {
    flex: 1,  // Makes the title occupy the center space between elements
    textAlign: "center",
    marginLeft: 50,
  }

  const logoutStyle = {
    marginRight: 50, // Pushes 'Log out' to the right
    cursor: "pointer",   // Optional for clickable effect
  }

  function logOutHandler(){
    window.localStorage.removeItem("token")
    setIsLoggedIn(false)
    navigate('/login');
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>JA<span style={{color: "#f230ac"}}>MMM</span>ING</h1>
       {isLoggedIn && <p onClick={logOutHandler} style={logoutStyle}>Log out</p>}
    </div>
  )
}

export default Header;