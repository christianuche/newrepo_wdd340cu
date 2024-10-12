const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}


/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
    try {
      const data = await pool.query(
        `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
        [classification_id]
      )
      if (data.rows.length == 0 ) {
        throw new Error('Nothing is found in this page try another ID'); // throw error if no vehicle found
    }
      return data.rows
    } catch (error) {
      console.error("getclassificationsbyid error " + error)
    }
}

// Get all vehicle inventory
async function getVehicleId(vehicleId) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory WHERE inv_id = $1`,
            [vehicleId]
        );
        if (data.rows.length == 0 ) {
            throw new Error('No vehicle found with this ID'); // throw error if no vehicle found
        }
        return data.rows[0];  // Return the first row of the result
    } catch (error) {
        throw new Error("Database query failed");
    }
}


module.exports = {getClassifications, getInventoryByClassificationId, getVehicleId};