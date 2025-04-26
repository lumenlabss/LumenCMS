const userService = require("../services/userService");

exports.getUsers = (req, res) => {
  userService
    .getUsersForDisplay()
    .then((users) => {
      res.render("users", { users });
    })
    .catch((err) => {
      console.error(err); // Gestion des erreurs
      res.status(500).send("Something went wrong!");
    });
};
