const mysql = require("mysql"),
  async = require("async"),
  config = require("../bin/config");
const env = config.env();

const PRODUCTION_DB = "adds_provider",
  TEST_DB = "app_test_database";

exports.MODE_TEST = "mode_test";
exports.MODE_PRODUCTION = "mode_production";

const state = {
  pool: null,
  mode: null
};

exports.connect = function(mode, done) {
  state.pool = mysql.createPool({
    host: env.host || "localhost",
    user: env.user || "root",
    password: env.password || "hammad123",
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
  });
  state.mode = mode;
  done();
};

exports.get = function() {
  return state.pool;
};

// needs to verify
exports.query = function(sql, args) {
  return new Promise((resolve, reject) => {
    get().query(sql, args, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.fixtures = function(data) {
  const pool = state.pool;
  if (!pool) return done(new Error("Missing database connection."));

  const names = Object.keys(data.tables);
  async.each(
    names,
    function(name, cb) {
      async.each(
        data.tables[name],
        function(row, cb) {
          const keys = Object.keys(row),
            values = keys.map(function(key) {
              return "'" + row[key] + "'";
            });

          pool.query(
            "INSERT INTO " +
              name +
              " (" +
              keys.join(",") +
              ") VALUES (" +
              values.join(",") +
              ")",
            cb
          );
        },
        cb
      );
    },
    done
  );
};

exports.drop = function(tables, done) {
  const pool = state.pool;
  if (!pool) return done(new Error("Missing database connection."));

  async.each(
    tables,
    function(name, cb) {
      pool.query("DELETE * FROM " + name, cb);
    },
    done
  );
};
