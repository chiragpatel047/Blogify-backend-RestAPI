const express = require('express');
const { signup, login } = require('../Controller/UserController');
const userRouter = express.Router();

userRouter.post("/signup",signup);

userRouter.post("/login",login);

module.exports = userRouter;