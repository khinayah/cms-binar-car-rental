import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import "../assets/css/layout.css"

const Header = ({ onSearchNameChange }) => {
  const role = localStorage.getItem('role'); // Get the role from localStorage
  const [searchName, setSearchName] = useState('');
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.replace('/');
  }

  const handleSearch = () => {
    console.log('Search button clicked.')
    console.log('Search term:', searchName)
    setSearchButtonClicked(true)
    onSearchNameChange(searchName === '' ? null : searchName);
  }

  return (
    <div className='header-nav'>
        <div className='search-container'>
          <InputGroup>
            <InputGroup.Text>
              <i className='bi bi-search'></i>
            </InputGroup.Text>
            <FormControl
              style={{ border: 'none' }}
              type='text'
              placeholder='Search'
              value={searchName}
              onChange={(e) => {
                setSearchButtonClicked(false);
                setSearchName(e.target.value);
              }}
            />
          </InputGroup>
          <Button
            className={`search-button ${
              searchButtonClicked ? 'search-button-clicked' : ''
            }`}
            variant='primary'
            onClick={handleSearch}
          >
            Search
          </Button>
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
  );
};

export default Header;
