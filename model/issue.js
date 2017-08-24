const mongoose = require('mongoose');
const config = require('../config/connect');
const issueSchema = mongoose.Schema({
    Issue_id: {
        type: String,
        required: true,
        lowercase: true,
    },
    cost: {
        type: String,
        required: true,
        lowercase: true,
    },
    hardwareType: {
        type: String,
        required: true,
        lowercase: true,
    }
    /* Issue_id: {
         String,
     hardwareType: String,
     hardware_id: String,
     cost: String,
     date: String
 },*/
});
const issue = module.exports = mongoose.model('issue',issueSchema);