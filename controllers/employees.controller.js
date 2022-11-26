
const Employees = require('../models/employees.model');

exports.getEmployees = (req, res) => {
    try{
        Employees.find((err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving employees.'})
            }

            res.status(200).send(data);
        })
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

exports.getEmployeeByID = (req, res) => {
    try{
        Employees.findOne({_id: req.params.empID},(err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving an employee.'})
            }

            res.status(200).send(data);
        })
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}


exports.addEmployee = (req, res) => {
    try{
        
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

exports.updateEmployee = (req, res) => {
    try{
        Employees.findByIdAndUpdate({_id: req.params.empID}, {$set: req.body}, (err, data) => {
            if(err){
                return res.status(400).send({message: "Error while updating an employee."})
            }

            res.status(200).send({employeeID: req.params.empID, message: 'Employee has been updated successfully.'})
        })
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

exports.deleteEmployee = async (req, res) => {
    try{
        const existingEmployee = await Employee.findOne({_id: req.params.empID});

        if(existingEmployee){
            Employees.deleteOne({_id: existingEmployee._id}, (err, data) => {
                if(err){
                    return res.status(400).send({message: "Error while deleting an employee."});
                }
                res.status(200).send({message: "Employee data has been deleted successfully."})
            })
        }
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
};

exports.getLoggedUserByID = (req, res, next, id) => {
    try{
        Employees.findOne({_id: id},(err, data) => {
            if(err){
                return res.status(400).send({message: 'Employee doesnt exist. Register as a new employee.'})
            }
            req.profile = data;
            req.profile._id = id;
            next();
        })
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}