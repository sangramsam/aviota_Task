var express = require('express');
var router = express.Router();
const uuid = require('node-uuid');
var moment = require('moment');
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
            hardwareType: temp.hardwareType,
            description: temp.description
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
});
router.put('/device', function (req, res, next) {
    //var temp = JSON.parse(req.body.cost_data);
    Device.getDeviceById(req.body.hardware_id, function (err, devices) {
        //console.log(devices);
        if (req.body.hardware_name) {
            devices.hardware_name = req.body.hardware_name;
        }
        if (req.body.cost_data) {
            var temp = JSON.parse(req.body.cost_data);
            if (temp.description) {
                devices.cost.description = temp.description;
            }
            if (temp.price) {
                devices.cost.price = temp.price;
            }
            if (temp.repair_price) {
                devices.cost.repair_price = temp.repair_price;
            }
        }
        if (req.body.hardware_type) {
            devices.hardware_type = req.body.hardware_type;
        }
        if (req.body.hardware_quantity) {
            devices.hardware_quantity = req.body.hardware_quantity;
        }
        if (req.body.hardware_owner) {
            devices.hardware_owner = req.body.hardware_owner;
        }
        devices.save(function (err, dd) {
            console.log(dd);
            res.json({success: true, mesg: 'Device updated Successfully'});
        });

    });
    //next();
});
router.post('/assign-user', function (req, res, next) {
    if (req.body.hardware_id) {
        Assign.getByAssignId(req.body.hardware_id, function (err, data) {
            console.log("assign",data);
            if (err) throw err;
            if (data === null) {
                console.log("assign if");
                var newAssign = new Assign({
                    assign_id: uuid.v4(),
                    emp_id: req.body.emp_id,
                    hardware_id: req.body.hardware_id,
                    assign_date: req.body.assign_date,
                    assign_duration: req.body.assign_duration,
                    modified: new Date()
                });
                Assign.assignUser(newAssign, function (err, devices) {
                    console.log("new", devices)
                    if (err) {
                        console.log(err)
                        res.json({success: false, mesg: 'fail to assign Device'});
                    } else {
                        res.json({success: true, mesg: 'Device assign to user' + req.body.emp_name});


                    }
                });
            } else {

                var duration = parseInt(data.assign_duration)
                var limit = moment(data.assign_date).add(duration, 'days');
                //console.log(limit);
                if (moment(req.body.assign_date) >= moment(data.assign_date) && moment(req.body.assign_date) <= limit) {
                    console.log("assign cond");
                    res.jsonp({success: false, mesg: "already assign to some one"});
                }else{
                    var newAssign = new Assign({
                        assign_id: uuid.v4(),
                        emp_id: req.body.emp_id,
                        hardware_id: req.body.hardware_id,
                        assign_date: req.body.assign_date,
                        assign_duration: req.body.assign_duration,
                        modified: new Date()
                    });
                    Assign.assignUser(newAssign, function (err, devices) {
                        console.log("new", devices)
                        if (err) {
                            console.log(err)
                            res.json({success: false, mesg: 'fail to assign Device'});
                        } else {
                            res.json({success: true, mesg: 'Device assign to user' + req.body.emp_name});


                        }
                    });
                }
            }

        });
    }

});
router.get('/getUser', function (req, res) {
    Employee.getuser(function (err, data) {
        //console.log(data);
        res.jsonp({success: true, user: data});
    })

});
router.post('/getUser', function (req, res) {
    console.log(req.body);
    if (req.body.id) {
        Employee.getUserById(req.body.id, function (err, data) {
            console.log(data);
            res.jsonp({success: true, user: data});
        });
    }
    if (req.body.name) {
        Employee.getUserByName(req.body.name, function (err, data) {
            res.jsonp({success: true, user: data});
        });
    }
});
router.get('/getDevice', function (req, res) {
    Device.getDevice(function (err, data) {
        res.jsonp({success: true, device: data});
    })
});
router.post('/getDevice', function (req, res, next) {
    if (req.body.type) {
        Device.getDeviceByType(req.body.type, function (err, data) {
            console.log(data);
            if (err) throw err;
            res.jsonp({success: true, Device: data});
        });
    };
    //next();
});

module.exports = router;
