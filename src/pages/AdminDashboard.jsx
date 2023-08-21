import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ArrowUp } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/AdminDashboard.css";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [chart, setChart] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("2023-07");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("car%3Adesc")
  const [err, setErr] = useState("");

  useEffect(() => {
    getData();
    getChart;
  }, []);

  useEffect(() => {
    getData();
  }, [sort, page, pageSize]);

  useEffect(() => {
    getChart();
  }, [selectedMonth]);

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

  const changeMonth = (e) => {
    setSelectedMonth(e.target.value);
    console.log("selectedMonth", selectedMonth);
    // getChart(selectedMonth);
  };

  const changePageSize = (e) => {
    setPageSize(e.target.value);
  };

  const changePage = (e) => {
    setPage(e.target.value);
  };

  const handleSort = (type) => {
    setSort(type)
  }

  // Membangun data untuk grafik
  console.log("chart", chart);
  let tableApi = `https://api-car-rental.binaracademy.org/admin/v2/order?sort=${sort}&page=${page}&pageSize=${pageSize}`;

  const getData = async () => {
    console.log("sort" ,sort)
    try {
      const res = await axios.get(tableApi, {
        headers: {
          access_token: localStorage.getItem("admin_token"),
        },
      });
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
      <p>Month</p>
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
      <p>
        <b>Dashboard</b>
      </p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="head-container">
                <div className="head-text">No</div>
              </div>
            </th>
            <th>
              <div className="head-container">
                <div className="head-text">User Email</div>
                <div className="head-icon">
                  <div onClick={() => handleSort("user_email%3Aasc")}>
                    <img
                      src="/src/assets/img/ArrowUp.svg"
                      className="img-icon"
                      alt=""
                    />
                  </div>
                  <div  onClick={() => handleSort("user_email%3Adesc")}>
                    <img
                      src="/src/assets/img/ArrowDown.svg"
                      className="img-icon"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </th>
            <th>
              <div className="head-container">
                <div className="head-text">Car</div>
                <div className="head-icon">
                  <div onClick={() => handleSort("car_name%3Aasc")}>
                    <img
                      src="/src/assets/img/ArrowUp.svg"
                      className="img-icon"
                      alt=""
                    />
                  </div>
                  <div onClick={() => handleSort("car_name%3Adesc")}>
                    <img
                      src="/src/assets/img/ArrowDown.svg"
                      className="img-icon"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </th>
            <th>
              <div className="head-container">
                <div className="head-text">Start Rent</div>
                <div className="head-icon">
                  <div onClick={() => handleSort("start_rent_at%3Aasc")}>
                    <img
                      src="/src/assets/img/ArrowUp.svg"
                      className="img-icon"
                      alt=""
                    />
                  </div>
                  <div onClick={() => handleSort("start_rent_at%3Adesc")}>
                    <img
                      src="/src/assets/img/ArrowDown.svg"
                      className="img-icon"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </th>
            <th>
              <div className="head-container">
                <div className="head-text">Finish Rent</div>
                <div className="head-icon">
                  <div onClick={() => handleSort("finish_rent_at%3Aasc")}>
                    <img
                      src="/src/assets/img/ArrowUp.svg"
                      className="img-icon"
                      alt=""
                    />
                  </div>
                  <div onClick={() => handleSort("finish_rent_at%3Adesc")}>
                    <img
                      src="/src/assets/img/ArrowDown.svg"
                      className="img-icon"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </th>
            <th>
              <div className="head-container">
                <div className="head-text">Price</div>
                <div className="head-icon">
                  <div onClick={() => handleSort("price%3Aasc")}>
                    <img
                      src="/src/assets/img/ArrowUp.svg"
                      className="img-icon"
                      alt=""
                    />
                  </div>
                  <div onClick={() => handleSort("price%3Adesc")}>
                    <img
                      src="/src/assets/img/ArrowDown.svg"
                      className="img-icon"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </th>
            <th>
              <div className="head-container">
                <div className="head-text">Category</div>
                <div className="head-icon">
                  <div onClick={() => handleSort("category%3Aasc")}>
                    <img
                      src="/src/assets/img/ArrowUp.svg"
                      className="img-icon"
                      alt=""
                    />
                  </div>
                  <div onClick={() => handleSort("category%3Adesc")}>
                    <img
                      src="/src/assets/img/ArrowDown.svg"
                      className="img-icon"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </th>
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
      <div className="select-container">
        <div className="select-parent">
          <h6>Limit</h6>
          <select name="" id="" onChange={changePageSize}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="select-parent">
          <h6>Jump to page</h6>
          <select name="" id="" onChange={changePage}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
