import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");
  const [cars, setCars] = useState({}); // Menyimpan data mobil dengan id sebagai kunci

  useEffect(() => {
    getData();
  }, []);

  const orderUrl = `https://api-car-rental.binaracademy.org/admin/v2/order`;

  const getData = async () => {
    try {
      const res = await axios.get(orderUrl, {
        headers: {
          access_token: localStorage.getItem("admin_token"),
        },
      });
      console.log("res", res)
      setData(res.data.orders);
      getAndSetCars(res.data.orders); // Panggil fungsi untuk mengambil data mobil
    } catch (err) {
      setErr(err.message);
    }
  };
  console.log("data", data)

  const getAndSetCars = async (orders) => {
    const carsData = {}; // Objek untuk menyimpan data mobil
    for (const order of orders) {
      try {
        const resCar = await axios.get(
          `https://api-car-rental.binaracademy.org/admin/order/${order.id}`,
          {
            headers: {
              access_token: localStorage.getItem("admin_token"),
            },
          }
        );
        const carData = resCar.data; // Data mobil
        carsData[order.id] = carData; // Simpan data mobil dengan id sebagai kunci
      } catch (err) {
        setErr(err.message);
      }
    }
    setCars(carsData); // Set data mobil ke state
    console.log("cars", cars)
  };

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
        {data.map((order, index) => {
          const car = cars[order.CarId] || {}; // Ambil data mobil berdasarkan id pesanan
          return (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.User.email}</td>
              <td>{car.name ? car.name : "Not available"}</td>
              <td>{new Date(order.start_rent_at).toLocaleDateString()}</td>
              <td>{new Date(order.finish_rent_at).toLocaleDateString()}</td>
              <td>{order.total_price}</td>
              <td>{car.category ? car.category : "Not available"}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default AdminDashboard;
