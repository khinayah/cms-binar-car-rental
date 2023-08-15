import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import "../assets/css/layout.css"
import { useSidebar } from '../context/SidebarProvider';
import { useSearch } from '../context/SearchProvider';
import { useLocation, useNavigate } from 'react-router-dom';



const Header = () => {
    const { updateSearchTerm } = useSearch()
    const role = localStorage.getItem('role')
    const [inputValue, setInputValue] = useState('')
    const { toggleSidebar } = useSidebar()
    const location = useLocation()
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    window.location.replace('/')
  }

  const handleSearch = () => {
    const isListCarPage = location.pathname === '/list-cars'
        if (isListCarPage) {
            updateSearchTerm(inputValue)
        } else {
          updateSearchTerm(inputValue)
          navigate('/list-cars');
        }
  }

  return (
    <div className='header-nav d-flex justify-content align-items-center'>
        <button className="bi bi-list toggle-button" onClick={toggleSidebar}></button>
        <div className='d-flex justify-content-end align-items-center'>
        <div className='search-container'>
          <InputGroup>
            <InputGroup.Text>
              <i className='bi bi-search'></i>
            </InputGroup.Text>
            <FormControl
              style={{ border: 'none' }}
              type='text'
              placeholder='Search'
              value={inputValue}
              onChange={handleInputChange}
            />
          </InputGroup>
          <Button
            className={`search-button`}
            variant='primary'
            onClick={handleSearch}
          >
            Search
          </Button>
          </div>
        </div>
      <Dropdown>
        <Dropdown.Toggle style={{backgroundColor: "white", color: "black", border: "none"}}>
          {`Hai, ${role}`}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default Header;
