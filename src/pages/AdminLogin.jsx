import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import Form from "../components/Form";
import Input from "../components/Input";
import "../assets/css/login.css"
import backgroundLogin from '../assets/img/image 2.jpg'
import { useContext } from "react";
import { LayoutContext } from "../context/LayoutProvider";

const AdminLogin = () => {
    const navigate = useNavigate()
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [shownAlert, setShownAlert] = useState(false);
  const [succ, setSucc] = useState("");
  const [err, setErr] = useState("");
  const [load, setLoad] = useState(false);
  const {sidebar, header, setSidebar, setHeader} = useContext(LayoutContext)

  useEffect(() => {
    setHeader(false)
    setSidebar(false)
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    setLoad(true);
    const data = {
      email: form.email,
      password: form.password,
    };

    axios
      .post(`https://api-car-rental.binaracademy.org/admin/auth/login`, data)
      .then((res) => {
        // console.log(res);
        localStorage.setItem("admin_token", res.data.access_token);
        localStorage.setItem("role", res.data.role);
        const role = localStorage.getItem("role");
        if (role==="Customer") {
          setShownAlert(true);
          localStorage.removeItem("admin_token");
          localStorage.removeItem("role") 
        }
        if (role === "admin" || role === "Admin") {
          setSidebar(false)
          setHeader(false)
          setShowSuccessToast(true)
          navigate('/list-cars')
        }
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
        setShownAlert(true);
      });
  };

  return (
    <div className="admin-login-body">
      <Container fluid className="admin-login-container">
        <Row className="d-flex admin-login-parent">
          <Col lg={8} className="offset-lg-0">
            <img className="img-login" src={backgroundLogin} alt="pict-login" />
          
          </Col>
          <Col lg={4} className="sign-in-wrapper">
            <div className="sign-in-wrapper-child">
              <div className="logo"></div>
            </div>
            <h2 className="font-title-cms">Welcome, Admin BCR</h2>
            {shownAlert && (
              <Alert className="alert-login">
                <p>
                  Masukkan username dan password yang benar. Perhatikan
                  penggunaan huruf kapital.
                </p>
              </Alert>
            )}
            <Toast
          show={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
          delay={5000}
          autohide
          className="success-toast"
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Login successful! Welcome, Admin.</Toast.Body>
        </Toast>
            <div>
                    <Row>
                        <Col md={12} className="pb-2">
                            <Input  name="email" label={"Email"} required placeholder="johndoe@mail.com" value={form.email} className="form-control" onChange={handleChange} />
                        </Col>
                        <Col md={12} className="pb-2">
                            <Input  name="password" label={"Password"} required type="password" value={form.password} placeholder="6+ karakter" className="form-control" onChange={handleChange}/>
                        </Col>
                        <Col md={12} className="pt-2">
                            <Button type='submit' className='w-100' style={{ backgroundColor: "#0D28A6" }} onClick={handleSubmit}> {load ? "Loading..." : "Sign In"}</Button>
                        </Col>
                    </Row>
                </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminLogin;