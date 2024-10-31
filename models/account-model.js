const pool = require("../database/")

/* *****************************
 *   Register new account
 * *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
  try {
    // SQL query to insert a new account into the "account" table
    const sql = `
      INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) 
      VALUES ($1, $2, $3, $4, 'Client')
      RETURNING *`

    // Execute the query using the provided parameters
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) {
    console.error("Error registering new account: ", error.message)
    return error.message
  }
}

/* *****************************
 *   Return account data using email address
 * *************************** */
async function getAccountByEmail(account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
    } catch (error) {
      return new Error("No matching email found")
    }
}


/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email){
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}


/* **********************
 *   Check for account update
 * ********************* */

// Function to get account information by account_id
async function getAccountById(account_id) {
  try {
    const query = "SELECT * FROM account WHERE account_id = $1";
    const result = await pool.query(query, [account_id]);
    return result.rows[0]; // returns account information as an object
  } catch (error) {
    console.error("Error fetching account by ID:", error);
    throw new Error("Database error occurred while fetching account information");
  }
}

// Function to update account information
async function updateAccountInfo(account_id, account_firstname, account_lastname, account_email) {
  try {
    const query = `
      UPDATE account 
      SET account_firstname = $1, account_lastname = $2, account_email = $3 
      WHERE account_id = $4 
      RETURNING *`;
    const result = await pool.query(query, [account_firstname, account_lastname, account_email, account_id]);
    return result.rows[0]; // Returns updated account data
  } catch (error) {
    console.error("Error updating account information:", error);
    throw new Error("Database error occurred while updating account information");
  }
}

// Function to update password
async function updateAccountPassword(account_id, account_password) {
  try {
    const query = `
      UPDATE account 
      SET account_password = $1 
      WHERE account_id = $2 
      RETURNING *`;
    const result = await pool.query(query, [account_password, account_id]);
    return result.rows[0]; // Returns updated account data
  } catch (error) {
    console.error("Error updating account password:", error);
    throw new Error("Database error occurred while updating account password");
  }
}


// Export the registerAccount function for use in other parts of the application
module.exports = { registerAccount, checkExistingEmail, getAccountByEmail, getAccountById, updateAccountInfo, updateAccountPassword }