import { createContext, useState,useEffect } from "react";

export let UserContext = createContext(0);

export default function UserContextProvider(props) {
const [userLogin, setuserLogin] = useState(null)
useEffect(() => {
  if(localStorage.getItem('userToken')!==null){
    setuserLogin(localStorage.getItem('userToken')!==null)
  }
}, [])


  return (
    <UserContext.Provider value={{ userLogin, setuserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
