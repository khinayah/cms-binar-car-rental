import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';




const AdminFormCar = () => {
    const [data, setData] = useState ({
        name: "",
        category: "",
        status: false,
        minPrice: 0,
        maxPrice: 0,
    })
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [photo, setPhoto] = useState(null)
    const {id} = useParams()

    // const headers = {}
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY4ODk5Mzk3M30.nKJbi0qYrrXvWgXrjB4TD8RcfcTLYHueOzmZN2bE9t4",
        },      
    }

    useEffect(() => {
        if (id) {
            axios.get(`https://api-car-rental.binaracademy.org/admin/car/${id}`, config)
            .then(res => console.log(res.data.cars))
            .catch(err => console.log(err))
        }
    }, [])


    const handleChangeName = (e) => {
        setName({...data, name: e.target.value})
    }

    const handleChangePrice = (e) => {
        setPrice({...data, name: e.target.value})
    }
    const handleChangeCategory = (e) => {
        setCategory({...data, name: e.target.value})
    }

    const handleChangePhoto = (e) => {
        // console.log(e.target.files[0])
        setPhoto(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('category', data.category)
        formData.append('price', parseInt(data.price))
        formData.append('status', false)
        formData.append('image', data.photo)


        if(!id) {
            axios.post(`https://api-car-rental.binaracademy.org/admin/car`, formData, config)
        // {headers}
        .then(res => console.log(res))
        .catch(err => console.log(err))
        }
        else {
            axios.put(`https://api-car-rental.binaracademy.org/admin/car/${id}`, formData, config)
        // {headers}
        .then(res => {
            let car = data.find((item)=> item.id === currentId)
                car.name = data.name
                setData([...data])
            console.log(res)
        })
        .catch(err => console.log(err))
        }


    }
    

    return (
        <>
        <div class="form-container">
            <form class="my-form">
                <div class="form-group">
                    <label for="name">Name/Tipe Mobil</label>
                    <input type="text" name='name' value={data.name} onChange={handleChangeName}  />
                </div>
                <div class="form-group">
                    <label >Harga</label>
                    <input type="text" value={price} onChange={handleChangePrice} />
                </div>
                <div class="form-group">
                    <label >Foto</label>
                    <input type="file"  onChange={handleChangePhoto} />
                </div>
                <div class="form-group">
                    <label>Kategori</label>
                    <input type='text' onChange={handleChangeCategory} value={category} />
                </div>
                <button type="submit" onClick={handleSubmit}>Save</button>
            </form>
        </div>
        </>
    )
}

export default AdminFormCar