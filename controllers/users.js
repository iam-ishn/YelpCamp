const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("Users/register");
};
module.exports.createUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next();
      req.flash("success", "Welcome to Yelp Camp");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("Users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome Back");
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  res.redirect(redirectUrl);
  delete req.session.returnTo;
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      req.flash("error", err.message);
    } else {
      req.flash("success", "GoodBye");
      res.redirect("/campgrounds");
    }
  });
};
