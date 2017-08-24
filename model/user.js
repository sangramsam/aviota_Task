const mongoose = require('mongoose');
const config = require('../config/connect');
const issue = require('./issue');
var Schema = mongoose.Schema;
//var Issues = mongoose.model('Issues', issue);
const employeeSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    assign_hardware: {
        type: String,
        required: true
    },
    assign_hardware_id: {
        type: String,
        required: true
    },
    repair_cost: {
        type: String,
        required: true
    },
    issue: {
                Issue_id: {
                    type: String,
                    required: true
                },
                cost: {
                    type: String,
                    required: true
                },
                hardwareType: {
                    type: String,
                    required: true
                }
    },
    /*issue: {
        type: Schema.Types.ObjectId,
        ref: 'issue'
    },*/
    modified: {
        type: String
    }
});
const Employee = module.exports = mongoose.model('Employee', employeeSchema);
//const Issue = module.exports = mongoose.model('Issue', issueSchema);

module.exports.getUserById = function (id, callback) {
    Employee.findById(id, callback);
}
module.exports.getUserByName = function (userName, callback) {
    const query = {username: userName}
    Employee.findOne(query, callback);

}
module.exports.getUserByEmail = function (email, callback) {
    const query = {email: email}
    Employee.findOne(query, callback);

}

module.exports.addUser = function (newuser, callback) {
    newuser.save(callback);
}
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    console.log("password", candidatePassword, hash);
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};
module.exports.getuser = function (callback) {
    Employee.find(callback);
}

