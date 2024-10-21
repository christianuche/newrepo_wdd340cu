const utilities = require('../utilities/index'); // Adjust path as necessary
const accountModel = require('../models/account-model') // Import the account model
const bcrypt = require("bcryptjs") 


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
        title: "Login",
        nav,
        message: req.flash('error') || null
    })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      title: "Register",
      nav,
      errors: null,
    })
}

// This function would be part of login form submission handling
const processLogin = (req, res) => {
    const { account_email, account_password } = req.body;
  
    // Simulate a login check
    if (account_email === 'test@example.com' && account_password === 'password123') {
      req.flash('success', 'Login successful!');
      res.redirect('/dashboard');  // Redirect to dashboard after successful login
    } else {
      req.flash('error', 'Invalid email or password.');
      res.redirect('/account/login');  // Redirect back to login if authentication fails
    }
};

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
    let nav = await utilities.getNav();
    const { 
        account_firstname, 
        account_lastname, 
        account_email, 
        account_password 
    } = req.body

    //Hash the password before storing
    let hashedPassword
    try {
        //regular password and cost (salt is generated automatically)
        hashedPassword = await bcrypt.hashSync(account_password, 10)
    } catch (error) {
        req.flash(
            "notice",
            "Sorry, there was an error processing the registration"
        )
        res.status(500).render("account/register", {
            title: "Registration",
            nav,
            errors: null
        })
    }

    const regResult = await accountModel.registerAccount(
        account_firstname,
        account_lastname,
        account_email,
        hashedPassword
    )

    if (regResult) {
        req.flash(
            "notice",
            `Congratulation, you\'re registered ${account_firstname}. Please log in.`
        )
        res.status(201).render("account/login", {
            title: "Login",
            nav,
        })
    } else {
        req.flash("notice", "Sorry, the registration failed.")
        res.status(501).render("account/register", {
            title: "Register",
            nav,
        })
    }
}

module.exports = { buildLogin, processLogin, buildRegister, registerAccount }