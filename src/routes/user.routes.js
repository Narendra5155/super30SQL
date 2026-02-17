import express from "express";
import * as controller from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/users", controller.createUser);
router.get("/users", controller.getUsers);
router.get("/users/email", controller.getUserByEmail);
router.get("/users/:id", controller.getUser);
router.put("/users/:id", controller.updateUser);
router.delete("/users/:id", controller.deleteUser);

export default router;