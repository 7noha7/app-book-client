import React, { ReactNode, useContext, useEffect, useState } from "react"
import apiClient from "../lib/apiClient";

interface User{
  id: number;
  email: string;
  username: string;
}

interface userAuthContextType {
  user:User| null;
  login: (token: string) => void;
  logout: () => void;
  // token: string | null;
  // isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const userAuthContext =React.createContext<userAuthContextType>({
  user:null,
  login: () => {},
  logout: () => {},
  // token: null,
  // isAuthenticated: false,
})

export const useAuth = () => {
  return useContext(userAuthContext);
}

export const AuthProvider = ({ children}: AuthProviderProps) => {
  const [ user, setUser] = useState< null | {
    id: number; 
    email: string; 
    username: string;}>(null);
  
  useEffect(()=> {
    const token = localStorage.getItem("user_AuthToken");
    if(token){
      apiClient.defaults.headers["Authorization"] =`Bearer ${token}`;

      apiClient.get("users/find")
      .then((res) => {
        setUser(res.data.user);
      }).catch((err) =>{
        console.log(err);
      });
    }

  },[]);

  // const [token, setToken] = useState<string | null>(null);
  // const isAuthenticated = !!token;

  const login = async (token: string) => {
  localStorage.setItem("user_AuthToken", token);
  apiClient.defaults.headers["Authorization"] =`Bearer ${token}`;


    try{

      const res =
      apiClient
      .get("users/find")
      .then((res) => {
        setUser(res.data.user);
      });
        } catch(err)  {
        console.log(err);
        }
    };
    // setToken(token);



  const logout =() => {
    localStorage.removeItem("user_AuthToken");
    delete apiClient.defaults.headers["Authorization"];
    setUser(null);
  };

// useEffect(()=> {
//   const saveToken =localStorage.getItem("user_AuthToken");
//   if(saveToken) {
//     setToken(saveToken);
//   }
// },[]);

  const value = {
    user,
    login,
    logout,
    // token,
    // isAuthenticated,
  };

  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  )
};