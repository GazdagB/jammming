import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import axios from 'axios';

function App() {
  const CLIENT_ID = "56796ac4362e40ccae0bf92d56ea9b1e";
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "playlist-modify-public playlist-modify-private";

  const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);  // New loading state
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [search, setSearch] = useState("")
  const [tracks,setTracks] = useState([])
  const [playListName,setPlayListName] = useState(""); 
  const [selectedTracks,setSelectedTracks] = useState([]);

  const handleSearch = async (search)=>{

    const {data} = await axios.get("https://api.spotify.com/v1/search",{
      headers: {
        Authorization: `Bearer ${token}`
        },
        params: {
          q: search,
          type: 'track'
      }
    })
    console.log(data.tracks.items);
    setTracks(data.tracks.items)
  }

  async function submitPlaylist() {

    let trackListId; 

    try {
      // Step 1: Get the user's Spotify ID
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the access token here
        },
      });
      
      console.log(data);
      
      const userId = data.id;
  
      // Step 2: Create the playlist
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          name: playListName,
          description: "Custom Playlist from Jammming",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly include Authorization header
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Playlist created:', response.data);
      trackListId = response.data.id
      console.log(trackListId);
      
    } catch (error) {
      console.error('Error creating playlist:', error);
    }

    const selectedUris = selectedTracks.map(track => track.uri)

    await axios.post(`https://api.spotify.com/v1/playlists/${trackListId}/tracks`,
      {
        uris: selectedUris
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    )

    setSelectedTracks([])
    setPlayListName("")

    }

  // Extract the access token from the URL hash and store it in localStorage
  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem("token");

    // If there is no token in localStorage, extract it from the URL
    if (!storedToken && hash) {
      const tokenFromHash = new URLSearchParams(hash.substring(1)).get("access_token");

      if (tokenFromHash) {
        window.localStorage.setItem("token", tokenFromHash);
        setToken(tokenFromHash);
        window.location.hash = ''; // Clean up the URL by removing the hash
        setIsLoggedIn(true)
      }
    } else if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true) // Set the token from localStorage
    }

    

    setLoading(false);
  }, []);

 
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Header>
      <Routes>
        {/* If there's no token, show login */}
        <Route path='/login' element={<Login auth={AUTH_URL} />} />
        
        {/* If there is a token, show Home */}
        <Route path='/' element={token ? <Home  selectedTracks={selectedTracks} setSelectedTracks={setSelectedTracks} playListName={playListName} setPlayListName={setPlayListName} submitPlaylist={submitPlaylist} tracks={tracks} onSubmit={handleSearch} search={search} setSearch={setSearch} /> : <Login auth={AUTH_URL} />} />
        
        {/* Catch-all redirects to home */}
        <Route path='*' element={token ? <Home selectedTracks={selectedTracks} setSelectedTracks={setSelectedTracks} playListName={playListName} setPlayListName={setPlayListName} submitPlaylist={submitPlaylist} tracks={tracks} onSubmit={handleSearch} search={search} setSearch={setSearch} /> : <Login auth={AUTH_URL} />} />
      </Routes>
    </Router>
  );
}

export default App;