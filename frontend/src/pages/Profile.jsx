import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import LoadingMask from "../components/Loadingmask.jsx";
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import { organizationApi } from "../api/organization";

const Profile = ({users}) => {
  const { user, token, auth, organization} = useAuth();
  const navigate = useNavigate();
  const { patch } = organizationApi();


  useEffect(() => {

  }, [])
  
  console.log(user);
  console.log(users);
  return (
    <div>
      <header>
        <h4>Welcome on the profile site</h4>
        <h2>{user ? user.name : "Anonymus"}</h2>
      </header>
      <h4>Your Profile datas:</h4>
      <li>
        {user ? 
          <ul>
            <li>Your name: <b>{user.name}</b></li>
            <li>Your title: <b>{user.title}</b></li>
            <li>Your e-mail: <b>{user.email}</b></li>
            <li>Your phone: <b>{user.phone}</b></li>
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
      <br />
      <div className="org">
        { organization ?
          <>
            <h4>Your organization is:</h4>
            <h2>{organization.name}</h2> 
            <Button 
              onClick={() => navigate('/orgUpdate')}
              variant="contained"
              color="success"
              size="small"
            >
        Update organization datas
      </Button> 
          </>
          : 
          <>
            <h4>Please choose your organization:</h4>
            <Button 
              onClick={() => navigate('/organization')}
              variant="contained"
              color="success"
              size="small"
            >
            Create organization
            </Button>
          </>
        }
      </div>
    </div>
  );
};

export default Profile;

