const express = require('express');
const { getEmployees, getEmployeeByID, addEmployee, updateEmployee, deleteEmployee, getLoggedUserByID } = require('../controllers/employees.controller');
const { requireSignIn, isAuth } = require('../utils/authenticationMiddleware');
const { isAdmin } = require('../utils/authorizationMiddleware');

const router = express.Router();

router.get('/:userID/employees', getEmployees);

router.get('/:userID/employees/:empID', getEmployeeByID);

router.post('/:userID/employees',  addEmployee);

router.put('/:userID/employees/:empID', updateEmployee);

router.delete('/:userID/employees/:empID', deleteEmployee);

router.param('userID', getLoggedUserByID);

module.exports = router;