import React from 'react'

const Login = ({auth}) => {

  const {
    CLIENT_ID,
    REDIRECT_URI,
    AUTH_ENDPOINT,
    RESPONSE_TYPE
  } = auth;

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30vh"
  }

  const headingStyles = {
    marginBottom: 20
  }

  const buttonStyles = {
    padding: "20px 30px",
    borderRadius: 10, 
    backgroundColor: "#b7e842",
    fontWeight: "bold",
    cursor: "pointer"
  }

  return (
    <div style={containerStyles}>
        <h2 style={headingStyles}>You have to login Spotify first! 😊</h2>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
            <button className='btn' style={buttonStyles}>Login Spotify</button>
        </a>
    </div>
  )
}

export default Login