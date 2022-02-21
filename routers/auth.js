// module imports
import express from "express";
import { check } from "express-validator";
import { registerUser, loginUser, getUser } from "../controllers/auth.js";
import { validateErrors } from "../middleware/validation.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(auth, getUser)
  .post(
    [
      check("displayName", "displayName is required!").exists(),
      check("email", "correct formatted email is required!").normalizeEmail().isEmail(),
      check("password", "password is required!").exists(),
      validateErrors,
    ],
    registerUser
  );
router
  .route("/login")
  .post(
    [
      check("email", "correct formatted email is required!").normalizeEmail().isEmail(),
      check("password", "password is required!").exists(),
      validateErrors,
    ],
    loginUser
  );

export default router;
