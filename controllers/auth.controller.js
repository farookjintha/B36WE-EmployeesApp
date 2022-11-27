const Employees = require('../models/employees.model');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try{
        const payload = req.body;
        if(!payload.password){
            return res.status(400).send({message: "Password is mandatory!"});
        }
        const hashValue = await bcrpyt.hash(payload.password, 10); // 10 -> saltingRound
        payload.hashedPassword = hashValue;
        delete payload.password;

        let newEmployee = new Employees(payload);

        await newEmployee.save((err, data) =>{
            if(err){
                console.log(err);
                return res.status(400).send({message: 'Error while employee registration.'})
            }
            res.status(200).send({employeeID: data._id, message: 'Employee has been registered successfully.'})
        })
    }catch(error){
        res.status(500).send({message: "Internal Server Error"});
    }
}

exports.signin = async (req, res) => {
    try{
        const {email, password} = req.body;

        const existingEmployee = await Employees.findOne({email: email});
        console.log(existingEmployee, "::::: Existing Employee")

        if(existingEmployee){
            const isValidCredentials = await bcrpyt.compare(password, existingEmployee.hashedPassword);

            if(isValidCredentials){
                const token = jwt.sign({_id: existingEmployee._id}, process.env.SECRET_KEY); //Encryption -> _id -> JWT TOken
                res.cookie('accessToken', token, {expire: new Date() + 86400000}); //backend -> frontend : must be in the same domain.

                return res.status(200).send({token: token, employeeID: existingEmployee._id, message: 'Employee has been loggedin successfully.'})

            }

            return res.status(400).send({message: 'Invalid credentials.'})
        }

        res.status(400).send({message: "Employee doesn't exist."});
    }catch(error){
        res.status(500).send({message: "Internal Server Error"});
    }
}

exports.signout = async (req, res) => {
    try{
        await res.clearCookie('accessToken');
        res.status(200).send({message: 'Signed out successfully.'});
    }catch(error){
        res.status(500).send({message: "Internal Server Error"});
    }
};