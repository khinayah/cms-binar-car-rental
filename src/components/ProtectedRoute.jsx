import { Navigate, Outlet } from "react-router-dom"
import React from "react"

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token')

    if(!token) {
        return <Navigate to ={"/login"} />
    }

    else if(token) {
        if (children === "/login" || children === "/") {
            return <Outlet />
        }
    }

    return <>{children || <Outlet />}</>
}

export default ProtectedRoute