import React, {useState, useEffect} from 'react';
import http from 'axios';
import config from '../app.config';
import {useAuth} from '../providers/auth';
import Button from "@mui/material/Button";
import LoadingMask from '../components/Loadingmask'
import {Select, FormControl, InputLabel, MenuItem} from '@mui/material';

const Home = () => {
    const [name, setName] = useState("")
    const { token, auth, user} = useAuth();

    console.log(auth);

    const [orgs, setOrgs] = useState(null);
  

  const getOrgs = async () => {
    const response = await http.get("http://localhost:8080/api/organization/all", {
      // headers: {
      //   authorization: token,
      // },
    });

    setOrgs(response.data);
    console.log(response.data);
    // setName(response.data.name);
  };

  useEffect(() => {
    getOrgs();
    // eslint-disable-next-line
  }, []);

  console.log(orgs);
  return (
    <div>
        <h3>{token ? "You are logged in " + user.username : "Hi anonymus!"}</h3>
        {token ? <h1>Welcome on the Bird Sanctuary page</h1> : (
        <div>
          <Button 
            variant="contained"
            color="success"
            size="small"onClick={() => auth('google')}
          >
            Login with Google
          </Button>
          
          <br />
          <h2>Or...</h2>
          <h3>Check the registered Bird Sanctuarys</h3>
          <br />
            <h4>Or choose from the list</h4>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Organization</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                color="success"
                
                value={name}
                label="Organization"
                onChange={(event) => setName(event.target.value)}
              >
                {orgs ? orgs.map((org, i) => (
                  <MenuItem value={org.name}>{org.name}</MenuItem>
                ))
                :
                <LoadingMask/>
              }
              </Select>
            </FormControl>
        </div>
        )
      }
    </div>
  );
};

export default Home;