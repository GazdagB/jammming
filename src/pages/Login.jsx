import React from 'react'

const Login = ({auth}) => {

  const {
    CLIENT_ID,
    REDIRECT_URI,
    AUTH_ENDPOINT,
    RESPONSE_TYPE
  } = auth;


  return (
    <div>
        <h2>Login Into Spotify</h2>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
            <button>Spotify Login</button>
        </a>
    </div>
  )
}

export default Login