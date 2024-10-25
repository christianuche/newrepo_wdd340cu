// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController");
const validateResult = require("../utilities/inventory-validation")



// Route to display views
router.get('/', invController.buildManagementView); // Management view route
router.get("/add-classification", invController.addClassificationView); // Add classification view route
router.get("/add-inventory", invController.addInventoryView); // Render add inventory form
router.get("/type/:classificationId", invController.buildByClassificationId); // Inventory by classification
router.get("/detail/:vehicleId", invController.buildVehicleDetail); // Vehicle detail view
router.get("/trigger-error: error", invController.triggerError); // Error trigger route

// Routes to handle form submissions
router.post(
  "/add-inventory",
  validateResult.inventoryRules(), // Apply validation rules
  validateResult.inventoryData,    // Check for errors and continue if none
  invController.addInventory       // Controller function to process data
);

router.post(
  "/add-classification",
  validateResult.classificationRules(), // Apply classification validation rules
  validateResult.classificationData,    // Check for errors and continue if none
  invController.addClassification       // Controller function to process data
);

module.exports = router;