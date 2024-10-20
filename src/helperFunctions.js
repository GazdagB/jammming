import { getUserData } from "./apiMethodes";

async function getUserName(tokenFromHash,setUserName){
    const userData = await getUserData(tokenFromHash);
    if (userData) {
      setUserName(userData.display_name); // Set the username if data is retrieved
    }
  }

  async function getUserProfilePicture(tokenFromHash) {
    const userData = await getUserData(tokenFromHash)
    
  }
  export {getUserName};