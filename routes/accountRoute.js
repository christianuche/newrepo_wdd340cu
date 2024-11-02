// Import external resources
const express = require('express');
const router = new express.Router();
const utilities = require('../utilities/index'); // Adjust path as necessary
const accountController = require('../controllers/accountController');
const regValidate = require('../utilities/account-validation')




// Registration route
router.get('/register', utilities.handleErrors(accountController.buildRegister));
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

// Login routes
router.get('/logout', utilities.handleErrors(accountController.logout));
router.get('/login', utilities.handleErrors(accountController.buildLogin));
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Account management route
router.get(
  "/management",
  utilities.checkLogin,
  utilities.handleErrors(accountController.getAccountManagement)
);


router.get('/profile-view', utilities.handleErrors(accountController.viewProfile)); // Route to view profile

// GET route to render the account profile view
router.get("/create-profile", utilities.handleErrors(accountController.createProfile))
// POST route to process account profile create
router.post("/create", 
  //regValidate.updateAccountRules(),
  //regValidate.checkUpdateData,
  utilities.handleErrors(accountController.createAccountProfile)
)

// GET route to render the account update view
router.get("/update", utilities.handleErrors(accountController.getAccountUpdateView))

// POST route to process account information update
router.post("/update", 
  regValidate.updateAccountRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.processAccountUpdate)
)

// POST route to handle password change request
router.post("/updatePassword", 
  regValidate.updatePasswordRules(), 
  regValidate.checkPasswordData, 
  utilities.handleErrors(accountController.processPasswordChange)
)


// Export the router
module.exports = router;
