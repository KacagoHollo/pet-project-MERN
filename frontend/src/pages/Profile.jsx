import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";


const Profile = () => {
  const { user, token, auth } = useAuth();
  const [username, setUserName] = useState(user.username)

  useEffect(() => {
  }, [])
  

  return (
    <div>
      <p>{user ? "Welcome on the profile site " + username : "Anonymus"}</p>
     
     

    </div>
  );
};

export default Profile;

