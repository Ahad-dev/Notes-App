import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Card/NoteCard";
import { IoMdAdd } from "react-icons/io";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";
import TagMaker from "../../components/TagMaker/TagMaker";
import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
  pinNote,
} from "../../services/api";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Home = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState({ title: "", description: "", tags: [] });
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState("Jane Will");
  const [isUpdate, setIsUpdate] = useState(false);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotes(token);
        console.log(data)
        setUser(data.user.name);
        setNotes(data.notes || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  const openModal = () => {
    setIsUpdate(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setNote({ title: "", description: "", tags: [] });
    setTags([]);
  };

  const handleAddTask = async () => {
    try {
      const newNote = await createNote(
        {
          title: note.title,
          description: note.description,
          tags,
        },
        token
      );
      setNotes((prevNotes) => [...prevNotes, newNote]);
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteNote(id, token);
      if (res) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (id) => {
    setIsUpdate(true);
    const noteToUpdate = notes.find((note) => note._id === id);
    setNote(noteToUpdate);
    setTags(noteToUpdate.tags);
    setIsOpen(true);
  };

  const handleUpdateTask = async () => {
    try {
      const updatedNote = await updateNote(
        {
          title: note.title,
          description: note.description,
          tags,
          _id: note._id,
        },
        token
      );

      setNotes((prevNotes) =>
        prevNotes.map((item) => (item._id === updatedNote._id ? updatedNote : item))
      );
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePin = async (id) => {
    try {
      const pinnedNote = await pinNote(id, token);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? pinnedNote : note))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // if (!notes.length) {
  //   return <p>Loading...</p>;
  // }
   // Sort the notes so that pinned notes appear first
   const sortedNotes = [...filteredNotes].sort((a, b) => b.isPinned - a.isPinned);

  return (
    <>
      <Navbar user={user} handleSearch={handleSearch} />
      <div className="flex justify-start gap-5 flex-wrap m-3">
        {sortedNotes.length > 0 ? (
          sortedNotes.map((note, i) => (
            <NoteCard
              key={i}
              note={note}
              handlePin={handlePin}
              handleDelete={handleDelete}
              onUpdateClick={handleUpdate}
            />
          ))
        ) : (
          <p>You have no Notes Yet</p>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Task Modal"
        ariaHideApp={false} // Ensure accessibility
      >
        <div className="flex flex-col gap-5">
          <RxCross2
            onClick={closeModal}
            className="absolute top-3 right-3 cursor-pointer"
            size={30}
          />
          <h2 className="text-2xl font-bold">{isUpdate ? "Update Task" : "Make Task"}</h2>
          <input
            placeholder="Title"
            type="text"
            className="font-bold px-2 py-3 outline-none text-2xl border-b-2 border-black/15 rounded-lg"
            value={note.title}
            onChange={({ target }) => setNote({ ...note, title: target.value })}
          />
          <textarea
            cols="30"
            rows="10"
            className="border-[1px] border-black/20 outline-none p-3"
            value={note.description}
            onChange={({ target }) => setNote({ ...note, description: target.value })}
            placeholder="Description"
          ></textarea>
          <TagMaker tags={tags} setTags={setTags} />
          <button
            type="button"
            className="bg-blue-500 py-4 px-2 text-center text-white font-bold rounded-lg"
            onClick={isUpdate ? handleUpdateTask : handleAddTask}
          >
            {isUpdate ? "Update Task" : "Add Task"}
          </button>
        </div>
      </Modal>
      <button
        className="p-4 bg-blue-500 rounded-full absolute right-5 bottom-5 hover:bg-blue-700"
        onClick={openModal}
      >
        <IoMdAdd className="text-white" size={30} />
      </button>
    </>
  );
};

export default Home;
