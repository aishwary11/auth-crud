const express = require("express");
const router = express.Router();
const employeeController = require("./employeeController");

router.post("/add", employeeController.add);
router.get("/list", employeeController.list);

module.exports = router;