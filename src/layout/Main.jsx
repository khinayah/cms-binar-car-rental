import React, { useContext, useState, useEffect } from 'react';
import Header from './Header';
import SideBar from './Sidebar';
import '../assets/css/index.css';
import { PrivateRoute } from '../routes';
import Bread from './Breadcrumb';
import { useParams } from 'react-router-dom';

const Layout = () => {
    
    const {id} = useParams()

  return (
    <div className='template-areas'>
      <SideBar />
      <div className='w-100'>
         <Header />
        <div className='bg-cms p-4'>
            <Bread id={id}/>
            <div>
                <PrivateRoute />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout;
