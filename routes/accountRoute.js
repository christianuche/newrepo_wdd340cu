// Import external resources
const express = require('express');
const router = new express.Router();
const utilities = require('../utilities/index'); // Adjust path as necessary
const accountController = require('../controllers/accountController');
const regValidate = require('../utilities/account-validation')

// Login route
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Route for the login process
router.post('/login', utilities.handleErrors(accountController.processLogin))

router.get('/management', utilities.handleErrors(accountController.getAccountManagement));
// Add a GET route for "My Account"
router.get('/login', utilities.handleErrors(accountController.buildLogin));
// Add a GET route for "My Account"
router.post('/login', utilities.handleErrors(accountController.accountLogin));
// Add a GET route for "My Registration"
router.get('/register', utilities.handleErrors(accountController.buildRegister));
// Add the registration route using POST
router.post('/register', utilities.handleErrors(accountController.registerAccount));


// Export the router
module.exports = router;
