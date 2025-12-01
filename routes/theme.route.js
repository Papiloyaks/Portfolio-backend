const express = require("express");
const router = express.Router();

let theme = "dark";

router.get("/", (req, res) => res.json({ theme }));

router.post("/", (req, res) => {
  const { newTheme } = req.body;
  if (newTheme === "dark" || newTheme === "light") {
    theme = newTheme;
    return res.json({ success: true, theme });
  }
  res.status(400).json({ success: false, message: "Invalid theme" });
});

module.exports = router;
