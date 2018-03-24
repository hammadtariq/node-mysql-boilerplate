const moment = require("moment");
const db = require("../config/db.js");

exports.create = function(userId, account) {
  return new Promise((resolve, reject) => {
    const unixTimestamp = moment().unix();
    const values = [userId, account, unixTimestamp];
    db
      .get()
      .query(
        "INSERT INTO game_info (userId, account, timestamp) VALUES(?, ?, ?)",
        values,
        function(err, result) {
          if (err) return reject(err);
          resolve(userId);
        }
      );
  });
};

exports.getAll = function() {
  return new Promise((resolve, reject) => {
    db.get().query("SELECT * FROM game_info", function(err, rows) {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.getAllByAccount = function(account) {
  return new Promise((resolve, reject) => {
    db
      .get()
      .query(
        "SELECT * FROM game_info WHERE account = ?",
        account,
        function(err, rows) {
          if (err) return reject(err);
          resolve(rows);
        }
      );
  });
};

exports.getOneByGameId = function(id) {
  return new Promise((resolve, reject) => {
    db
      .get()
      .query("SELECT * FROM game_info WHERE id = ?", id, function(err, rows) {
        if (err) return reject(err);
        resolve(rows[0]);
      });
  });
};
