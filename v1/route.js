const express = require("express");
const Routes = require("./routes/index");
const router = express();
router.use("/driver", Routes.driverRoutes);
router.use("/user", Routes.userRoutes);
module.exports = router;
