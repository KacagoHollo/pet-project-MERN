import React from 'react'
import { useState, useEffect } from 'react'
import http from 'axios'
import { useNavigate } from 'react-router-dom';
import {organization} from '../api/organization';
import { useAuth } from "../providers/auth";

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
    <div>
      <h2>Register</h2>
        { !user ? "Hello " + <h2>user.username</h2> :
          <>
            <input type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
            <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
            <input type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
            <input type="email" placeholder="E-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input type="number" placeholder="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
            <button onClick={() => register(username, name, title, email, phone)}>Register</button>
          </>
        }
        <hr />
  
    </div>
  )
}

export default Register;