import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../assets/css/layout.css'
import {
  Row, Col,
  Button,
  Card,
} from 'react-bootstrap';
import "../assets/css/list-cars.css"
import axios from 'axios';
import ModalDelete from '../components/ModalDelete';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchProvider';


const AdminListCar = () => {
  const { searchTerm } = useSearch()
  let initalForm ={
    name: "",
    category: "",
    status: false,
    minPrice: 0,
    maxPrice: 0,
  }
  let kategori = ""
  const [data, setData] = useState([])
  const [err, setErr] = useState("")
  const [formData, setFormData] = useState(initalForm)
  const [modalId, setModalId] = useState(null)
  const [isShown, setIsShown] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate()
  const [filterCategory, setFilterCategory] = useState(null)
  



  useEffect(() => {
    getData();
  }, [searchTerm])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    };
  
    const formattedDate = date.toLocaleDateString('en-US', options).replace(",", "");
    return formattedDate
  }

  const formatPrice = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    });
  
    const formattedPrice = formatter.format(number);
  
    return `Rp ${formattedPrice.substring(3)}`;
  }
  

  const getData = () => {
    const config = {
      headers: {
          access_token : localStorage.getItem('admin_token')
      }
  }

    let apiUrl = `https://api-car-rental.binaracademy.org/admin/v2/car`

    if (searchTerm) {
      apiUrl += `?name=${searchTerm}`;
    }
    axios
      .get(apiUrl, config)
      .then((res) => setData(res.data.cars))
      .catch((err) => setErr(err.message));
  }


  const handleModal = (id) => {
    console.log('klik')
    setIsShown(true)
    setModalId(id)
  }

  const handleClose = (id) => {
    setIsShown(false)
    setModalId(null)
  }

  const handleEdit = (id) => {
    navigate(`/list-cars/edit-car/${id}`)
  }

  const handleDelete = (id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        access_token : localStorage.getItem('admin_token')
      },
    }

    axios.delete(`https://api-car-rental.binaracademy.org/admin/car/${id}`, config)
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
            <Button className='btn-add-car' onClick={() => navigate('/list-cars/add-car')}>
              Add New Car
            </Button>
          </Col>
        </Row>
        <div className="container-filter-btn d-flex pt-2 pb-4">
          <Button className={`btn-choose-filter ${filterCategory === null ? "active" : ""}`}
          onClick={() => setFilterCategory(null)}>
            All
          </Button>
          <Button className={`btn-choose-filter ${filterCategory === "small" ? "active" : ""}`}
          onClick={() => setFilterCategory("small")}>
            2 - 4 people
          </Button>
          <Button className={`btn-choose-filter ${filterCategory === "medium" ? "active" : ""}`}
          onClick={() => setFilterCategory("medium")}>
            4 - 6 people
          </Button>
          <Button className={`btn-choose-filter ${filterCategory === "large" ? "active" : ""}`}
          onClick={() => setFilterCategory("large")}>
            6 - 8 people
          </Button>
        </div>
        <div className="mx-auto">
        <Row>{
          data
          .filter(item => filterCategory === null || item.category === filterCategory)
          .map((item, index) => {
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
                    <i class="bi bi-people"></i>

                      {
                        (() => {
                          switch (item.category) {
                            case "small":   return " 2-4 people";
                            case "medium": return " 4-6 people";
                            case "large":  return " 6-8 people";
                            // default:      return "#FFFFFF";
                          }
                        })()
                      }
                      <i className="fa fa-user-o pe-2" aria-hidden="true"></i>{kategori}
                    </p>
                    <p className='txt-more-info mb-4'>
                    <i class="bi bi-clock"></i>
                      <i className="fa fa-user-o pe-2" aria-hidden="true"></i> Updated at {formatDate(item.updatedAt)}
                    </p>
                    <Row className='px-1'>
                      <Col className="px-2">
                        <Button className='btn-delete-car' onClick={() => handleModal(item.id)}>
                          <i className="fa fa-trash pe-2" aria-hidden="true"></i> Delete
                        </Button>
                      </Col>
                      <Col className="px-2">
                        <Button className='btn-edit-car'>
                          <i className="fa fa-pencil-square-o pe-2" aria-hidden="true" onClick={() => handleEdit(item.id)}></i> Edit
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

export default AdminListCar;
