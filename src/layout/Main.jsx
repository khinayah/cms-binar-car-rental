import React from 'react';
import Header from './Header';
import SideBar from './Sidebar';
import AdminDashboard from '../pages/AdminDashboard';
import '../assets/css/index.css'

const Layout = () => {
    return (
        <div className='template-areas'>
            <SideBar />
            <div className='w-100'>
                <Header />
                <div className='bg-cms p-4'>
                    <AdminDashboard/>
                </div>
            </div>
        </div>
    )
}

export default Layout