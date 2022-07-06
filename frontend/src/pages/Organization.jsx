import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../providers/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Organization() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
    const [help, setHelp] = useState("");
    const [availability, setAvailability] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { user, register, auth, token } = useAuth();

    useEffect(() => {
        if (!register) navigate("/profile");
      }, [register]);

  return (
    <div>
      <h2>Your organization</h2>
      
      { !user ? "Hello " + <h2>user.username</h2> + "Please register a profile account!" :
          <>
            <TextField variant="filled"
              fullWidth
              size="small"
              autoFocus
              label="Name of the organization"
              color="success"
              type="text" 
              placeholder="Name of the organization" 
              value={name} 
              onChange={(event) => setName(event.target.value)} />
            <TextField variant="filled"
              fullWidth
              size="small"
              autoFocus
              label="Description"
              color="success"
              type="text" 
              placeholder="Description" 
              value={description} 
              onChange={(event) => setDescription(event.target.value)} />
            <TextField variant="filled"
              fullWidth
              size="small"
              autoFocus
              label="Type of help"
              color="success"
              type="text" 
              placeholder="Type of help" 
              value={help} 
              onChange={(event) => setHelp(event.target.value)} />
            <TextField variant="filled"
              fullWidth
              size="small"
              autoFocus
              label="Availability"
              color="success"
              type="text"
               placeholder="Availability" 
               value={availability} 
               onChange={(event) => setAvailability(event.target.value)} />
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
            <Button onClick={() => register(name, description, help, availability, phone, email)}
              variant="contained"
              color="success"
              size="small"
            >
              Register
            </Button>
          </>
  }
  </div>
  )
}

export default Organization