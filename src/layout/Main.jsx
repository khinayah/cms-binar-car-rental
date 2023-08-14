import React, { useState } from 'react';
import Header from './Header';
import SideBar from './Sidebar';
import AdminDashboard from '../pages/AdminDashboard';
import '../assets/css/index.css'
import FormCar from '../pages/FormCar'
import { AppPrivateRoute } from '../routes';


const Layout = () => {
    const [searchName, setSearchName] = useState('');

    const handleSearchNameChange = (searchValue) => {
        console.log('Search value changed:', searchValue);
        setSearchName(searchValue);
    }

      
    return (
        <div className='template-areas'>
            <SideBar />
            <div className='w-100'>
                <Header
                onSearchNameChange={handleSearchNameChange}
                searchName={searchName} 
                />
                <div className='bg-cms p-4'>
                    {/* <AppPrivateRoute> */}
                    <AdminDashboard searchName={searchName} 
                    onSearchNameChange={handleSearchNameChange}/> 
                    <FormCar/>          
                    {/* </AppPrivateRoute> */}
        </div>
      </div>
    </div>
    )
}

export default Layout