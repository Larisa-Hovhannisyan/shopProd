const Product = require("../models/Product");

exports.listProducts = async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const products = await Product.find();
  res.render("dashboard", { user: req.session.user, products });
};

exports.getAddProduct = (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  if (req.session.user.role !== "admin") {
    return res.send("Access denied: Admins only.");
  }
  res.render("addProduct", { user: req.session.user });
};

exports.postAddProduct = async (req, res) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.send("Access denied.");
  }

  const { name, price, description } = req.body;
  await Product.create({ name, price, description });
  res.redirect("/dashboard");
};
