import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import LoadingMask from "../components/Loadingmask.jsx";
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import { organization } from "../api/organization";

const Profile = ({users}) => {
  const { user, token, auth} = useAuth();
  const navigate = useNavigate();
  const { patch } = organization();

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
        onClick={() => navigate('/update')}
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

