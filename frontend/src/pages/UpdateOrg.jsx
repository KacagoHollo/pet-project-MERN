import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../providers/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { organizationApi } from '../api/organization';


function UpdateOrg() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [help, setHelp] = useState("");
  const [availability, setAvailability] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [web, setWeb] = useState("");
  const [address, setAddress] = useState("");
  const [nationalPark, setNationalPark] = useState("");
  const [information, setInformation] = useState("");


  const navigate = useNavigate();

  const { user, register, orgRegister, auth, token, organization } = useAuth();
  const { post, del, patch } = organizationApi();

    useEffect(() => {
        if (!register) navigate("/profile");
      }, [register]);
    useEffect(() => {
        
      }, [organization]);


      const update = async () => {
        const response = await patch("http://localhost:8080/api/organization/update", 
        {
          name,
          description, 
          help, 
          availability, 
          phone, 
          email, 
          web, 
          address, 
          nationalPark, 
          information
        },
        // {
        //   headers: {
        //     authorization: localStorage.getItem("token"),
        //   },
        // }
        );
        localStorage.removeItem("token")
        console.log(response.data)
        localStorage.setItem("token", response.data.token)
        navigate('/profile')
        console.log(user.userId)
      }

  return (
    <div>
      <h2>Your organization's update page</h2>
      
      { !user ? "Hello Anonymus, please register an admin account!" :
          <>
            <h4>Hello</h4>
            <h3>{user.name}</h3>
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
            <TextField variant="filled"
              fullWidth
              size="small"
              autoFocus
              label="Web page"
              color="success"
              type="web"
              placeholder="Your organization's web page" 
              value={web} 
              onChange={(event) => setWeb(event.target.value)} />
            <TextField variant="filled"
              fullWidth
              size="small"
              autoFocus
              label="Address"
              color="success"
              type="text"
              placeholder="Your organization's address" 
              value={address} 
              onChange={(event) => setAddress(event.target.value)} />
            <TextField variant="filled"
              fullWidth
              size="small"
              autoFocus
              label="National Park"
              color="success"
              type="text"
              placeholder="Which National Park the organization belongs to?" 
              value={nationalPark} 
              onChange={(event) => setNationalPark(event.target.value)} />
            <TextField variant="filled"
              fullWidth
              size="small"
              autoFocus
              label="Information"
              color="success"
              type="text"
              placeholder="Any important information?" 
              value={information} 
              onChange={(event) => setInformation(event.target.value)} />
            <Button onClick={update}
              variant="contained"
              color="success"
              size="small"
            >
              Update
            </Button>
          </>
  }
  </div>
  )
}

export default UpdateOrg;