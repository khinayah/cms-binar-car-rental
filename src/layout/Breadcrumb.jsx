import React from 'react';
import { Breadcrumb } from 'react-bootstrap';


const Bread = () => {

    return ( 
        <Breadcrumb className="--bs-breadcrumb-divider: '>';" >
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active href="/list-cars">List Cars</Breadcrumb.Item>
        {/* <Breadcrumb.Item active>{id ? 'Edit Car' : 'Add Car'}</Breadcrumb.Item> */}
      </Breadcrumb>
     );
}
 
export default Bread;