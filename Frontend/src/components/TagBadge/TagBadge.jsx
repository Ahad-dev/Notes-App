import React from 'react'
import { RxCross2 } from "react-icons/rx";


const TagBadge = ({tag,handleCross}) => {
  return (
    <div className='text-sm bg-green-500 text-white rounded-lg p-2 flex justify-center items-center gap-2'>{tag} <RxCross2 className='text-slate-800 cursor-pointer' onClick={()=>handleCross(tag)}></RxCross2></div>
  )
}

export default TagBadge