const db = require("../database");

exports.getUsersForDisplay = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};
