const express = require("express");
const { validate } = require("./dist");  // Path to the built module

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API route to validate email addresses
app.post("/verify-email", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const isValid = validate(email);  // Use your validation logic here
    res.json({ valid: isValid });
  } catch (error) {
    res.status(500).json({ error: "Validation error", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
