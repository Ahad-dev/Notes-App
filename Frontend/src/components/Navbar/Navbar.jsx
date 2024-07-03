import React,{useState} from 'react'
import UserInfo from '../userInfo/UserInfo'
import SearchBar from '../SearchBar/SearchBar'
import { isAuthenticated } from '../../services/auth'
const Navbar = ({user = "jane Will",handleSearch}) => {

  return (
    <div className='bg-white drop-shadow flex justify-between items-center px-6 py-2' >
        <h2 className='font-semibold text-xl py-2'>Notes</h2>
        {isAuthenticated()?
        (
          <>
          <SearchBar handleSearch={handleSearch} ></SearchBar>
          <UserInfo user = {user}></UserInfo>
          </>
        )  :(
          <div className='flex gap-3'>
            <a href='/login' className='underline'>Login</a>
            <a href='/signup' className='underline'>Signup</a>
          </div>
        )

      }
    </div>
  )
}

export default Navbar