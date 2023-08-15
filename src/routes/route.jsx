import AdminLogin from "../pages/AdminLogin"
import AdminListCar from "../pages/AdminListCar"
import AdminFormCar from "../pages/AdminFormCar"

export const publicrouting = (props) => {
    return [
        { index: true, path: '/', element: <AdminLogin  {...props} />, },
        { index: true, path: '/login', element: <AdminLogin  {...props} title="Login" />, },
    ]
}

export const privaterouting = (props) => {
    return [
        { index: true, path: '/', element: <AdminLogin  {...props} />, },
        { index: true, path: '/login', element: <AdminLogin  {...props} title="Login" />, },
        { index: true, path: '/list-cars', element: <AdminListCar {...props} /> },
        { index: true, path: '/list-cars/add-car', element: <AdminFormCar {...props} /> },
        { index: true, path: '/list-cars/edit-car/:id', element: <AdminFormCar {...props} /> },
    ]
}


