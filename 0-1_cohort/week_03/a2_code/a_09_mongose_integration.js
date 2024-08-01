const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
// Connect to MongoDB
mongoose.connect("mongodb+srv://priyanshgarg:NfayfduqyfrG0zml@cluster0.ccptlxb.mongodb.net/harki")
// Define a Mongoose model for users
const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

// Secret key for JWT signing
const jwtPassword = "123456";
// Route for user signup
app.post("/signup", async function (req, res) {
  const { username, email, password } = req.body; // Destructure username, email, and password from the request body

  try {
    // Correct the check to find a user with the same email
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({
      name: username,
      email: email,
      password: hashedPassword,
    });

    await user.save();
    res.json({
      msg: "User created successfully",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Route for user sign-in
app.post("/signin", async function (req, res) {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(403).json({
        msg: "Invalid username or password",
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        msg: "Invalid username or password",
      });
    }

    // Create a JWT token
    const token = jwt.sign({ username: user.email }, jwtPassword);
    return res.json({
      token,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get a list of users, excluding the one identified by the token
app.get("/users", async function (req, res) {
  const token = req.headers.authorization;

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;

    // Find all users except the current one
    const users = await User.find({ email: { $ne: username } });

    return res.status(200).json(users);
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
