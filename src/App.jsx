import './App.css';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import TrackContainer from './components/TrackContainer';
import Track from './components/Track';
import ResultTrack from './components/ResultTrack';
import { useState } from 'react';


function App() {

  const mockedTracks = [
    {
      id: 0,
      trackTitle: "Fistik",
      artistName: "Murda",
      albumName: "Fistik"
    },
    {
      id: 1,
      trackTitle: "Isztambul",
      artistName: "Kiss Kevin",
      albumName: "Isztambul"
    },
    {
      id: 2,
      trackTitle: "MEGGYFÁN",
      artistName: "Beton.Hofi",
      albumName: "0"
    },
    {
      id: 3,
      trackTitle: "Mámor",
      artistName: "Pogány Indulo",
      albumName: "Vagy mindent, vagy semmit"
    },
    {
      id: 4,
      trackTitle: "Cartier",
      artistName: "KKevin & T. Danny",
      albumName: "Nincs holnap"
    },
    {
      id: 4,
      trackTitle: "Cartier",
      artistName: "KKevin & T. Danny",
      albumName: "Nincs holnap"
    },
    {
      id: 4,
      trackTitle: "Cartier",
      artistName: "KKevin & T. Danny",
      albumName: "Nincs holnap"
    },
    {
      id: 4,
      trackTitle: "Cartier",
      artistName: "KKevin & T. Danny",
      albumName: "Nincs holnap"
    },
  ]

  const [selectedTracks,setSelectedTracks] = useState([])

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

  return (
    <div className='App'>
    <Header />
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
          <input style={{marginBottom: 20}} type="text" />
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

export default App
