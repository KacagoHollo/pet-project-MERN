import React, {useState, useEffect} from 'react';
import http from 'axios';
import {useAuth} from '../providers/auth';
import Details from './Details';
import Button from "@mui/material/Button";
import LoadingMask from '../components/Loadingmask'
import {Select, FormControl, InputLabel, MenuItem} from '@mui/material';

const Home = () => {
  const [name, setName] = useState("");


  const { token, auth, user} = useAuth();

  console.log(auth);

  const [orgs, setOrgs] = useState(null);
  const [value, setValue] = useState("");
  const [image, setImage] = useState("./img/logo.png");
  

  const getOrgs = async () => {
    const response = await http.get("http://localhost:8080/api/organization/all", {});

    setOrgs(response.data);
    console.log(response.data);

  };
  console.log(orgs);

  const handleChange = async (e) => {
    setValue(e.target.value)
    setName(e.target.value)
  }


  useEffect(() => {
    getOrgs();
    // eslint-disable-next-line
  }, []);

  console.log(orgs);
  return (
    <div className='home' style={{ backgroundImage: `url(/${image})`}}>
        <h3>{token ? "You are logged in " + user.username : "Hi anonymus!"}</h3>
        <h1>Welcome on the Bird Sanctuary page</h1>
        {
          !token ?
          (
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
            </div>
          )
          : ""
        }
        <div className='form'>
          <br />
          <h3>Check the registered Bird Sanctuarys</h3>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Organization</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                color="success"
                
                value={name}
                label="Organization"
                onChange={handleChange}
                
              >
                {orgs ? orgs.map(({name, description, help, phone, email, web, address, national_park, information}) => (

                  <MenuItem value={[name, description, help, phone, email, web, address, national_park, information]} key={name}>{name}</MenuItem>
                ))
                :
                <LoadingMask/>
              }
              </Select>       
            </FormControl>

            <p><b>Name:</b> <span>{value[0]}</span></p>
            <p><b>Description:</b> <span>{value[1]}</span></p>
            <p><b>Type of help:</b> <span>{value[2]}</span></p>
            <p><b>Phone number:</b> <span>{value[3]}</span></p>
            <Details email={value[4]} web={value[5]} address={value[6]} national_park={value[7]} information={value[8]}/>
        </div>   
    </div>
    );
  };

export default Home;