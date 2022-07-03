import React from 'react'
import { useState, useEffect } from 'react'
import http from 'axios'
import { useNavigate } from 'react-router-dom';
import {organization} from '../api/organization';
import { useAuth } from "../providers/auth";

function Register() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const { user, register, auth } = useAuth();

    useEffect(() => {
        if (user.userId) navigate("/profile");
      }, [user]);

    // const register = async () => {
    //     const response = await http.post("http://localhost:3000/api/user/create", {
    //         username
    //     }, {
    //         headers: {
    //             "authorization": localStorage.getItem("token")
    //         }
    //     })
    //     setUsername("")
    //     navigate('/profile')
    // }

  return (
    <div>Register
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <button onClick={() => register(username)}>Register</button>
        <hr />
      <h1>OR!</h1>
      <hr />
      <button onClick={() => auth("google")}>Google</button>
    </div>
  )
}

export default Register;