const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const Account = require("../models/Account");

router.get("/me", authenticate, async (req, res) => {
  const account = await Account.findOne({ userId: req.user.id });
  if (!account) return res.status(404).json({ error: "Account not found" });
  res.json({ accountId: account._id, userId: account.userId });
});

module.exports = router;
