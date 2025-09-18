const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.postRegister = async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    await User.create({ username, password: hashed, role });
    res.redirect("/login");
  } catch (err) {
    res.send("Error: " + err.message);
  }
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.send("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send("Invalid password");

  req.session.user = { id: user._id, role: user.role, username: user.username };
  res.redirect("/dashboard");
};

// exports.getDashboard = (req, res) => {
//   if (!req.session.user) return res.redirect("/login");
//   res.render("dashboard", { user: req.session.user });
// };

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
