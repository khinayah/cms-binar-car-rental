import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons CSS

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [chart, setChart] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("2023-07");
  const [err, setErr] = useState("");

  useEffect(() => {
    getData();
    getChart();
  }, []);

  const monthsAndYears = [
    { value: "2023-01", label: "Januari - 2023" },
    { value: "2023-02", label: "Februari - 2023" },
    { value: "2023-03", label: "Maret - 2023" },
    { value: "2023-04", label: "April - 2023" },
    { value: "2023-05", label: "Mei - 2023" },
    { value: "2023-06", label: "Juni - 2023" },
    { value: "2023-07", label: "Juli - 2023" },
    { value: "2023-08", label: "Agustus - 2023" },
    { value: "2023-09", label: "September - 2023" },
    { value: "2023-10", label: "Oktober - 2023" },
    { value: "2023-11", label: "November - 2023" },
    { value: "2023-12", label: "Desember - 2023" },
  ];

  

  const getChart = () => {
    if (selectedMonth) {
      axios
        .get(
          `https://api-car-rental.binaracademy.org/admin/order/reports?from=${selectedMonth}-01&until=${selectedMonth}-31`,
          {
            headers: {
              access_token: localStorage.getItem("admin_token"),
            },
          }
        )
        .then((resChart) => {
          console.log("");
          setChart(resChart.data);
          // console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };


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

//   console.log("chart", chart);
  const labels = chart.map((item) => item.day);
  const barData = chart.map((item) => item.orderCount);

    // console.log("data", data);

  return (
    <div>
      <Form.Select
        onChange={changeMonth}
        aria-label="Default select example"
        style={{ display: "inline-block", width: "auto" }}
      >
        <option className="form-option" value={"2023-07"}>
          Pilih Bulan
        </option>
        {monthsAndYears.map((opt) => (
          <option value={opt.value}>{opt.label}</option>
        ))}
      </Form.Select>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "Data",
              data: barData,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        }}
        options={{ responsive: true }}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th onClick={() => handleSort("UserEmail")}>
              User Email{" "}
              {sortColumn === "UserEmail" && (
                <i
                  className={`bi bi-arrow-${sortDirection}`}
                  style={{ marginLeft: "0.25rem" }}
                ></i>
              )}
            </th>
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
    </div>
  );
};

export default AdminDashboard;
