const Employees = require('../models/employees.model');
const Token = require('../models/token.model');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

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

exports.forgotPassword = async (req, res) => {
    try{
        const employee = await Employees.findOne({email: req.body.email});
        console.log('Employee: ', employee)
        if(employee.email){
            let token = await Token.findOne({userId: employee._id});
            if(!token){
                let newToken = await new Token({
                    userId: employee._id,
                    token: crypto.randomBytes(32).toString('hex')
                })
                const userToken = await newToken.save();

                const url = `${process.env.FRONTEND_BASE_URL}/reset-password/${employee._id}/${userToken.token}`;
                const isSent = await sendEmail(employee.email, 'RESET PASSWORD LINK', url);

                if(isSent){
                    return res.status(200).send('Reset password link has been sent to you!')
                }
                return res.status(400).send('Error while send reset-password link')
            }
        }

        res.status(400).send({message: 'Employee doesnt exist with the given email.'})
    }catch(error){
        console.log('Error: ', error);
        res.status(500).send({message: 'Internal Server Error'})
    }
}

exports.resetPassword = async(req, res) => {
    try{
        const existingEmployee = await Employees.findOne({_id: req.params.userID});
        if(existingEmployee){
            const token = await Token.findOne({userId: existingEmployee._id, token: req.params.token});
            if(token){
                if(req.body.password === req.body.confirmPassword){
                    const hashValue = await bcrpyt.hash(req.body.password, 10);
                    
                    Employees.findByIdAndUpdate({_id: existingEmployee._id}, {$set: {...existingEmployee, hashedPassword: hashValue}}, (err, data) => {
                        if(err){
                            return res.status(400).send({message: "Error while reseting the password"})
                        }
            
                        return res.status(200).send({employeeID: existingEmployee._id, message: 'Password reset is successfull'})
                    })
                }
            }
            return res.status(400).send({message: "Invalid token"})
        }
        res.status(400).send({message: 'Employee doesnt exist with the given email.'})

    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
    }
}