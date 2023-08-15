import React from "react";
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import '../assets/css/layout.css';
import { useSidebar } from '../context/SidebarProvider';
import { Link } from 'react-router-dom';
import iconhome from '../assets/img/fi_home.svg';
import iconcar from '../assets/img/fi_truck.svg';

const SideBar = () => {
  const { minimized } = useSidebar()

  return (
    <aside className={`sidebar ${minimized ? 'minimized' : ''}`}>
      <div className="sidebar-blue">

        {/* <div className="cms-logo-container"> */}
        {/* <div className="cms-logo" style={{ marginLeft: '80px' }}></div> */}
        {/* </div> */}
        <Navbar>
          <div className='my-2'>
            <div className="d-flex">
            <div  className='logo  my-2 mx-4'>
            </div>
            {/* <div className="cms-logo"></div>     */}
            </div>
          <div>
            <NavLink to='/add-car' className="nav-link">
                <div style={{ width: '35px', marginBottom: '20px', marginTop: '30px' }} >
                <img src={iconhome} alt='Home Icon' className=' my-2 mx-4'  />
                <p className="text-sidebar mx-2">Dashboard</p>
              </div>
            </NavLink>
            <NavLink to='/list-cars' className="nav-link">
                <div style={{ width: '35px', marginBottom: '20px'}} >
                <img src={iconcar} alt='Home Icon' className=' my-2 mx-4'  />
                <p className="text-sidebar mx-2">Cars</p>
              </div>
            </NavLink>
            </div>
            </div>
        </Navbar>
      </div>
    </aside>
  );
};

export default SideBar;
