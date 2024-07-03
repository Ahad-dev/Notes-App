import React from 'react'
import { Link } from 'react-router-dom'
import { nameInitials } from '../../utils/helper'
import { useNavigate } from 'react-router-dom'

const UserInfo = ({user}) => {
  const navigate = useNavigate();
  
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className='flex items-center gap-3' >
        <div className='p-3 rounded-full bg-slate-200'>
            {nameInitials(user)}
        </div>
        <div>
            <p className='text-lg font-semibold'>{user}</p>
            <Link to = '/login' onClick={handleLogout} className='underline text-slate-700'>Logout</Link>
        </div>
    </div>
  )
}

export default UserInfo