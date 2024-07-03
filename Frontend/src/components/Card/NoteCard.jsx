import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { LuPin } from "react-icons/lu";
import { MdPushPin } from "react-icons/md";

import { FaRegEdit } from "react-icons/fa";
import moment from "moment"; // Import moment.js

const NoteCard = ({note,handleDelete,onUpdateClick,handlePin}) => {
  return (
    <>
      <div className="flex justify-between gap-5 p-5 rounded-lg border-[1px] border-black/10 hover:shadow-lg">
        <div className="space-y-4">
          <h1 className="font-bold text-lg">{note.title}</h1>
          <p>{note.description}</p>
          <p className="text-gray-400">{ moment(note.createdAt).format('DD MMMM YYYY')}</p>
          <div className="flex flex-wrap gap-3">
            {note.tags.map((tag,i)=><span key={i} className="bg-blue-500 text-white rounded-md p-1 text-xs">{tag}</span>)}
            
          </div>
        </div>
        <div className="flex justify-between items-center flex-col">
          <div className="flex gap-3 justify-center items-center ">
              {note.isPinned ?<MdPushPin onClick = {()=>handlePin(note._id)} size={22} className="text-blue-500 cursor-pointer" />:<LuPin size={22} onClick = {()=>handlePin(note._id)} className="text-blue-500 cursor-pointer" />}
            <FaRegEdit size={22} onClick={()=>onUpdateClick(note._id)} className="text-blue-500 cursor-pointer" />
          </div>
          <MdDeleteOutline
          onClick={()=>handleDelete(note._id)}
            size={22}
            className="text-red-500 cursor-pointer hover:text-red-400"
          />
        </div>
      </div>

    </>
  );
};

export default NoteCard;
