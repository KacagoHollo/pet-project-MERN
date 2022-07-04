import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import LoadingMask from "../components/Loadingmask.jsx";
import ProfileDetails from "../components/ProfileDetails";
import Button from "@mui/material/Button";

const Profile = ({users}) => {
  const { user, token, auth, update } = useAuth();

  const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmation, setConfirmation] = useState("");

  useEffect(() => {

  }, [])
  
  console.log(user);
  console.log(users);
  return (
    <div>
      <header>
        <h4>Welcome on the profile site</h4>
        <h2>{user ? user.username : "Anonymus"}</h2>
      </header>
      <h4>Your Profile datas:</h4>
      <li>
        {user ? 
          <ul>
            <li>Name: {user.name}</li>
            <li>Title: {user.title}</li>
            <li>E-mail: {user.email}</li>
            <li>Phone: {user.phone}</li>
          </ul>
        : (
          <LoadingMask />
        )}
      </li>
      <Button 
        nClick={() => update(username, name, title, email, phone)}
        variant="contained"
        color="success"
        size="small"

      >
        Update datas
      </Button>    

    </div>
  );
};

export default Profile;

