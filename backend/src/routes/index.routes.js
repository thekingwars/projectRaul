import { Router } from "express";
import {
  createUsers,
  findUserToken,
  logIn,
  register,
} from "../controller/user.controller";
import { notToken } from "../middleware/auth.middleware";
const router = Router();

router.post("/create/users", createUsers);
router.post("/register", register);
router.post("/login", logIn);
router.get("/user", [notToken], findUserToken);

export default router;
