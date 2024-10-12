const express = require("express");
const { validate } = require("./dist");  // Adjust the path if necessary

const app = express();
const PORT = process.env.PORT || 3000;

// Change from POST to GET, and use req.query to access the email parameter
app.get("/verify", (req, res) => {
  const email = req.query.email;  // Access query parameter 'email'
  
  if (!email) {
    return res.status(400).json({ error: "Email is required as a query parameter" });
  }

  try {
    const isValid = validate(email);  // Use your email validation logic
    res.json({ valid: isValid });
  } catch (error) {
    res.status(500).json({ error: "Validation error", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
