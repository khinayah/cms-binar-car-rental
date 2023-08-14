import { useRoutes } from "react-router-dom"
import { privaterouting, publicrouting } from "./route"
import Layout from "../layout/Main"


export const AppPublicRoute = (props) => {
    const routes = useRoutes(publicrouting(props))
    return routes
}

export const AppPrivateRoute = (props) => {
    const routes = useRoutes(privaterouting(props))
    return routes
}

export const AuthProvider = (props) => {
    const ACCESS_TOKEN = localStorage.getItem("admin_token")
    const isLoggedIn = ACCESS_TOKEN ? true : false;
    return isLoggedIn ? <Layout {...props} /> : <AppPublicRoute />
}