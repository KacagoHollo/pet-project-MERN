import React, {useState} from 'react';
import {useAuth} from '../providers/auth'

const Home = () => {
    const { token, auth, user } = useAuth();
    const [username, setUserName] = useState(user.username);
  return (
    <div>
        <p>{token ? "You are logged in " + username : "Hi anonymus!"}</p>
        {token ? <h1>Welcome on the Bird Sanctuary page</h1> : (<button onClick={() => auth('google')}>Login with Google</button>)}
    </div>
  );
};

export default Home;