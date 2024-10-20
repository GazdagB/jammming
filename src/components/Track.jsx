import React, { useEffect } from 'react'
import styles from "../styles/Track.module.css"

const Track = ({id,trackTitle, artistName, albumName, onClickHandler,selected, imgSrc}) => {
    
    useEffect(()=>{
        console.log(id);
        
    },[])
    
    

  return (
    <div className={styles.track}>
        <img className={styles.img} src={imgSrc} alt="" />
        <div>
            <p className={styles.trackName}>{trackTitle}</p>
            <div className={styles.infoContainer}>
                <p>{artistName} | Album: {albumName}</p>
            </div>
            <p onClick={()=>{
                onClickHandler(id)
            }} className={styles.addBtn}>{!selected ? "+" : "-"}</p>
            <div className={styles.divider}></div>
        </div>
    </div>
  )
}

export default Track