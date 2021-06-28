const { Router } = require("express");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();
// /api/auth + /register
router.get("/", async (req, res, next) => {
  try {
    res.send("hello");
  } catch (error) {
    next(error);
  }
});

// /api/auth + /login

module.exports = router;
