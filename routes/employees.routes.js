const express = require('express');
const { getEmployees, getEmployeeByID, addEmployee, updateEmployee, deleteEmployee, getLoggedUserByID } = require('../controllers/employees.controller');
const { requireSignIn, isAuth } = require('../utils/authenticationMiddleware');
const { isAdmin } = require('../utils/authorizationMiddleware');

const router = express.Router();

router.get('/employees', getEmployees);

router.get('/employees/:empID', getEmployeeByID);

router.post('/employees',  addEmployee);

router.put('/employees/:empID', updateEmployee);

router.delete('/employees/:empID', deleteEmployee);

router.param('userID', getLoggedUserByID);

module.exports = router;