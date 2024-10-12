// Import external resources
const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index'); // Adjust path as necessary
const accountController = require('../controllers/accountController');

// Add a GET route for "My Account"
router.get('/my-account', utilities.handleErrors(accountController.buildLog));

// Export the router
module.exports = router;
