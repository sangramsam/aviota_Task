var express = require('express');
var router = express.Router();
const uuid = require('node-uuid');
const Employee = require('../model/user');
const Device = require('../model/device');
const Assign = require('../model/assign');
/* GET home page. */
router.post('/register', function (req, res, next) {
    var temp = JSON.parse(req.body.issue_tag);
    var newEmployee = new Employee({
        id: req.body.id,
        name: req.body.name,
        assign_hardware: req.body.assign_hardware,
        assign_hardware_id: req.body.assign_hardware_id,
        repair_cost: req.body.repair_cost,
        issue: {
            Issue_id: temp.id,
            cost: temp.cost,
            hardwareType: temp.hardwareType
        },
        modified: new Date()
    });
    console.log("new", newEmployee)
    Employee.addUser(newEmployee, function (err, user) {
        if (err) {
            res.json({success: false, mesg: 'fail to register user'});
        } else {
            res.json({success: true, mesg: 'User Registered Successfully'});


        }
    });
    next();
});
router.post('/device', function (req, res, next) {
    var temp = JSON.parse(req.body.cost_data);
    var newDevice = new Device({
        hardware_id: req.body.hardware_id,
        hardware_name: req.body.hardware_name,
        hardware_type: req.body.hardware_type,
        hardware_quantity: req.body.hardware_quantity,
        hardware_owner: req.body.hardware_owner,
        cost: {
            description: temp.description,
            price: temp.price,
            repair_price: temp.repair_price
        },
        modified: new Date()
    });
    console.log("new", newDevice)
    Device.addDevice(newDevice, function (err, devices) {
        console.log("new", devices)
        if (err) {
            console.log(err)
            res.json({success: false, mesg: 'fail to register Device'});
        } else {
            res.json({success: true, mesg: 'Device Added Successfully'});


        }
    });
    next();
});
router.put('/device', function (req, res, next) {
    //var temp = JSON.parse(req.body.cost_data);
    if (req.body.hardware_id === undefined || req.body.hardware_id === null || req.body.hardware_id === '') {
        res.status(400).json({success: false, mesg: 'Invalid Input'});
        next();
    }else{

    }
    var newDevice = new Device({
        hardware_id: req.body.hardware_id,
        hardware_name: req.body.hardware_name,
        hardware_type: req.body.hardware_type,
        hardware_quantity: req.body.hardware_quantity,
        hardware_owner: req.body.hardware_owner,
        cost: {
            description: temp.description,
            price: temp.price,
            repair_price: temp.repair_price
        },
        modified: new Date()
    });
    console.log("new", newDevice)
    Device.addDevice(newDevice, function (err, devices) {
        console.log("new", devices)
        if (err) {
            console.log(err)
            res.json({success: false, mesg: 'fail to register Device'});
        } else {
            res.json({success: true, mesg: 'Device Added Successfully'});
        }
    });
    next();
});
router.post('/assign-user', function (req, res, next) {
    var newAssign = new Assign({
        assign_id: uuid.v4(),
        emp_id: req.body.emp_id,
        hardware_id: req.body.hardware_id,
        assign_date: req.body.assign_date,
        assign_duration: req.body.assign_duration,
        modified: new Date()
    });
    console.log("new", newAssign)
    Assign.assignUser(newAssign, function (err, devices) {
        console.log("new", devices)
        if (err) {
            console.log(err)
            res.json({success: false, mesg: 'fail to assign Device'});
        } else {
            res.json({success: true, mesg: 'Device assign to user' + req.body.emp_name});


        }
    });
    next();
});

module.exports = router;
