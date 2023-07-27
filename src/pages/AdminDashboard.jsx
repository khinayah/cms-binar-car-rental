import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/layout.css'
import {
  Row, Col,
  Button,
} from 'react-bootstrap';
import "../assets/css/dashboard.css"
import axios from 'axios';



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

  useEffect(() => {
    getData();
  }, [])

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

  return (
    <div>
        {/* <Header/> */}
        {/* <Sidebar/> */}
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
                <div className='card card-list-car'>
                  <img className='img-car' alt={item.name} src={item.image}/>
                  <div className='px-0 pb-0'>
                    <h2 className='txt-name-car' tag="h2">
                      {item.name}
                    </h2>
                    <h3 className="txt-price-car mb-3">
                      {/* {formatNumber(item.price)} / hari */}
                    </h3>
                    <p className='txt-more-info mb-3'>
                      <i className="fa fa-user-o pe-2" aria-hidden="true"></i> 6-8 people
                    </p>
                    <p className='txt-more-info mb-4'>
                      <i className="fa fa-user-o pe-2" aria-hidden="true"></i> 6-8 people
                    </p>
                    <Row className='px-1'>
                      <Col className="px-2">
                        <Button className='btn-delete-car'>
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
                </div>
              </Col>
            )
          })
        }</Row>
        </div>
    </div>
  );
};

export default AdminDashboard;
