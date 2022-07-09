import React from 'react'
import { useState, useEffect } from 'react'
import http from 'axios'
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../providers/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";



function Register() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const navigate = useNavigate();
    const { user, register, auth, token } = useAuth();

    useEffect(() => {
        if (user.userId) navigate("/profile");
      }, [user]);

    // const registerr = async () => {
    //     const response = await http.post("http://localhost:3000/api/user/create", {
    //         username,
    //         name,
    //         title,
    //         email,
    //         phone
    //     }, {
    //         headers: {
    //             "authorization": localStorage.getItem("token")
    //         }
    //     })
    //     setUsername("")
    //     navigate('/profile')
    // }

  return (
    <div className='register'>
      <h2>Register</h2>
        { !user ? "Hello " + <h2>user.username</h2> :
          <>
            <TextField variant="filled"
              fullWidth
              size="small"
              autoFocus
              label="Username"
              color="success"
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(event) => setUsername(event.target.value)} />
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
            <Button onClick={() => register(username, name, title, email, phone)}
              variant="contained"
              color="success"
              size="small"
            >
              Register
            </Button>
          </>
        }
        <hr />
  
    </div>
  )
}

export default Register;