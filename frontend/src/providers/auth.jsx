import { React, useState, useEffect, useContext, createContext } from "react";
import jwt from "jwt-decode";
import { organizationApi } from "../api/organization";
import config from "../app.config.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const { post, patch } = organizationApi();

  const auth = (provider) => {
    const googleBaseUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const searchParams = new URLSearchParams();
    searchParams.append("response_type", "code");
    searchParams.append(
      "client_id",
      config[provider].client_id
    );
    searchParams.append("redirect_uri", window.location.origin + "/callback/" + provider);
    searchParams.append("scope", "openid");
    searchParams.append("prompt", "select_account");

    const completeUrl = googleBaseUrl + "?" + searchParams.toString();
    window.location.href = completeUrl;
  };

  const login = async (code, provider) => {
    try {
      const response = await post("/user/login", {
        code,
        provider,
      });
      console.log("data", response.data);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUser(jwt(response.data.token));
    } catch (err) {
      console.log(err);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const register = async (username, name, title, email, phone) => {
    const response = await post("/user/create", { username, name, title, email, phone });

    if (response?.status === 200) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUser(jwt(response.data.token));
    }
  };

  const orgRegister = async (name, description, help, availability, phone, email, web, address, national_park, information, admins) => {
    const response = await post("/organization/create", {name, description, help, availability, phone, email, web, address, national_park, information, admins });

    if (response?.status === 200) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setOrganization(jwt(response.data.token));
    }
  };

  // const update = async (name, title, email, phone, confirmation) => {
  //   const response = await patch("/user/update", { name, title, email, phone, confirmation });

  //   if (response?.status === 200) {
  //     setToken(response.data.token);
  //     localStorage.setItem("token", response.data.token);
  //     setUser(jwt(response.data.token));
  //   }
  // };

  const contextValue = { token, auth, logout, login, user, organization, register, orgRegister};

  useEffect(() => {
    const tokenInStorage = localStorage.getItem("token");
    if (tokenInStorage) {
      setToken(tokenInStorage);
      setUser(jwt(tokenInStorage));
    }
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  ); // provide value for my context
};

// custom hook bro
const useAuth = () => {
  const context = useContext(AuthContext); // read the context and subscribe to its changes
  if (!context) throw new Error("add AuthProvider to route"); // dev help only
  return context;
};

export { AuthProvider, useAuth };
