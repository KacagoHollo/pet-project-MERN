import React, {useState} from 'react';
import {useAuth} from '../providers/auth'

const Home = () => {
    const { token, auth } = useAuth();
  return (
    <div>
        <p>{token ? "Logged in": "Annonymus"}</p>
        {token ? "Welcome" : (<button onClick={() => auth('google')}>Login with Google</button>)}
    </div>
  );
};

export default Home;