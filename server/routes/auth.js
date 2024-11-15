const express = require("express");
const { body } = require("express-validator");

const User = require("../models/User.model");
const Users = require("../controllers/Users");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
  ],
  Users.Signup
);

router.post("/login", Users.Login);
router.put("/update/:id", Users.Update);
router.get("/user/:id", Users.GetById);

module.exports = router;
