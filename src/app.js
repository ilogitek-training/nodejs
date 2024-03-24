// app.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/nodejs_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define a sample schema and model
const SampleSchema = new mongoose.Schema({
  name: String
});

const SampleModel = mongoose.model('Sample', SampleSchema);

// Define a sample API endpoint
app.get('/', async (req, res) => {
  try {
    const samples = await SampleModel.find();
    res.json(samples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
