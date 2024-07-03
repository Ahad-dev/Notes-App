import Note from "../models/noteModel.js";


//Create a Note
export const createNote = async (req,res) => {
    const { title, description,tags } = req.body;
    try{
        const note = await Note.create({title,description,tags, user:req.user._id});
        if(note){
            return res.status(201).json(note);
        }
        }catch(err){
            return res.status(500).json({error:err.message});
        }
};

//Get all notes
export const getNotes = async (req,res) => {
    try{
        const notes = await Note.find({user:req.user._id});
        if(notes){
            return res.status(200).json(notes);
        }
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};

//Get a notes of Partiular User
export const getUserNote = async (req,res) => {
    
    try{
        const notes = await Note.find({user:req.user._id});
        if(notes){
            return res.status(200).json({notes,user:req.user});
        }
        else{
            return res.status(404).json({msg:"Note not found",user:req.user});
        }
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};

//update the Notes
export const updateNote = async (req,res) => {
    const { title, description,tags } = req.body;
    try{
        const note = await Note.findById(req.params.id);
        if(note){
            note.title = title;
            note.description = description;
            note.tags = tags;
            const updatedNote = await note.save();
            return res.status(201).json(updatedNote);
        }
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};

//delete user
export const deleteNote = async (req,res) => {
    console.log(req.params.id);
    try{
        const note = await Note.findByIdAndDelete(req.params.id);
        console.log(note)
        return res.status(200).json({msg:"Note Deleted"});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};

//Pin the notes
export const pinOrUnpinNote = async (req,res) => {
    try{
        const note = await Note.findById(req.params.id);
        if(note){
            note.isPinned = !note.isPinned;
            const updatedNote = await note.save();
            return res.status(201).json(updatedNote);
        }
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};

//Unpin Task