import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import axios from 'axios';
import { getUserName } from './helperFunctions';
import { getUserID, createPlaylist, addingTracksToPlaylist, handleSearch, getUserData} from './apiMethodes';

function App() {
  const CLIENT_ID = '56796ac4362e40ccae0bf92d56ea9b1e';
  const REDIRECT_URI = 'http://localhost:5173/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPE = 'playlist-modify-public playlist-modify-private';

  const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playListName, setPlayListName] = useState('');
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [userData, setUserData] = useState({
    display_name: "",
  }); 
  const [isLoading,setIsLoading] = useState(false)

  async function submitPlaylist() {
    let playListId;

    // Step 1: Getting UserID From Spotify API 
    const userId = await getUserID(token);
    console.log(`userId: ${userId}`);

    // Step 2: Creating Playlist and getting the PlaylistID back 
    playListId = await createPlaylist(userId, playListName, token);
    const selectedUris = selectedTracks.map((track) => track.uri);

    // Step 3: Adding tracks To the Playlist 
    await addingTracksToPlaylist(playListId, selectedUris, token);

    setSelectedTracks([]);
    setPlayListName('');
  }

  function loggOut() {
    setIsLoggedIn(false); 
    localStorage.removeItem("tokenExpiresAt"); 
    localStorage.removeItem("token"); 
    localStorage.removeItem("tokenExpiresIn");
    localStorage.removeItem("userData") 
    window.location.href = '/login';
  }



  async function logIn(tokenFromHash, expiresAt) {
    window.localStorage.setItem('token', tokenFromHash);
    window.localStorage.setItem('tokenExpiresAt', expiresAt);
    window.localStorage.setItem("userData", JSON.stringify(await getUserData(tokenFromHash)))
    setToken(tokenFromHash);
    window.location.hash = ''; // Clean up the URL by removing the hash
    setIsLoggedIn(true);
  }

  async function getUserHelper(storedToken){
    setUserData(await getUserData(storedToken))
  }

  // Checks If the token is expired on initial loading of the site
  useEffect(() => {
    // Check token expiration on initial load
    const tokenExpiresAt = parseInt(localStorage.getItem("tokenExpiresAt"), 10);
    if (tokenExpiresAt <= Date.now()) {
      loggOut();
    }
  }, []);


  // Checks how much time is left for the token to expire. If expired it logges out the user.
  useEffect(() => {
    if (isLoggedIn) {
      const tokenExpiresAt = parseInt(localStorage.getItem("tokenExpiresAt"), 10);
      
      // Calculate the time remaining until expiration
      const timeRemaining = tokenExpiresAt - Date.now();

      if (timeRemaining > 0) {
        const timeoutId = setTimeout(() => {
          loggOut();
          console.log("lefutott");
        }, timeRemaining); // Set the timeout to the remaining time

        // Cleanup function that runs if the component unmounts or before re-running the effect
        return () => clearTimeout(timeoutId);
      } else {
        loggOut(); // Log out immediately if the token has expired
      }
    }
  }, [isLoggedIn]);

  
  useEffect(() => {
    const hash = window.location.hash;
    console.log(hash);
    
    let storedToken = window.localStorage.getItem('token');

    if (!storedToken && hash) {
      const tokenFromHash = new URLSearchParams(hash.substring(1)).get('access_token');
      const expiresIn = new URLSearchParams(hash.substring(1)).get("expires_in");
      const expiresAt = Date.now() + (expiresIn * 1000); // Set expiration to 10 seconds

      if (tokenFromHash) {
       
        logIn(tokenFromHash,expiresAt)
      }
    } else if (storedToken) {
      //Getting User Data on Every Rerender of the page 
      getUserHelper(storedToken)
      setToken(storedToken);
      setIsLoggedIn(true);
      
       // Set the token from localStorage
    }
  }, []);

  return (
    <Router>
      <Header userData={userData} isLoggedIn={isLoggedIn} loggOut={loggOut}></Header>
      <Routes>
        <Route path="/login" element={<Login auth={AUTH_URL} />} />
        <Route path="/" element={token ? (
          <Home
            isLoading={isLoading}
            selectedTracks={selectedTracks}
            setSelectedTracks={setSelectedTracks}
            playListName={playListName}
            setPlayListName={setPlayListName}
            submitPlaylist={submitPlaylist}
            tracks={tracks}
            onSubmit={()=> handleSearch(search,setTracks,token,setIsLoading)}
            search={search}
            setSearch={setSearch}
          />
        ) : (
          <Login auth={AUTH_URL} />
        )} />
        <Route path="*" element={token ? (
          <Home
            isLoading={isLoading}
            selectedTracks={selectedTracks}
            setSelectedTracks={setSelectedTracks}
            playListName={playListName}
            setPlayListName={setPlayListName}
            submitPlaylist={submitPlaylist}
            tracks={tracks}
            onSubmit={()=> handleSearch(search,setTracks,token,setIsLoading)}
            search={search}
            setSearch={setSearch}
          />
        ) : (
          <Login auth={AUTH_URL} />
        )} />
      </Routes>
    </Router>
  );
}

export default App;
