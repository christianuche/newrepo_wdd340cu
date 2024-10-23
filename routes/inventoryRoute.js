// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController");
const validateResult = require("../utilities/inventory-validation")



// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:vehicleId", invController.buildVehicleDetail);
router.get("/trigger-error: error", invController.triggerError)

// Management view route
router.get('/', invController.buildManagementView);

// Add classification view route
router.get("/add-classification", invController.addClassificationView)

// Route for rendering the add inventory form
router.get("/add-inventory", invController.addInventoryView)

// Route for handling inventory form submission
router.post(
  "/add-inventory",
  validateResult.inventoryRules(),   // Apply validation rules
  validateResult.inventoryData,      // Check for errors and continue if none
  invController.addInventory         // Controller function to process data
)


// Add classification process route with server-side validation
router.post("/add-classification",
    validateResult.classificationRules(),
    validateResult.classificationData,
    invController.addClassification
)



module.exports = router;