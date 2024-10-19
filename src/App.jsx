import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

function App() {
  const CLIENT_ID = "56796ac4362e40ccae0bf92d56ea9b1e";
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);  // New loading state
  const [isLoggedIn,setIsLoggedIn] = useState(false)

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
        <Route path='/login' element={<Login auth={{ CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE }} />} />
        
        {/* If there is a token, show Home */}
        <Route path='/' element={token ? <Home /> : <Login auth={{ CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE }} />} />
        
        {/* Catch-all redirects to home */}
        <Route path='*' element={token ? <Home /> : <Login auth={{ CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE }} />} />
      </Routes>
    </Router>
  );
}

export default App;