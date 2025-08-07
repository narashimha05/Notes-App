import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const res = await fetch("http://localhost:5000/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
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
      fetch(`http://localhost:5000/notes/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      })
        .then((res) => res.json())
        .then((updatedNote) => {
          const updatedNotes = [...notes];
          updatedNotes[editIndex] = updatedNote;
          setNotes(updatedNotes);
          resetForm();
        });
    } else {
      fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      })
        .then((res) => res.json())
        .then((newNote) => {
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
    setShowForm(false);
  }

  function handleEdit(index) {
    const note = notes[index];
    setTitle(note.title);
    setContent(note.content);
    setEditIndex(index);
    setEditId(note._id);
    setShowForm(true);
  }

  function handleDelete(id) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function handleNewNote() {
    resetForm();
    setShowForm(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <p className="text-xl font-semibold text-gray-800">
              Notes App
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-300 hover:text-red-600 font-medium cursor-pointer bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
            <p className="text-gray-600 mt-1">{notes.length} notes total</p>
          </div>
          <button
            onClick={handleNewNote}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium cursor-pointer"
          >
            + New Note
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {notes.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500 text-lg">No notes yet</p>
                <p className="text-gray-400 mt-1">
                  Create your first note to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map((note, index) => (
                  <div
                    key={note._id}
                    className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-4">
                        {note.title}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer border border-blue-200 rounded px-2 py-1 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(note._id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer border border-red-200 rounded px-2 py-1 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {note.content.length > 150
                        ? note.content.substring(0, 150) + "..."
                        : note.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {showForm ? (
              <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editId ? "Edit Note" : "New Note"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="Enter note title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>
                    <textarea
                      value={content}
                      onChange={handleContentChange}
                      placeholder="Write your note here..."
                      rows="12"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    ></textarea>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleSaveNote}
                      disabled={!title || !content}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium cursor-pointer"
                    >
                      {editId ? "Update" : "Save"}
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <button
                    onClick={handleNewNote}
                    className="w-full text-left p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900 cursor-pointer">
                      Create New Note
                    </div>
                    <div className="text-sm text-gray-500">
                      Start writing your thoughts
                    </div>
                  </button>

                  <div className="p-3 rounded-md bg-gray-50">
                    <div className="font-medium text-gray-900">Tips</div>
                    <div className="text-sm text-gray-600 mt-1">
                      • Click "New Note" to start writing
                      <br />
                      • Use descriptive titles
                      <br />• Edit notes by clicking "Edit"
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
