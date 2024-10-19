import React, {useState, useEffect} from 'react'
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TrackContainer from '../components/TrackContainer';
import ResultTrack from '../components/ResultTrack';
import Track from '../components/Track';
import { useNavigate } from 'react-router-dom';



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


const Home = () => {

    const [selectedTracks,setSelectedTracks] = useState([]);
    const [playListName,setPlayListName] = useState(""); 
  
    function handleAddTrack(id) {
      if (selectedTracks.find(track => track.id === id)) {
        return;
      }
    
      setSelectedTracks(prev => [...prev, mockedTracks[id]]);
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
      <SearchBar />
      <p>Add your favorite music to your spotify playlist below.</p>
      <div style={{ display: "flex", alignItems: "start", gap: 30, marginTop: 30 }}>
        {/* Results Container */}
        <TrackContainer width={400} title={"Results"}>
          {mockedTracks.map((track, id) => (
            <ResultTrack
              selected={selectedTracks.some(selectedTrack => selectedTrack.id === track.id)}  // Pass if selected or not
              key={id}
              onClickHandler={handleAddTrack}
              id={track.id}
              trackTitle={track.trackTitle}
              artistName={track.artistName}
              albumName={track.albumName}
            />
          ))}
        </TrackContainer>

        {/* Playlist Container */}
        <TrackContainer width={350} title={"My playlist"}>

        {selectedTracks.length > 0 && (
          <>
          <label htmlFor="playListName">Name your playlist:</label>
          <input id='playListName' value={playListName} onChange={(e)=>{setPlayListName(e.target.value)}} style={playListInputStyles} type="text" />
          </>
        )}

          {selectedTracks.map((track, id) => (
            <Track
              selected={true}  // Always show the minus for playlist
              key={id}
              onClickHandler={handleRemoveTrack}
              id={track.id}
              trackTitle={track.trackTitle}
              artistName={track.artistName}
              albumName={track.albumName}
            />
          ))}

          {selectedTracks.length > 0 &&
          (
          <button style={buttonStyles}>
            Save to Spotify
          </button>
          )
          }
          
        </TrackContainer>
      </div>
    </main>
  </div>
  )
}

export default Home