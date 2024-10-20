import axios from "axios";

async function getUserID(token){
    try {
      const { data } = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the access token here
        },
      });

      return data.id
    } catch (error) {
      console.error("Failed to get User ID:" , error)
    }
  }


  async function createPlaylist(userId, playListName, token, ) {

    try {
        const response = await axios.post(
            `https://api.spotify.com/v1/users/${userId}/playlists`,
            {
              name: playListName,
              description: 'Custom Playlist from Jammming',
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Correctly include Authorization header
                'Content-Type': 'application/json',
              },
            }
          );
    
          console.log('Playlist created:', response.data);
          let playListId = response.data.id;
          return playListId;
    } catch (error) {
        console.error("Couldn't create playlist: ", error)
    }
   
  }
  

  async function addingTracksToPlaylist(playListId,selectedUris,token) {
    await axios.post(
        `https://api.spotify.com/v1/playlists/${playListId}/tracks`,
        {
          uris: selectedUris,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
  }

  async function handleSearch(keyWord,setTracks, token,setIsLoading) {
    keyWord = keyWord.trim();
    if(keyWord === ""){
      return;
    }
    setIsLoading(true);
    setTracks([])
    try {
        const { data } = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: keyWord,
            type: 'track'
          },
        });
        
        
        console.log(data.tracks.items);
        setTracks(data.tracks.items);
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to get tracks search:', error);
      }
  } 

  async function getUserData(token) {
    if (!token) {
      console.error("Token is undefined or invalid");
      return; // Early return if token is not valid
    }
    
    try {
      const { data } = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the access token here
        },
      });
  
      return data;
    } catch (error) {
      console.error("Failed to get User Data:", error);
    }
  }

  export {getUserID, createPlaylist,addingTracksToPlaylist, handleSearch, getUserData}