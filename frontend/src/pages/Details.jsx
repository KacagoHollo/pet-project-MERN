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
            <p><b>E-mail: </b>{email}</p>
            <p><b>Web page: </b> <a href="{web}"></a> </p>
            <p><b>Address: </b>{address}</p>
            <p><b>National park: </b>{national_park}</p>
            <p><b>More information: </b>{information}</p>
        </>
            )
        }
    </div>
        <Button size="small" variant="contained" onClick={() => setHidden(!hidden)}>{hidden ? "Show more" : "Show less"}</Button>
    </div>
       
  )
}

export default Details