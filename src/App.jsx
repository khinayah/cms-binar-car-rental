import React from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useRoutes
} from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminListCar";
import Layout from "./layout/Main";
import AdminFormCar from "./pages/AdminFormCar";
import { AppPrivateRoute, AuthProvider } from "./routes";
import AdminListCar from "./pages/AdminListCar";

function App(props) {
  // let element = useRoutes ([
  //   {path: "/", element: <AdminLogin/>},
  //   {path: "/list-cars", element: <Layout/>},
  //   {path: "/list-cars/add-car", element: <AdminFormCar/>},
  //   {path: "/list-cars/edit-car/:id", element: <AdminFormCar/>},

  // ])

  return (
 
  
    <AuthProvider {...props} />

    
  )
  
}

export default App
