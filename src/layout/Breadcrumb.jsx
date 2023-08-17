import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Bread = ({ id }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const renderDashboardBreadcrumb = (
        <Breadcrumb.Item as={Link} to="/dashboard">Dashboard</Breadcrumb.Item>
    );

    const renderCarsBreadcrumb = (
        <Breadcrumb.Item as={Link} to="/list-cars">Cars</Breadcrumb.Item>
    );

    const renderListCarBreadcrumb = (
        <Breadcrumb.Item as={Link} to="/list-cars">List Car</Breadcrumb.Item>
    );

    return ( 
        <Breadcrumb style={{ '--bs-breadcrumb-divider': "'>'" }}>
            {location.pathname === '/dashboard' ? (
                <>
                    {renderDashboardBreadcrumb}
                    <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                </>
            ) : null}

            {location.pathname === '/list-cars' ? (
                <>
                    {renderCarsBreadcrumb}
                    <Breadcrumb.Item active>List Car</Breadcrumb.Item>
                </>
            ) : null}

            {location.pathname === '/list-cars/add-car' ? (
                <>
                    {renderCarsBreadcrumb} <>&nbsp;&nbsp;{'>'}&nbsp;&nbsp;</>
                    <span onClick={() => navigate('/list-cars')}> 
                      {renderListCarBreadcrumb}
                      </span><>&nbsp;&nbsp;{' > '}&nbsp;&nbsp;</>
                    <Breadcrumb.Item active>
                        Add Car
                    </Breadcrumb.Item>
                </>
            ) : null}

            {location.pathname.includes('/list-cars/edit-car/') ? (
                <>
                    {renderCarsBreadcrumb} <>&nbsp;&nbsp;{'>'}&nbsp;&nbsp;</>
                    <span onClick={() => navigate('/list-cars')}> 
                      {renderListCarBreadcrumb}
                      </span><>&nbsp;&nbsp;{' > '}&nbsp;&nbsp;</>
                    <Breadcrumb.Item active>Edit Car</Breadcrumb.Item>
                </>
            ) : null}
        </Breadcrumb>
    );
}

export default Bread;
