import React, { useContext, useState, useEffect } from 'react';
import Header from './Header';
import SideBar from './Sidebar';
import '../assets/css/index.css';
import { AppPrivateRoute } from '../routes';
import { LayoutContext } from '../context/LayoutProvider';

const Layout = () => {
//   const { sidebar, header, setHeader, setSidebar } = useContext(LayoutContext);
//   const [showHeader, setShowHeader] = useState(header);
//   const [showSidebar, setShowSidebar] = useState(sidebar);

//   useEffect(() => {
//     setSidebar(true)
//     setHeader(true)
//     setShowHeader(header);
//     setShowSidebar(sidebar);
//   }, [header, sidebar]);

  return (
    <div className='template-areas'>
      <SideBar />
      <div className='w-100'>
         <Header />
        <div className='bg-cms p-4'>
          <AppPrivateRoute />
        </div>
      </div>
    </div>
  )
}

export default Layout;
