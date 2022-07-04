import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import LoadingMask from "../components/Loadingmask.jsx";
import ProfileDetails from "../components/ProfileDetails";


const Profile = ({users}) => {
  const { user, token, auth } = useAuth();
  const [username, setUserName] = useState("")

  useEffect(() => {
    setUserName(user.username)
  }, [])
  
  console.log(user.name);
  return (
    <div>
      <p>{user ? "Welcome on the profile site " + username : "Anonymus"}</p>
     <li>
      {user ? 
      //   (users.map((user, i) => (
      //     <ProfileDetails user={user} key={i}/>
      // ))
      // ) 
      <ul>{user.name}</ul>
      : (
        <LoadingMask />
      )}
     </li>
     

    </div>
  );
};

export default Profile;

