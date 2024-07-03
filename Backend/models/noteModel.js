import { Schema,model } from "mongoose";

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags:[
        {type:String}
    ],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    isPinned:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true
});
const Note = model("Note", noteSchema);

export default Note;