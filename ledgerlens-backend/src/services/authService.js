const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Account = require("../models/Account");

const SALT_ROUNDS = 10;

async function signup({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already in use");

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ name, email, passwordHash });

  // Auto-provision one Account per new user
  const account = await Account.create({ userId: user._id });

  const token = generateToken(user);
  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
    accountId: account._id,
  };
}

async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  const token = generateToken(user);
  return { token, user: { id: user._id, name: user.name, email: user.email } };
}

function generateToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

module.exports = { signup, login };
