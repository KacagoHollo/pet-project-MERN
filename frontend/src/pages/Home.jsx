import React, {useState} from 'react';
import {useAuth} from '../providers/auth';
import Button from "@mui/material/Button";

const Home = () => {
    const { token, auth, user } = useAuth();
    console.log(user);
    console.log(auth);
  return (
    <div>
        <h3>{token ? "You are logged in " + user.username : "Hi anonymus!"}</h3>
        {token ? <h1>Welcome on the Bird Sanctuary page</h1> : (
        <Button 
          variant="contained"
          color="success"
          size="small"onClick={() => auth('google')}
        >
          Login with Google
        </Button>)}
    </div>
  );
};

export default Home;