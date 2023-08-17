import { useRoutes } from "react-router-dom"
import Layout from "../layout/Main"
import AdminLogin from "../pages/AdminLogin"
import AdminListCar from "../pages/AdminListCar"
import AdminAddCar from "../pages/AdminAddCar"
import AdminEditCar from "../pages/AdminEditCar"
import AdminDashboard from "../pages/AdminDashboard"


export const PublicRoute = () => {
    const routes = useRoutes([
        { index: true, path: '/', element: <AdminLogin />, },
        { path: '/login', element: <AdminLogin />, }
    ])
    return routes
}

export const PrivateRoute = () => {
    const routes = useRoutes([
        { index: true, path: '/list-cars', element: <AdminDashboard/> },
        { index: true, path: '/list-cars', element: <AdminListCar/> },
        { index: true, path: '/list-cars/add-car', element: <AdminAddCar/> },
        { index: true, path: '/list-cars/edit-car/:id', element: <AdminEditCar/> },
    ])
    return routes
}

export const Auth = () => {
    const access_token = localStorage.getItem("admin_token")
    const isLoggedIn = access_token ? true : false
    return isLoggedIn ? <Layout /> : <PublicRoute />
}