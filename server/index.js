const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require("./models/user");
const auth = require("./middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import limiter from './rateLimiter';

const app = express();
app.use(cors());
app.use(express.json());

app.use(limiter);


mongoose.connect("mongodb://localhost:27017/notesapp")
   .then(console.log("mongoDb Connected"));

const NoteSchema = new mongoose.Schema({
    title: String,
    content: String,
     user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Note = new mongoose.model("Note",NoteSchema);

app.get('/notes', auth,async(req,res) =>{
    const userNotes = await Note.find({user: req.user});
    res.json(userNotes);
});

app.post('/notes', auth,async(req,res) =>{
    const {title,content} = req.body;
    const newNote = new Note({title,content, user:req.user});
    await newNote.save();
    res.json(newNote);
});

app.put("/notes/:id", auth, async (req, res) => {
  const { title, content } = req.body;

  const updatedNote = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user }, // Only allow update if owned by user
    { title, content },
    { new: true }
  );

  if (!updatedNote) return res.status(404).json({ message: "Note not found" });

  res.json(updatedNote);
});


app.delete("/notes/:id", auth, async (req, res) => {
  const deletedNote = await Note.findOneAndDelete({
    _id: req.params.id,
    user: req.user
  });

  if (!deletedNote) return res.status(404).json({ message: "Note not found" });

  res.json(deletedNote);
});


// Signup
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ id: user._id }, "secret123");
  res.json({ token });
});


// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, "secret123");
  res.json({ token });
});



app.listen(5000, () =>{
    console.log(`server is running on port 5000`);
});