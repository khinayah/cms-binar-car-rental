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
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./layout/Main";
// import AdminAddCar from "./pages/AdminAddCar";
import { AuthProvider } from "./routes";
import FromCar from "./pages/FormCar";

function App(props) {
  let element = useRoutes ([
    {path: "/", element: <AdminLogin/>},
    {path: "/dashboard", element: <Layout/>},
    {path: "/dashboard/add-car", element: <FromCar/>},
    {path: "/dashboard/edit-car/:id", element: <FromCar/>},

  ])

  return element
    // <AuthProvider {...props} />
  
}

export default App
