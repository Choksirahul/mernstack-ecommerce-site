const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log(name, email, password);

      const user = await Users.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "Email already registered!" });
      }

      if (!password) {
        return res.status(400).json({ msg: "Password is required!" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters!" });
      }

      // Password encryption
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      // Save the data in MongoDB
      await newUser.save();

      // Create jwt for authentication
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/",
      });

      res.json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshtoken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) {
        return res.status(400).json({ msg: "Please Login or Registers" });
      }

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(400).json({ msg: "Please Login or Register" });
        }

        const accessToken = createAccessToken({ id: user.id });
        res.json({ user, accessToken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "User doesn't exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect Password" });
      }

      // Create jwt for authentication
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/",
      });

      res.json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/" });
      return res.json({ msg: "Logged out successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");

      if (!user) {
        return res.status(400).json({ msg: "User Not Found" });
      }

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userCtrl;
