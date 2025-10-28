const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  verifyToken,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

router.post(
  "/image",
  verifyToken,
  authorizeRoles("admin"),
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "Vui lòng chọn file" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  }
);

module.exports = router;