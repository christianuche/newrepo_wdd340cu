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


// Export the registerAccount function for use in other parts of the application
module.exports = { registerAccount, checkExistingEmail }