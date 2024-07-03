import React,{useState} from 'react'
import TagBadge
 from '../TagBadge/TagBadge'

const TagMaker = ({tags,setTags}) => {
    const [tagSearch, setTagSearch] = useState("")

    const handleClick  =()=>{
        setTags([...tags,tagSearch])
        setTagSearch('');
    }
    const handleCross = (tag)=>{
        setTags(tags.filter((t)=>t !==tag));

    }
    const onKeyDown = (event)=>{
        if(event.key === 'Enter'){
            handleClick();
        }
    }
  return (
    <div className='flex flex-col gap-4'>
        <div className='flex gap-2 justify-center items-center  '>
           {tags.length>0? tags.map((tag,i)=><TagBadge key={i} tag={tag} handleCross={handleCross}></TagBadge>):'' }
        </div>
            <input type="text" placeholder='Tag' className='border-[1px] border-black/20 outline-none p-3 rounded-lg' value={tagSearch} onChange={({target})=>setTagSearch(target.value)} onKeyDown={onKeyDown} />
            <button onClick={handleClick} className='bg-orange-700 py-2 px-3 text-white font-semibold rounded-lg'>Add Tag</button>
    </div>
  )
}

export default TagMaker