const mongoose = require('mongoose');
const config = require('../config/connect');
const deviceSchema = mongoose.Schema({
    hardware_id: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    hardware_name: {
        type: String,
        required: true,
        lowercase: true,
    },
    hardware_type: {
        type: String,
        required: true,
        lowercase: true,
    },
    hardware_quantity: {
        type: String,
        required: true,
        lowercase: true,
    },
    hardware_owner: {
        type: String,
        required: true
    },
    cost: {
        description: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        repair_price: {
            type: String,
            required: true
        }
    },
    modified: {
        type: String
    }
});
const Device = module.exports = mongoose.model('Device', deviceSchema);
//const Issue = module.exports = mongoose.model('Issue', issueSchema);

module.exports.addDevice = function (newDevice, callback) {
    newDevice.save(callback);
}
module.exports.getDeviceById = function (id, callback) {
    const query = {hardware_id: id}
    Device.findOne(query, callback);

};
module.exports.getDeviceByType = function (type, callback) {
    const query = {hardware_type: type}
    Device.findOne(query, callback);

};
module.exports.getDevice = function (callback) {
    Device.find(callback);
}

