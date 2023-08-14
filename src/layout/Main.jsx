import React, { useState } from 'react';
import Header from './Header';
import SideBar from './Sidebar';
import '../assets/css/index.css'
import FormCar from '../pages/AdminFormCar'
import AdminListCar from '../pages/AdminListCar';


const Layout = () => {
    const [searchName, setSearchName] = useState('');

    const handleSearchNameChange = (searchValue) => {
        setSearchName(searchValue)
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
                    <AdminListCar searchName={searchName} 
                    onSearchNameChange={handleSearchNameChange}/> 
        </div>
      </div>
    </div>
    )
}

export default Layout