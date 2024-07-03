import express from 'express';
const router = express.Router();
import {createNote ,updateNote,deleteNote,getUserNote,pinOrUnpinNote} from "../controllers/noteController.js" 
import {isAuthenticated} from '../middlewares/authMiddleware.js';

router.post('/create',isAuthenticated,createNote);
router.put('/update/:id',isAuthenticated,updateNote);
router.put('/pin/:id',isAuthenticated,pinOrUnpinNote);
router.delete('/delete/:id',isAuthenticated,deleteNote);
router.get('/get',isAuthenticated,getUserNote);

export default router;