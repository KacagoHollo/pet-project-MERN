import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth';
import Button from "@mui/material/Button";

const Navbar = () => {
    const navigate = useNavigate();
    const { auth, token, logout, organization } = useAuth()
    const nav = (path) => {
        console.log('rerouting');
        navigate(path);
    }
  return (
    <nav className='navbar' style={{backgroundColor:"#b0c395", display:"flex", justifyContent:"space-between"}}>
        <div className='left'>
          <Button 
            onClick={() => nav('/')}
            variant="contained"
            color="success"
            size="small"
            >
              Home</Button>
          {/* <button onClick={() => nav('/about')}>About</button> */}
          { token ?
            <Button  
              onClick={() => nav('/profile')}
              variant="contained"
              color="success"
              size="small"
            >
              Profile</Button>
            : ""
          }
          { !organization ?
            <Button
              onClick={() => nav('/organization')}
              variant="contained"
              color="success"
              size="small"
            >
              Organization</Button>
          : ""
          }
        </div>
        <div className='right'>
          { token ? 
            <Button
             onClick={logout}
             variant="contained"
              color="success"
              size="small"
            >Logout</Button> 
            :
            <Button
             onClick={() => auth('google')}
             variant="contained"
              color="success"
              size="small"
             >
              Login</Button>
            
          }
        </div>
    </nav>
  )
}

export default Navbar;