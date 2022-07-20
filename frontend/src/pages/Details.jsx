import React, {useState} from 'react';
import Button from "@mui/material/Button";

function Details({email, web, address, national_park, information}) {
    const [hidden, setHidden] = useState(true);


  return (
    <div>
        <div>
        {hidden ? "" : 
            (
        <>
            <p><b>E-mail: </b><span>{email}</span></p>
            <p><b>Web page: </b> <span><a href={web}>{web}</a></span> </p>
            <p><b>Address: </b><span>{address}</span></p>
            <p><b>National park: </b><span>{national_park}</span></p>
            <p><b>More information: </b><span>{information}</span></p>
        </>
            )
        }
    </div>
        <Button size="small" variant="contained" color="warning" onClick={() => setHidden(!hidden)}>{hidden ? "Show more" : "Show less"}</Button>
    </div>
       
  )
}

export default Details