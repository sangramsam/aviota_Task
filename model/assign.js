const mongoose = require('mongoose');
const assignSchema = mongoose.Schema({
    assign_id: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    emp_id: {
        type: String,
        required: true,
        lowercase: true,
    },
    hardware_id: {
        type: String,
        required: true,
        lowercase: true,
    },
    assign_date: {
        type: Date,
        required: true,
        lowercase: true,
    },
    assign_duration: {
        type: String,
        required: true
    },
    modified: {
        type: String
    }
});
const Assign = module.exports = mongoose.model('Assign', assignSchema);
//const Issue = module.exports = mongoose.model('Issue', issueSchema);

module.exports.assignUser = function (newAssign, callback) {
    newAssign.save(callback);
}
module.exports.getByAssignId = function (hdd_id, callback) {
    const query = {hardware_id: hdd_id}
    Assign.findOne(query, callback);
}
module.exports.getuser = function (callback) {
    Assign.find(callback);
}

