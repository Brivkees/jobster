const mongoose = require('mongoose');

// Define the schema for the employer profile
const employerProfileSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    address: { type: String, required: true },
    industry: { type: String, required: true },
    logo: { type: String }, // Optional field for the logo
    numEmployees: { type: Number, required: true },
    description: { type: String, required: true }
});

// Create the model from the schema
const EmployerProfile = mongoose.model('EmployerProfile', employerProfileSchema);

// Export the model
module.exports = EmployerProfile;
