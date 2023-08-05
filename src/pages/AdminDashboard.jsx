import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/layout.css'
import {
  Row, Col,
  Button,
  Card,
} from 'react-bootstrap';
import "../assets/css/dashboard.css"
import axios from 'axios';
import ModalDelete from '../components/ModalDelete';
import Toast from 'react-bootstrap/Toast';



const AdminDashboard = () => {
  let initalForm ={
    name: "",
    category: "",
    status: false,
    minPrice: 0,
    maxPrice: 0,
  }
  const [data, setData] = useState([])
  const [err, setErr] = useState("")
  const [formData, setFormData] = useState(initalForm)
  const [modalId, setModalId] = useState(null)
  const [isShown, setIsShown] = useState(false)
  const [showToast, setShowToast] = useState(false)




  useEffect(() => {
    getData();
  }, [])

  const formatPrice = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  const getData = () => {
    const { name, category, status, minPrice, maxPrice } = formData;
    axios
      .get(
        `https://api-car-rental.binaracademy.org/customer/v2/car `
      )
      //&maxPrice=${maxPrice}
      .then((res) => setData(res.data.cars))
      .catch((err) => setErr(err.message));

    // setTimeout(() => {
    //   setErr("");
    // }, 4000);
  };

  const handleModal = (id) => {
    console.log('klik')
    setIsShown(true)
    setModalId(id)
  }

  const handleClose = (id) => {
    setIsShown(false)
    setModalId(null)
  }

  const handleDelete = (id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY4ODk5Mzk3M30.nKJbi0qYrrXvWgXrjB4TD8RcfcTLYHueOzmZN2bE9t4",
      },      
    }

    axios.delete(`https://api-car-rental.binaracademy.org/admin/car/${id}`, config)
    // {headers}
    .then(res => {
      setIsShown(false)
      setModalId(null)

      getData()
      setShowToast(true)
      setTimeout(() =>{
        setShowToast(false)
      }, 3000)
    })
    .catch(err => console.log(err))
    // console.log('tes')
  }

  return (
    <div>
      {
        showToast &&  <Toast autohide>
        <Toast.Body className={variant === 'Dark' && 'text-white'}>Data Berhasil Dihapus</Toast.Body>
        </Toast>
      }
        <div>
          {isShown && modalId !== null && (
            <ModalDelete 
            show={isShown}
            modalId={modalId} 
            handleClose={handleClose}
            handleDelete={handleDelete} />
          )}
      </div>
        <Row className='mb-4'>
          <Col className='d-flex align-items-center'>
            <h2 className='font-title-cms mb-0'>List Car</h2>
          </Col>
          <Col className='text-end'>
            <Button className='btn-add-car' onClick={() => navigate('/#')}>
              Add New Car
            </Button>
          </Col>
        </Row>
        <div className="container-filter-btn d-flex pt-2 pb-4">
          <Button className='btn-choose-filter active'>
            All
          </Button>
          <Button className='btn-choose-filter'>
            2 - 4 people
          </Button>
          <Button className='btn-choose-filter'>
            4 - 6 people
          </Button>
          <Button className='btn-choose-filter'>
            6 - 8 people
          </Button>
        </div>
        <div className="mx-auto">
        <Row>{
          data.map((item, index) => {
            return (
              <Col key={index} md={4} className="pb-4">
                <Card className='card card-list-car'>
                  <Card.Img className='img-car' alt={item.name} src={item.image}/>
                  <div className='px-0 pb-0'>
                    <h2 className='txt-name-car' tag="h2">
                      {item.name}
                    </h2>
                    <h3 className="txt-price-car mb-3">
                      {formatPrice(item.price)} / hari
                    </h3>
                    <p className='txt-more-info mb-3'>
                      <i className="fa fa-user-o pe-2" aria-hidden="true"></i> 6-8 people
                    </p>
                    <p className='txt-more-info mb-4'>
                      <i className="fa fa-user-o pe-2" aria-hidden="true"></i> 6-8 people
                    </p>
                    <Row className='px-1'>
                      <Col className="px-2">
                        <Button className='btn-delete-car' onClick={() => handleModal(item.id)}>
                          <i className="fa fa-trash pe-2" aria-hidden="true"></i> Delete
                        </Button>
                      </Col>
                      <Col className="px-2">
                        <Button className='btn-edit-car'>
                          <i className="fa fa-pencil-square-o pe-2" aria-hidden="true"></i> Edit
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            )
          })
        }</Row>
        </div>
    </div>
  );
};

export default AdminDashboard;
