const express = require('express');
const { getEmployees, getEmployeeByID, addEmployee, updateEmployee, deleteEmployee, getLoggedUserByID } = require('../controllers/employees.controller');
const { requireSignIn, isAuth } = require('../utils/authenticationMiddleware');
const { isAdmin } = require('../utils/authorizationMiddleware');

const router = express.Router();

router.get('/:userID/employees', requireSignIn, isAuth, getEmployees);

router.get('/:userID/employees/:empID',requireSignIn, isAuth,  getEmployeeByID);

router.post('/:userID/employees', requireSignIn, isAuth, isAdmin, addEmployee);

router.put('/:userID/employees/:empID', requireSignIn, isAuth, isAdmin, updateEmployee);

router.delete('/:userID/employees/:empID',requireSignIn, isAuth, isAdmin,  deleteEmployee);

router.param('userID', getLoggedUserByID);

module.exports = router;