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

function App() {
  let element = useRoutes ([
    {path: "/", element: <AdminLogin/>},
    {path: "/dashboard", element: <Layout/>}
  ])

  return element
}

export default App
