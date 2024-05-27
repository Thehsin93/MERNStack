const express = require('express');
const route = express.Router();
const controller = require("../controllers/workoutcontroller")
const requireAuth = require("../middleware/requireauth")
route.use(requireAuth);
route.get("/",controller.workout_getall)
route.get("/:id",controller.workout_getone)
route.post("/",controller.workout_post)
route.delete("/:id",controller.workout_delete)
route.patch("/:id",controller.workout_patch)
module.exports= route;