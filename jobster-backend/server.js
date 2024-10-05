// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Middleware to parse incoming request bodies (JSON)
app.use(bodyParser.json());

// Connect to MongoDB (replace <db_password> with your actual MongoDB password)
mongoose.connect('mongodb+srv://brivkees:1234@jobsterproject.jmm4i.mongodb.net/?retryWrites=true&w=majority&appName=JobsterProject', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Define port for the server
const port = process.env.PORT || 3000;

// Import the EmployerProfile model
const EmployerProfile = require('./models/EmployerProfile');

// Route to create a new employer profile
app.post('/api/employer-profiles', async (req, res) => {
    try {
        const { companyName, address, industry, logo, numEmployees, description } = req.body;
        const employerProfile = new EmployerProfile({ companyName, address, industry, logo, numEmployees, description });
        await employerProfile.save();
        res.status(201).send(employerProfile);
    } catch (error) {
        res.status(400).send('Error creating profile: ' + error.message);
    }
});

// Route to get all employer profiles
app.get('/api/employer-profiles', async (req, res) => {
    try {
        const profiles = await EmployerProfile.find();
        res.status(200).send(profiles);
    } catch (error) {
        res.status(500).send('Error retrieving profiles: ' + error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
