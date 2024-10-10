const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");
const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by detail view
 * ************************** */

// Just added this now
invCont.buildDetailView = async function(req, res, next) {
    const id = req.params.id;
    try {
        const vehicleData = await invModel.getVehicleById(id);
        const grid = utilities.buildVehicleDetailHTML(vehicleData);
        const nav = await utilities.getNav();
        res.render("inventory/detail", {
            title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
            nav,
            grid,
        });
    } catch (error) {
        next(error);
    }
};


// invController.js
invCont.buildDetailView = async function (req, res, next) {
    try {
      const id = req.params.id; // Get the vehicle ID from the request parameters
      const data = await invModel.getInventoryById(id); // Fetch data from the model
      const nav = await utilities.getNav();
  
      // Check if any data was returned
      if (data.length === 0) {
        return next({ status: 404, message: "Vehicle not found." }); // Handle case when vehicle is not found
      }
  
      const vehicle = data[0]; // Assuming data is an array, take the first item
      res.render("inventory/detail", {
        title: `${vehicle.inv_make} ${vehicle.inv_model}`,
        nav,
        vehicle,
      });
    } catch (error) {
      console.error("Error in buildDetailView:", error); // Log any errors
      next(error); // Pass the error to the error handling middleware
    }
  };
  

module.exports = invCont;