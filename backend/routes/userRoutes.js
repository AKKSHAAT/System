import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
const SECRET_KEY = "test_sec_key";

router.get("/", (req, res) => {
  res.send("all users");
});

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ msg: "data missing" });
    }

    const userFound = await User.findOne({ where: {email: email} });
    if (userFound) return res.status(400).json({ msg: "user with this email alredy exists" });

    const hash = bcrypt.hashSync(password, 10);
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
    });

    return res.status(200).json(createdUser);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ msg: "user not found" });
    console.log("hash", userFound.password, " pass: ", password);

    const isPasswordValid = bcrypt.compareSync(password, userFound.password);
    if (!isPasswordValid) return res.status(400).json({msg: "invalid password"});

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    console.log("Token", token, "\n");
    return res.status(200).json({token, username: userFound.firstName});
  } catch (err) {
    console.log(err);
  }
});

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ msg: "user not found" });

    return res.status(200).json({
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email,
    });
  } catch (error) {}
});

router.get("/new-password", async (req, res) => {
  const { email } = req.params;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ msg: "user not found" });

    return res.status(200).json({
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email,
    });
  } catch (error) {}
});


router.post('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}); 


export default router;
