const express = require("express")
const router = express.Router();
const employeeRoutes = require('../../controllers/updateControllers/employeeMasterController');
const verifyToken = require("../../middleware/verfiyToken");

// File Upload Middleware (Multer)
const upload = employeeRoutes.upload;

router.post("/",verifyToken, upload.array("idProof1"),employeeRoutes.createEmployeeDetails)
router.get("/",verifyToken,employeeRoutes.getEmployeeDetails)
router.put("/:id",verifyToken, upload.array("idProof1"),employeeRoutes.updateEmployeesDetails)
router.delete("/:id",verifyToken,employeeRoutes.deleteEmployeesDetails)

module.exports=router