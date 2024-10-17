// Import external resources
const express = require('express');
const router = new express.Router();
const utilities = require('../utilities/index'); // Adjust path as necessary
const accountController = require('../controllers/accountController');

// Login route

// Add a GET route for "My Account"
router.get('/login', utilities.handleErrors(accountController.buildLogin));
// Add a GET route for "My Registration"
router.get('/register', utilities.handleErrors(accountController.buildRegister));
// Add the registration route using POST
router.post('/register', utilities.handleErrors(accountController.registerAccount));


// Export the router
module.exports = router;

