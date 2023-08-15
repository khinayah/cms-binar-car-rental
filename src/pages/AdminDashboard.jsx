import React from 'react';
const AdminChart = () => {
  const [data, setData] = useState([]);
  

  const getData = () => {
    const config = {
      headers: {
          access_token : localStorage.getItem('admin_token')
      }
  }

    let apiUrl = `https://api-car-rental.binaracademy.org/admin/v2/order`

    axios
      .get(apiUrl, config)
      .then((res) => setData(res.data.cars))
      .catch((err) => setErr(err.message));

    // setTimeout(() => {
    //   setErr("");
    // }, 4000);
  }

    return ( 
    <>
    Chart
    </>
     );
}
 
export default AdminChart;