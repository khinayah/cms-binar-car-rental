import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {
    Button,
} from 'react-bootstrap';


const Header = () => {
  const [data, setData] = useState([])


    return (
        <div className='header-nav'>
            <Button className='btn-collapse' size='sm' outline>
                <i className='fa fa-bars'></i>
            </Button>
                <Dropdown>
                <Dropdown.Toggle>
                    
                </Dropdown.Toggle>
                
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {
                        localStorage.removeItem("ACCESS_TOKEN")
                        window.location.replace('/')
                    }}>Logout</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
        </div>
    )
}

export default Header