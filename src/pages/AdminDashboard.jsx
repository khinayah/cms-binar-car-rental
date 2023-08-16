import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';

const AdminDashboard = () => {
    const [data, setData] = useState([]);
    const [err, setErr] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(
                `https://api-car-rental.binaracademy.org/admin/v2/order?sort=created_at%3Adesc&page=1&pageSize=10`,
                {
                    headers: {
                        access_token: localStorage.getItem("admin_token"),
                    },
                }
            );
            setData(res.data.orders);
        } catch (err) {
            setErr(err.message);
        }
    };

    console.log("data", data);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>No</th>
                    <th>User Email</th>
                    <th>Car</th>
                    <th>Start Rent</th>
                    <th>Finish Rent</th>
                    <th>Price</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {data.map((order, index) => (
                    <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.User.email}</td>
                        <td>{order.Car ? order.Car.name : "Not available"}</td>
                        <td>{new Date(order.start_rent_at).toLocaleDateString()}</td>
                        <td>{new Date(order.finish_rent_at).toLocaleDateString()}</td>
                        <td>{order.total_price}</td>
                        <td>{order.Car ? order.Car.category : "Not available"}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default AdminDashboard;
