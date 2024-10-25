//const { validationResult } = require("express-validator")
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
 *  Build inventory by vehicle view
 * ************************** */
invCont.buildVehicleDetail = async function (req, res, next) {
    try {
        const vehicleId = req.params.vehicleId;
        const data = await invModel.getVehicleId(vehicleId);
        
        if (!data) {
            // Handle vehicle not found
            return res.status(404).render("errors/error", { message: "Vehicle not found" });
        }

        // Navigation (Optional) - depending on your project requirements
        let nav = await utilities.getNav();

        // Render the vehicle detail page
        res.render("./inventory/vehicle", {
            title: `${data.inv_make} ${data.inv_model} ${data.inv_year}`,
            nav,
            vehicle: data
        });
    } catch (error) {
        next(error);  // Pass error to middleware
    }
};

invCont.buildManagementView = async function (req, res,next) {
    res.render("inventory/management", {
        nav: await utilities.getNav(),
        title: "Inventory Management",
    })
}

/* ***************************
 *  Add classification view
 * ************************** */
invCont.addClassificationView = async function (req, res, next) {
    try {
        // Generate the navigation (if required)
        let nav = await utilities.getNav();

        // Render the management view optional flash message handling
        res.render("inventory/add-classification", {
            title: "Add New Classification",
            nav,
            errors: null,
            classification_name: null,
            flashMessage: req.flash('info') // assuming you are flash for messages
        })
    } catch (error) {
        next(error); // Pass error to middleware
    }
}

/* ***************************
 *  Add Inventory View
 * ************************** */
invCont.addInventoryView = async function (req, res, next) {
    try {
      // Fetch the classification list from the database
      const classificationList = await utilities.buildClassificationList();

      // Fetch the existing inventory data (optional, if you want to show existing items or pre-fill)
      //const inventoryList = await invModel.getInventoryItems(); // Assume this function exists

      // Get navigation
      let nav = await utilities.getNav();

      // Render the view and pass inventory data to the view
      res.render("inventory/add-inventory", {
        title: "Add New Inventory Item",
        nav,
        classificationList,  // Render the classifications for selection
        //inventoryList,        // If you want to display existing inventory
        errors: [],           // Error handling placeholder
        inv_make: "",         // Empty form fields
        inv_model: "",
        inv_year: "",
        inv_description: "",
        inv_image: "",
        inv_thumbnail: "",
        inv_price: "",
        inv_miles: "",
        inv_color: "",
      });
    } catch (error) {
      next(error);
    }
};


/* ***************************
 *  Add classification
 * ************************** */
invCont.addClassification = async function (req, res, next){
    try {
        const { classification_name } = req.body;
        await invModel.addClassification(classification_name);  // Add to the model
        req.flash("info", "Classification added successfully!");  // Flash message for success
        res.redirect("/inv");
    } catch (error) {
        let nav = await utilities.getNav();  // Get navigation again in case of error
        res.render("inventory/add-classification", {
            title: "Add New Classification",
            nav,
            errors: [{ msg: "Error adding classification." }],
            classification_name: req.body.classification_name || ''  // Retain input on error
        });
    }
};


/* ***************************
 *  Add Inventory
 * ************************** */
invCont.addInventory = async function (req, res, next) {
    try {
        const {inv_make, inv_model, inv_year, inv_price, inv_miles, classification_id, inv_color, inv_description, inv_image, inv_thumbnail} = req.body;

        // Add the new inventory item to the database
        await invModel.addInventoryItem(inv_make, inv_model, inv_year, inv_price, inv_miles, classification_id, inv_color, inv_description, inv_image, inv_thumbnail);

        // Flash message for successful addition and redirect
        req.flash("info", "Inventory item added successfully!");
        res.redirect("/inv");  // Redirect to the inventory homepage or list page
    } catch (error) {
        // In case of database failure, re-render the form with an error message
        let nav = await utilities.getNav();
        //const classificationList = await utilities.buildClassificationList();
        res.render("inventory/add-inventory", {
            title: "Add New Inventory",
            nav,
            errors: [{ msg: "Error adding inventory item. Please try again later." }],  // Display a custom error message
            inv_make,
            inv_model,
            inv_year,
            inv_price,
            inv_miles,
            inv_color,
            inv_description,
            inv_image,
            inv_thumbnail,
            classificationList: req.body.addInventory || " "
        });
    }
};

// Controller to trigger a 500 error
invCont.triggerError = (req, res, next) => {
    // Intentionally cause an error
    const error = new Error('This is an intentional 500 error.');
    error.status = 500;
    next(error); // Pass the error to the error handling middleware
};


module.exports = invCont
