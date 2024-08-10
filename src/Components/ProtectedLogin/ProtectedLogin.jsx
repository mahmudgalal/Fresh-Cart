import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../Login/Login'

export default function ProtectedLogin({children}) {
    if(localStorage.getItem("userToken") == null) {
        return children
    }else{
        return <Navigate to={"/"} />
    }
}
