const API_URL = 'http://localhost:5000/api/note'
export const getNotes = async(token)=>{
    try{
        const response = await fetch(`${API_URL}/get`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':token
            }
            
        })
        

        return response.json()
    }catch(err){
        throw Error(err.message)
    }

}

//Api request for create note
export const createNote = async(note,token)=>{
    try{
        const response = await fetch(`${API_URL}/create`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':token
            },
            body:JSON.stringify(note)

        })
        return response.json();

    }catch(err){
        throw Error(err.message)

    }
}

export const deleteNote = async(id,token)=>{
    try{
        const response = await fetch(`${API_URL}/delete/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':token
            }
        })
        return response.json();
    }catch(err){
        throw Error(err.message)
    }

}

export const updateNote = async(note,token)=>{
    try{
        const response = await fetch(`${API_URL}/update/${note._id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':token
            },
            body:JSON.stringify(note)
        })
        return response.json();
    }catch(err){
        throw Error(err.message)
    }

}

export const pinNote = async(id,token)=>{
    try{
        const response = await fetch(`${API_URL}/pin/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':token
            }
        })
        return response.json();
    }catch(err){
        throw Error(err.message)
    }
}