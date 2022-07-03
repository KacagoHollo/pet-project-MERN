import React, {useEffect} from 'react';
import  {useAuth} from '../providers/auth';
import { useNavigate, useParams } from 'react-router-dom';

function Callback() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const pathVariables = useParams()

    useEffect(() => {
        const loginWithCode = async() => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            if (code) {
              console.log(code)
                await login(code, pathVariables.provider);
            }
            navigate("/profile");
          }
          loginWithCode();

      // eslint-disable-next-line
    }, []);
    
  return (
    <div>
      Callback
    </div>
  )
}

export default Callback;