import React, {useState, useEffect} from 'react'
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TrackContainer from '../components/TrackContainer';
import ResultTrack from '../components/ResultTrack';
import Track from '../components/Track';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import spinner from "../assets/spinner-solid.svg"



const mockedTracks = [
    {
      id: 0,
      trackTitle: "Fistik",
      artistName: "Murda",
      albumName: "Fistik",
      uri: "https://mockeduri.com"
    },
    {
      id: 1,
      trackTitle: "Isztambul",
      artistName: "Kiss Kevin",
      albumName: "Isztambul",
      uri: "https://mockeduri.com"
    },
    {
      id: 2,
      trackTitle: "MEGGYFÁN",
      artistName: "Beton.Hofi",
      albumName: "0",
      uri: "https://mockeduri.com"
    },
    {
      id: 3,
      trackTitle: "Mámor",
      artistName: "Pogány Indulo",
      albumName: "Vagy mindent, vagy semmit",
      uri: "https://mockeduri.com"
    },
    {
      id: 4,
      trackTitle: "Cartier",
      artistName: "KKevin & T. Danny",
      albumName: "Nincs holnap",
      uri: "https://mockeduri.com"
    },
    {
      id: 4,
      trackTitle: "Cartier",
      artistName: "KKevin & T. Danny",
      albumName: "Nincs holnap",
      uri: "https://mockeduri.com"
    },
    {
      id: 4,
      trackTitle: "Cartier",
      artistName: "KKevin & T. Danny",
      albumName: "Nincs holnap",
      uri: "https://mockeduri.com"
    },
    {
      id: 4,
      trackTitle: "Cartier",
      artistName: "KKevin & T. Danny",
      albumName: "Nincs holnap",
      uri: "https://mockeduri.com"
    },
  ]


const Home = ({search, setSearch, onSubmit, tracks, setTracks, submitPlaylist, playListName, setPlayListName,selectedTracks,setSelectedTracks,isLoading}) => {

    
    
  
    function handleAddTrack(track) {
      if (selectedTracks.find(currTrack => currTrack.id === track.id)) {
        return;
      }
    
      setSelectedTracks(prev => [track,...prev]);
      console.log(track);
      
    }
  
    function handleRemoveTrack(id) {
      setSelectedTracks(prev => prev.filter(track => track.id !== id));
    }

  
  
    const buttonStyles = {
      backgroundColor: "#f230ac",
      color: "#fff",
      border: "none",
      padding: "15px 20px",
      borderRadius: "10px",
      fontWeight: "bold",
      marginTop: 10,
      cursor: "pointer"
    }
  
    const playListInputStyles = {
        padding: 10,
        border: "1px solid grey",
        marginBottom: "20px",
        width: "100%",
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 22,
        textAlign: "center"
      }


      const navigate = useNavigate(); 

     useEffect(() => {
        if (!window.localStorage.getItem("token")) {
          navigate('/login');
        } else{
          navigate('/')
        }
      }, [navigate]);

      


  return (
    <div className='App'>
    <main>
      <SearchBar onSubmit={onSubmit} search={search} setSearch={setSearch} />
      <p>Add your favorite music to your spotify playlist below.</p>
      <div style={{ display: "flex", alignItems: "start", gap: 30, marginTop: 30 }}>
        {/* Results Container */}
        <TrackContainer width={600} title={"Results"}>
          {(tracks.length === 0 && isLoading ) && (<img src={spinner} className='loader'/>) }
          
          {(!isLoading && tracks.length === 0) && (<p className='suggestion-text'>Tracks will appear hear if you search.</p>) }

          {tracks.map((track, id) => (
            <ResultTrack
              selected={selectedTracks.some(selectedTrack => selectedTrack.id === track.id)}
              imgSrc={track.album.images[0].url}  // Pass if selected or not
              key={id}
              onClickHandler={handleAddTrack}
              track={track}
              trackTitle={track.name}
              artistName={track.artists[0].name}
              albumName={track.album.name}
            />
          ))}
        </TrackContainer>

        {/* Playlist Container */}
        <TrackContainer width={350} title={"My playlist"}>

        {selectedTracks.length > 0 && (
          <>
          <label htmlFor="playListName">Name your playlist:</label>
          <input placeholder='Best Playlist' id='playListName' value={playListName} onChange={(e)=>{setPlayListName(e.target.value)}} style={playListInputStyles} type="text" />
          </>
        )}

      
          {selectedTracks.map((track, id) => (
            <Track
              selected={true}  // Always show the minus for playlist
              key={id}
              imgSrc={track.album.images[0].url}
              onClickHandler={handleRemoveTrack}
              id={track.id}
              trackTitle={track.name}
              artistName={track.artists[0].name}
              albumName={track.album.name}
            />
          ))}

          {selectedTracks.length > 0 &&
          (
          <button onClick={submitPlaylist} style={buttonStyles}>
            Save to Spotify
          </button>
          )
          }

          {selectedTracks.length === 0 && 
          (<p className='suggestion-text'>Add songs to your tracklist!</p>)
          }
          
        </TrackContainer>
      </div>
    </main>
  </div>
  )
}

export default Home