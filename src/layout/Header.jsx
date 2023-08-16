import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import "../assets/css/layout.css"
import { SidebarContext } from '../context/SidebarProvider';
import { SearchContext } from '../context/SearchProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';


const Header = () => {
    const {setSearchValue} = useContext(SearchContext)
    const role = localStorage.getItem('role')
    const [inputSearch, setInputSearch] = useState('')
    const {toggleSidebar} = useContext(SidebarContext)
    const location = useLocation()
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        setInputSearch(event.target.value)
    }
    
    const handleLogout = () => {
      localStorage.removeItem('admin_token')
      window.location.replace('/')
  }

  const handleSearch = () => {
    const isListCarPage = location.pathname === '/list-cars'
        if (isListCarPage) {
          console.log(inputSearch)
          setSearchValue(inputSearch)
        } else {
          setSearchValue(inputSearch)
          navigate('/list-cars')
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
              value={inputSearch}
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
