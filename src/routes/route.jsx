import AdminDashboard from "../pages/AdminListCar"
import AdminAddCar from "../pages/AdminFormCar"
import AdminLogin from "../pages/AdminLogin"
import Layout from "../layout/Main"

export const publicrouting = (props) => {
    return [
        { index: true, path: '/', element: <AdminLogin  {...props} />, },
        { index: true, path: '/login', element: <AdminLogin  {...props} title="Login" />, },
    ]
}

export const privaterouting = (props) => {
    console.log("props in privaterouting:", props);
    return [
        // { index: true, path: '/', element: <>BERHASIL LOGIN</> },
        { index: true, path: '/dashboard', element: <AdminDashboard {...props} /> },
        { index: true, path: '/dashboard/add-car', element: <AdminAddCar {...props} /> },
        { index: true, path: '/edit-car/:id', element: <AdminAddCar {...props} /> },
    ]
}


