const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
       trim: true
   },
   email: {
       type: String,
       required: true,
       unique: true,
       trim : true
   },
   hashedPassword: {
        type: String,
        required: true,
        trim: true
   },
   mobileNumber: {
       type: String,
       required: true,
       unique: true,
       trim: true
   },
   dob: {
       type: Date,
       required: true
   },
   designation: {
       type: String,
       required: true
   },
   bloodGroup: {
       type: String
   },
   role: {
       type: Number,
       default: 2,
       required: true
   }
});

module.exports = mongoose.model('Employees', employeeSchema);