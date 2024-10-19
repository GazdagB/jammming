import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jammingLogo from '../assets/jamming_logo.svg'

const Header = ({isLoggedIn,setIsLoggedIn}) => {

  const navigate = useNavigate();

  const containerStyle = {
    width: "100vw",
    padding: "25px 20px",
    boxShadow: "0px 6px 8px -2px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  }

  const titleStyle = {
    flex: 1,
     // Makes the title occupy the center space between elements
    textAlign: "center",
   
  }

  const logoutStyle = {
    position: "absolute",
    marginRight: 50, // Pushes 'Log out' to the right
    cursor: "pointer",
       // Optional for clickable effect
    right: 30,
    fontWeight: "bold"
  }

  const logoStyle = {
    height: 50,
  }

  function logOutHandler(){
    window.localStorage.removeItem("token")
    setIsLoggedIn(false)
    navigate('/login');
  }

  return (
    <div style={containerStyle}>
      <div style={{display: "flex", alignItems: "center", gap: 15}} className="logo-container">
        <img style={logoStyle} src={jammingLogo} alt="" />
        <h1 style={titleStyle}>JA<span style={{color: "#f230ac"}}>MMM</span>ING</h1>
      </div>
       {isLoggedIn && <p onClick={logOutHandler} style={logoutStyle}>Log out</p>}
    </div>
  )
}

export default Header;