import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";


const SearchBar = ({handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };
  const clearSearch = ()=>{
    setSearchTerm("");
  }
  return (
    <div className='flex justify-center items-center relative'>
        <input type="text" placeholder='Search...' className='rounded-lg bg-transparent border-[1px] border-black/10 p-3 outline-none flex-1 w-96' value ={searchTerm} onChange={handleChange} />
        <div className='absolute top-3 right-2 flex gap-3 justify-center items-center'>

       {searchTerm && <RxCross2 onClick={clearSearch} cursor="pointer" size={22}></RxCross2>}
       <IoSearch className='' cursor="pointer"  size={22}></IoSearch>
        </div>
    </div>
  )
}

export default SearchBar