import React from 'react'

const TrackContainer = ({children,title}) => {

    const containerStyles = {
        minHeight: 500,
        width: 500,
        boxShadow: "-1px 6px 12px -3px rgba(0,0,0,0.32)",
        borderRadius: 10,
        textAlign: "center",
        backgroundColor: "#fff",
        padding: "20px 50px"
    }

    const titleStyles = {
      margin: "30px 0"
    }

  return (
    <div style={containerStyles} className='Results'>
    <h2 style={titleStyles}>{title}</h2>
    <div>{children}</div>
    </div>
  )
}

export default TrackContainer;