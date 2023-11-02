require("dotenv").config();
const jwt = require("jsonwebtoken");

const UserServices = require("../services/UserServices.js");

class UserController {
  async signup(req, res) {
    let { email, name, role, password } = req.body;

    try {
      // Check if the username is already taken
      const existingUser = await UserServices.get({ email: email });
      console.log(existingUser);
      if (existingUser) {
        return res.status(409).json({
          error: true,
          message: "Username already exists.",
        });
      }

      let user = await UserServices.create({
        email: email,
        name: name,
        role: role,
        password: password,
      });

      if (user) {
        return res.status(200).json({
          error: false,
          message: "Signup Successful.",
        });
      } else {
        return res
          .status(400)
          .json({ error: true, message: "Signup Failure." });
      }
    } catch (error) {
      console.log("Signup Error", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error." });
    }
  }

  async signin(req, res) {
    let { email, password } = req.body;
    try {
      const user = await UserServices.get({ email: email });

      if (!user) {
        return res.status(404).json({
          error: true,
          message: "User not found.",
        });
      }

      let originalPassword = user.password;
      let passwordIsValid = originalPassword === password;

      if (!passwordIsValid) {
        return res.status(401).json({
          error: true,
          accessToken: null,
          message: "Invalid Login Credentials",
        });
      }

      // User is authenticated, generate tokens
      let accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      }); // 1 day
      user.password = undefined;
      return res.status(200).send({
        error: false,
        user: user,
        message: "Sign-in Successful",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = new UserController();
