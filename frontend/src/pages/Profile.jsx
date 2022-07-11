import React, { useState, useEffect } from "react";
import http from 'axios'
import { useAuth } from "../providers/auth";
import LoadingMask from "../components/Loadingmask.jsx";
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import {Select, FormControl, InputLabel, MenuItem} from '@mui/material';


const Profile = () => {
  const { user, organization} = useAuth();
  const navigate = useNavigate();
  
  const userDelete = async () => {
        const response = await http.delete(`http://localhost:8080/api/user/${user.userId}`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        })
        localStorage.removeItem("token");
        navigate('/');
    }

  useEffect(() => {
    
  }, [organization])
  
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
      <Button 
        onClick={userDelete}
        variant="contained"
        color="success"
        size="small"
      >
        Delete profile
      </Button>    
      <br />
      <div className="org">
        { organization ?
          <>
            <h4>Your organization is:</h4>
            <h2>{organization.name}</h2> 
            <Button 
              onClick={() => navigate('/organization/update')}
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
            {/* <br />
            <h4>Or choose from the list</h4>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Organization</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                color="success"
                
                value={name}
                label="Organization"
                onChange={(event) => setName(event.target.value)}
              >
                {organization.map((org, i) => (
                  <MenuItem value={org.name}>{org.name}</MenuItem>
                ))
              }
              </Select>
            </FormControl> */}
          </>
        }
      </div>
    </div>
  );
};

export default Profile;

