import { createContext, useEffect, useState } from "react";


export const authContext = createContext();

export default function AuthContextProvider({children}){

   const [token , setToken] = useState(localStorage.getItem("userToken"));

// useEffect(() => {
//     {localStorage.getItem("userToken") ? setToken(localStorage.getItem("userToken")) : setToken(null)}
// } , [])

    return <authContext.Provider value={{token , setToken}}>
        {children}
    </authContext.Provider>
}