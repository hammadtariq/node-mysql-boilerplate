const db = require("../config/db.js");

exports.create = function(userId, account, done) {
  return new Promise((resolve, reject) => {
    const values = [userId, account];
    db
      .get()
      .query(
        "INSERT INTO users (userId, account) VALUES(?, ?)",
        values,
        function(err, result) {
          if (err) return reject(err);
          resolve(userId);
        }
      );
  });
};

exports.getAll = function(done) {
  return new Promise((resolve, reject) => {
    db.get().query("SELECT * FROM users", function(err, rows) {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.getAllByUser = function(userId, done) {
  return new Promise((resolve, reject) => {
    db
      .get()
      .query("SELECT * FROM users WHERE userId = ?", userId, function(
        err,
        rows
      ) {
        if (err) return reject(err);
        resolve(rows);
      });
  });
};
