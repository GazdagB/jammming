const getToken = async (getUserHelper,setToken,setIsLoggedIn,logIn) => {
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
  }
}

export {getToken}