const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const isAuthorized = require("../middleware/auth");

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!(first_name && last_name && email && password)) {
    return res.status(400).send("All fields are required!");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).send("Email already in use");
  }
  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    first_name,
    last_name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  const token = jwt.sign(
    {
      uid: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  user.token = token;
  user.password = undefined;

  return res.status(201).json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).send("All fields are required!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).send("No user found with this email!");
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        uid: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({ token });
  } else {
    res.status(400).send("Passwords do not match");
  }
});

router.get("/getMyUser", isAuthorized, async (req, res) => {
  const user = await User.findById(req.decodedToken.uid);

  if (!user) {
    return res.status(404).send("User not found");
  }

  user.password = undefined;

  return res.send(user);
});

router.get("/getUserById", isAuthorized, async (req, res) => {
  const { user_id } = req.body;

  const user = await User.findById(user_id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  user.password = undefined;

  return res.send(user);
});

module.exports = router;
