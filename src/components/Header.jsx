import React from 'react'

const Header = () => {

    const containerStyle = {
        width: "100vw", 
        textAlign: "center",
        padding: "25px 20px"
    }

  return (
    <div style={containerStyle}>
        <h1>JA<span style={{color: "#f230ac"}}>MMM</span>ING</h1>
    </div>
  )
}

export default Header