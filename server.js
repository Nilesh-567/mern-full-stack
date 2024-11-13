// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection string
const mongoURI = "mongodb+srv://mongodb:Nilesh123@mydatabase.sgxomt2.mongodb.net/Vercel?retryWrites=true&w=majority";

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));

// Define a schema and model for the "project" collection
const projectSchema = new mongoose.Schema({
  name: String,
});

const Project = mongoose.model("Project", projectSchema, "project"); // Third argument specifies collection name

// API endpoint to retrieve items from the "project" collection in MongoDB
app.get('/items', async (req, res) => {
  try {
    const items = await Project.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// API endpoint to add a new item to the "project" collection
app.post('/items', async (req, res) => {
  const { name } = req.body;
  const newItem = new Project({ name });

  try {
    await newItem.save();
    res.json({ message: "Item added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
