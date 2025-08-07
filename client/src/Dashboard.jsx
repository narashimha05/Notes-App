import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);

  // 🔐 Redirect if not logged in
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  

  
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const res = await fetch("http://localhost:5000/notes", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();
      setNotes(data);
    };

    fetchNotes();
  }, [navigate]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  function handleSaveNote() {
    const token = localStorage.getItem("token");
    if (!title || !content || !token) return;

    if (editId) {
      // EDIT
      fetch(`http://localhost:5000/notes/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      })
        .then(res => res.json())
        .then(updatedNote => {
          const updatedNotes = [...notes];
          updatedNotes[editIndex] = updatedNote;
          setNotes(updatedNotes);
          resetForm();
        });
    } else {
      // ADD
      fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      })
        .then(res => res.json())
        .then(newNote => {
          setNotes([...notes, newNote]);
          resetForm();
        });
    }
  }

  function resetForm() {
    setTitle("");
    setContent("");
    setEditIndex(null);
    setEditId(null);
  }

  function handleEdit(index) {
    const note = notes[index];
    setTitle(note.title);
    setContent(note.content);
    setEditIndex(index);
    setEditId(note._id);
  }

  function handleDelete(id) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(() => {
        setNotes(notes.filter(note => note._id !== id));
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="dashOuter">
      <div className="dashNav">
        <ul className="nav">
           <li className="navList"><Link to="/">Home</Link></li>   
           {/* <li className="navList"><Link to="/login">Login</Link></li>   
           <li className="navList"><Link to="/signup">SignUp</Link></li> */}
          <li className="navListLog" onClick={handleLogout} 
          style={{ cursor: "pointer" }}>Logout</li>
        </ul>
      </div>


      <div className="dashContent">
        <div className="notesUpper">
          <h1 className="notesUpperH1">Notes Dashboard</h1>
          <button className="notesUpperBtn" onClick={() => resetForm()}>+ New Notes</button>
        </div>

<div className="notes">
  {notes.map((note, index) => (
    <div className="notesContent" key={note._id}>
      <div className="notesWrapper">
        <div className="notesTitle">{note.title}</div>
        <div className="notesContentBody">{note.content}</div>
        <div>
          <button className="notesEdit" onClick={() => handleEdit(index)}>Edit</button>
          <button className="notesDelete" onClick={() => handleDelete(note._id)}>Delete</button>
        </div>
      </div>
    </div>
  ))}
</div>



        <div className="addNotes">
          <h1 className="addNotesH1">Add/Edit Notes</h1>
          <form className="addNotesForm" onSubmit={(e) => e.preventDefault()}>
            <h2>Title</h2>
            <input type="text" value={title} onChange={handleTitleChange} />
            <h2>Content</h2>
            <textarea
              id="notes"
              name="notes"
              rows="15"
              cols="70"
              placeholder="Write your notes here..."
              value={content}
              onChange={handleContentChange}
            ></textarea>
          </form>
          <button className='save' onClick={handleSaveNote}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
