import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { getUserID, createPlaylist, addingTracksToPlaylist, handleSearch, getUserData} from './apiMethodes';
import albumPlaceholder from "./assets/album_placeholder.png";
import {getToken} from "./helperFunctions.js"
import axios from 'axios';

function App() {
  const CLIENT_ID = '56796ac4362e40ccae0bf92d56ea9b1e';
  const REDIRECT_URI = 'http://localhost:5173/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPE = 'playlist-modify-public playlist-modify-private ugc-image-upload';

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
  const [albumCover, setAlbumCover] = useState(albumPlaceholder);

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

   
     
  
    const isCustomAlbumImage = albumCover !== albumPlaceholder;

if (isCustomAlbumImage) {
  let albumCoverBase64 =  albumCover.replace(/^data:image\/jpeg;base64,/, '');

  try {
    await axios.put(`https://api.spotify.com/v1/playlists/${playListId}/images`, albumCoverBase64, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'image/jpeg',
      },
      maxContentLength: Infinity,  // Optionally ensure large payloads are handled
      maxBodyLength: Infinity,
    });
  } catch (error) {
    console.error("Couldn't create album cover: ", error);
  }
}

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

  
  useEffect(()=>{
    getToken(getUserHelper,setToken,setIsLoggedIn,logIn)
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
            albumCover={albumCover}
            setAlbumCover={setAlbumCover}
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
            albumCover={albumCover}
            setAlbumCover={setAlbumCover}
          />
        ) : (
          <Login auth={AUTH_URL} />
        )} />
      </Routes>
    </Router>
  );
}

export default App;
