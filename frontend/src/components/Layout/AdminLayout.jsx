import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='w-full md:flex'>
        <div className='md:w-1/4 p-5'>
            <AdminSidebar/>
        </div>
        <div className='md:w-3/4 p-5'>
            <Outlet/>
        </div>

    </div>
  )
}

export default AdminLayout