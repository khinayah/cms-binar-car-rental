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
        { index: true, path: '/', element: <AdminDashboard />, },
        { path: '/dashboard', element: <AdminDashboard/> },
        { path: '/list-cars', element: <AdminListCar/> },
        { path: '/list-cars/add-car', element: <AdminAddCar/> },
        { path: '/list-cars/edit-car/:id', element: <AdminEditCar/> },
    ])
    return routes
}

export const Auth = () => {
    const access_token = localStorage.getItem("admin_token")
    const isLoggedIn = access_token ? true : false
    return isLoggedIn ? <Layout /> : <PublicRoute />
}