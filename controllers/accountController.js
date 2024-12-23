const utilities = require('../utilities/index'); // Adjust path as necessary
const accountModel = require('../models/account-model') // Import the account model
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()


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

async function logout(req, res,) {
    res.clearCookie("jwt")
    res.locals.loggedin = null

    // This will redirect you to the Home Page
    res.redirect("/")
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
const processLogin = (req, res, next) => {
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
async function registerAccount(req, res, next) {
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

/* ****************************************
*  Process Login request
* *************************************** */
async function accountLogin(req, res, next) {
    let nav = await utilities.getNav();
    const { account_email, account_password } = req.body
    const accountData = await accountModel.getAccountByEmail(account_email)
    if (!accountData) {
        req.flash("notice", "Please check your credentials and try again.")
        res.status(400).render("account/login", {
            title: "Login",
            nav,
            errors: null,
            account_email,
        })
        return
    }
    try {
        if (await bcrypt.compare(account_password, accountData.account_password)) {
            delete accountData.account_password
            const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
            if(process.env.NODE_ENV === "development") {
                res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
            } else {
                res.cookie("jwt", accessToken, { httpOnly: true, secure: true,  maxAge: 3600 * 1000 })
            }
            return res.redirect("/account/management")
        }
        else {
            req.flash("message notice", "Please check your credentials and try again.")
            res.status(400).render("account/login", {
                title: "Login",
                nav,
                errors: null,
                account_email,
            })
        }
    } catch (error) {
        throw new Error("Access Forbidden")
    }
}

/* ****************************************
 *  Deliver management view
 * *************************************** */
async function getAccountManagement(req, res, next) {
    try {
        let nav = await utilities.getNav(); // Get the navigation items

        res.render("account/management", {
            title: "Account Management",
            nav,
        });
    } catch (error) {
        console.error("Error retrieving account management view:", error);
        next(error); // Pass the error to the error handler
    }
}

/* ****************************************
 *  Deliver update view
 * *************************************** */

// Function to render the account update view
async function getAccountUpdateView (req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/update", { 
    title: "Update Account", 
    nav,
  })
}

// Function to process account information update
async function processAccountUpdate (req, res, next) {
  const { account_firstname, account_lastname, account_email } = req.body
  const updateResult = await accountModel.updateAccountInfo(
    req.session.account_id, 
    account_firstname, 
    account_lastname, 
    account_email
  )
    if (updateResult) {
    req.flash("success", "Account information updated successfully.")
  } else {
    req.flash("error", "Failed to update account information.")
  }
  
  res.redirect("/account/management")
}

// Function to process password change
async function processPasswordChange (req, res, next) {
  const { account_password } = req.body
  const hashedPassword = await bcrypt.hash(account_password, 12)

  const passwordUpdateResult = await accountModel.updateAccountPassword(
    req.session.account_id, 
    hashedPassword
  )

  if (passwordUpdateResult) {
    req.flash("success", "Password updated successfully.")
  } else {
    req.flash("error", "Failed to update password.")
  }

  res.redirect("/account/management")
}


/* ****************************************
*  Deliver profile view
* *************************************** */
async function viewProfile(req, res, next) {
    try {
        const user_id = req.session.userId; // Assuming user ID is stored in session
        const profile = await accountModel.getUserProfile(user_id);
        let nav = await utilities.getNav();
        res.render("account/profile-view", {
            title: "Profile",
            nav,
            profile,
            errors: null,
        });
    } catch (error) {
        console.error('Error rendering profile view:', error);
        res.status(500).render("account/profile-view", {
            title: "Profile",
            nav: [],
            profile: {},
            errors: [{ msg: 'Failed to load profile view' }],
        });
    }
}

async function createProfile (req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/create-profile", {
      title: "Create Profile",
      nav,
    })
}

// Function to process account information update
async function createAccountProfile (req, res, next) {
    const { user_id, bio, profile_picture, contact_number } = req.body
    const createResult = await accountModel.addUserProfile(
      req.session.user_id, bio, profile_picture, contact_number
    )
      if (createResult) {
      req.flash("success", "Account information updated successfully.")
    } else {
      req.flash("error", "Failed to update account information.")
    }
    
    res.redirect("/account/management")
  }
  
  // Function to process password change
// async function createpProfile(req, res) {

//     const { user_id, bio, profile_picture, contact_number } = req.body;
//     try {
//         const newProfile = await accountModel.addUserProfile(user_id, bio, profile_picture, contact_number);
//         res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
//       } catch (error) {
//         console.error('Error creating profile:', error);
//         res.status(500).json({ error: 'Failed to create profile' });
//       }
// }

async function editProfile(req, res) {
  const { user_id, bio, profile_picture, contact_number } = req.body;
  try {
    const updatedProfile = await userProfileModel.updateUserProfile(user_id, bio, profile_picture, contact_number);
    res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}

module.exports = {
    logout,
    viewProfile,
    editProfile,
    createProfile,
    buildLogin,
    processLogin,
    accountLogin,
    buildRegister,
    registerAccount,
    createAccountProfile,
    getAccountManagement,
    processPasswordChange,
    processAccountUpdate,
    getAccountUpdateView
}