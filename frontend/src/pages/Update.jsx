import React from 'react';
import { useState, useEffect } from 'react'
import http from 'axios'
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../providers/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { organizationApi } from "../api/organization";

function Update() {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const navigate = useNavigate();
    const { user, register, auth, token} = useAuth();
    const { patch } = organizationApi();

    const update = async () => {
        const response = await patch("http://localhost:8080/api/user/update", {
          headers: {
            "authorization": localStorage.getItem("token")
          }
        }, 
        {
          name,
          title,
          email,
          phone
        });
        localStorage.removeItem("token")
        console.log(response.data.token)
        localStorage.setItem("token", response.data.token)
        navigate('/profile')
      }
  return (
    <div className='register'>
      <h2>Update</h2>
        { !user ? "Hello " + <h2>user.username</h2> :
          <>
            <TextField variant="filled"
              fullWidth
              size="small"
              autoFocus
              label="Firstname and Lastname"
              color="success"
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={(event) => setName(event.target.value)} />
            <TextField variant="filled"
              fullWidth
              size="small"
              autoFocus
              label="Title"
              color="success"
              type="text" 
              placeholder="Title" 
              value={title} 
              onChange={(event) => setTitle(event.target.value)} />
            <TextField variant="filled"
              fullWidth
              size="small"
              autoFocus
              label="E-mail"
              color="success"
              type="email"
               placeholder="E-mail" 
               value={email} 
               onChange={(event) => setEmail(event.target.value)} />
            <TextField variant="filled"
              fullWidth
              size="small"
              autoFocus
              label="Phone number"
              color="success"
              type="number"
              placeholder="Phone number" 
              value={phone} 
              onChange={(event) => setPhone(event.target.value)} />
            <Button onClick={update}
              variant="contained"
              color="success"
              size="small"
            >
              Update
            </Button>
          </>
        }
        <hr />
  

    </div>
  )
}

export default Update