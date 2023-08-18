import React from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { Navbar } from "react-bootstrap";
import '../assets/css/layout.css';
import { SidebarContext } from '../context/SidebarProvider';
import { Link } from 'react-router-dom';
import iconhome from '../assets/img/fi_home.svg';
import iconcar from '../assets/img/fi_truck.svg';
import { useContext } from "react";


const SideBar = () => {
  const { minimized } = useContext(SidebarContext)
  const location = useLocation()

  return (
    <aside className={`sidebar ${minimized ? 'minimized' : ''}`}>
      <div className="sidebar-blue">
        <Navbar>
          <div className='my-2'>
            <div className="d-flex">
            <div className='square-logo my-2 mx-4'/>
            </div>
          <div>
            <NavLink to='/dashboard' className="nav-link">
                <div style={{ width: '35px', marginBottom: '20px', marginTop: '30px' }} >
                <img src={iconhome} alt='Home Icon' className=' my-2 mx-4'  />
                <p className="text-sidebar mx-2">Dashboard</p>
              </div>
            </NavLink>
            <NavLink to='/list-cars' className="nav-link">
                <div style={{ width: '35px', marginBottom: '20px'}} >
                <img src={iconcar} alt='Car Icon' className=' my-2 mx-4'  />
                <p className="text-sidebar mx-2">Cars</p>
              </div>
            </NavLink>
            </div>
            </div>
        </Navbar>
      </div>
      <div className="white-sidebar">
      <div className="cms-logo">
      </div>
      <div className="text-white-sidebar">
      {location.pathname === '/dashboard' && (
          <div>
            <p className="title-white-sidebar">DASHBOARD</p>
            <p className="desc-white-sidebar">Dashboard</p>
          </div>
        )}
        {location.pathname === '/list-cars' && (
          <div>
            <p className="title-white-sidebar">CARS</p>
            <p className="desc-white-sidebar">List Car</p>
          </div>
        )}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
