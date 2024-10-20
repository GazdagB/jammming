import React, { useEffect } from 'react'
import styles from "../styles/Track.module.css"

const ResultTrack = ({track,trackTitle, artistName, albumName, onClickHandler,selected,imgSrc}) => {
    
    useEffect(()=>{
        console.log(track.id);
    },[])
    
    

  return (
    <div className={styles.track}>
        <img className={styles.img} src={imgSrc} alt="" />
        <div style={{width: "100%"}}>
            <p className={styles.trackName}>{trackTitle}</p>
            <div className={styles.infoContainer}>
                <p>{artistName} | Album: {albumName}</p>
            </div>
            <p onClick={()=>{
                onClickHandler(track)
            }} className={styles.addBtn}>{!selected ? "+" : ""}</p>
            <div className={styles.divider}></div>
        </div>
    </div>
  )
}

export default ResultTrack;