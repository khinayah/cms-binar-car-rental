import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/css/form-car.css'
import Form from 'react-bootstrap/Form';
import {
    Row, Col,
    Button,
    Card,
  } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { Toast } from 'react-bootstrap';



const AdminAddCar = () => {
  
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [photo, setPhoto] = useState(null)
    const {id} = useParams()
    const [showToast, setShowToast] = useState(false)

    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
                access_token : localStorage.getItem('admin_token')
        }    
    }

    useEffect(() => {
        if (id) {
            axios.get(`https://api-car-rental.binaracademy.org/admin/car/${id}`, config)
            .then(res => 
              console.log(res.data.cars))
            .catch(err => {
              console.log(err)
            })
        }
    }, [id])


    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangePrice = (e) => {
        setPrice(e.target.value)
    }

    const handleChangeCategory = (e) => {
        setCategory(e.target.value)
    }

    const handleChangePhoto = (e) => {
        setPhoto(e.target.files[0])
        console.log(photo)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true)

        const formData = new FormData()
        formData.append('name', name)
        formData.append('category', category)
        formData.append('price', parseInt(price))
        formData.append('status', false)
        formData.append('image', photo) 


        axios.post(`https://api-car-rental.binaracademy.org/admin/car`, formData, config)
        .then(res => {
          setIsLoading(false)
          setShowToast(true)
          console.log(res)
          navigate('/list-cars')
        })
        .catch(err => {
          setIsLoading(false)
          console.log(err)
        })  
    }
    
    return (
        <>
        {
          isLoading ? ( <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
          ) : (
        <Form onSubmit={handleSubmit}>
        <div className='container-form-add d-flex flex-column justify-content-between'>
          <Card className='card card-form-container'>
            <Card.Body className='p-0'>
              <Form.Group className="form-group-input d-flex">
                <Form.Label for="namaMobil" className='label-input-form d-flex align-items-center mb-0'>
                  Nama/Tipe Mobil<sup className='sup-star'>*</sup>
                </Form.Label>
                <input id="namaMobil" name='name' value={name} onChange={handleChangeName} className="input-field-form" placeholder="Input Nama/Tipe Mobil" type="text"/>
              </Form.Group>
              <Form.Group className="form-group-input d-flex">
                <Form.Label for="hargaMobil" className='label-input-form d-flex align-items-center mb-0'>
                  Harga<sup className='sup-star'>*</sup>
                </Form.Label>
                <input id="hargaMobil" name="price" value={price} onChange={handleChangePrice} className="input-field-form" placeholder="Input Harga Sewa Mobil" type="number"/>
              </Form.Group>
              <Form.Group className="form-group-input d-flex">
                <Form.Label for="fotoMobil" className='label-input-form d-flex align-items-center mb-0'>
                  Foto<sup className='sup-star'>*</sup>
                </Form.Label>
                <div>
                  <input id="fotoMobil" name="Foto" onChange={handleChangePhoto} className="input-field-form" placeholder="Upload Foto Mobil" type="file"/>
                  <Form.Text className='form-text-info mb-0' tag="p">
                    File size max. 2MB
                  </Form.Text>
                </div>
              </Form.Group>
              <Form.Group className="form-group-input d-flex">
                <Form.Label for="fotoMobil" className='label-input-form d-flex align-items-center mb-0'>
                  Kategori<sup className='sup-star'>*</sup>
                </Form.Label>
                <div className='container-selectbox'>
                  <Form.Select id="kategoriMobil" onChange={handleChangeCategory} value={category} name="Kapasitas" className="input-field-form select">
                  <option>Pilih Kategori Mobil</option>
                  <option value="small">2 - 4 Orang</option>
                  <option value="medium">4 - 6 Orang</option>
                  <option value="large">6 - 8 Orang</option>
                  </Form.Select>
                  <div className='wrapper-down-arrow d-flex align-items-center'><i className="fa fa-chevron-down" aria-hidden="true"></i></div>
                  
                </div>
              </Form.Group>
              <Form.Group className="form-group-input d-flex">
                <Form.Label for="createdAt" className='label-input-form d-flex align-items-center mb-0'>
                  Created At
                </Form.Label>
                <div>
                  <p>-</p>
                </div>
              </Form.Group>
              <Form.Group className="form-group-input d-flex">
                <Form.Label for="updatedAt" className='label-input-form d-flex align-items-center mb-0'>
                  Updated At
                </Form.Label>
                <div>
                  <p>-</p>
                </div>
              </Form.Group>
            </Card.Body>
          </Card>
          <div className='container-action-btn-form d-flex pb-3'>
            <Button className='btn-cancel' type='button' onClick={() => navigate('/list-cars')}>Cancel</Button>
            <Button className='btn-submit' type='submit'>Save</Button>
          </div>
        </div>
      </Form>
          )}
        </>
    )
}

export default AdminAddCar