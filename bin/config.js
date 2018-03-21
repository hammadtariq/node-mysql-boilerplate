let fs = require("fs");

let config;
(function Config() {
  const environment = process.env.PT_ENV;
  const envFile = require("path").join(
    __dirname,
    `../config/${environment}.env.json`
  );
  let env = {};

  if (fs.statSync(envFile)) {
    var envData = fs.readFileSync(envFile, "utf-8");
    try {
      env = JSON.parse(envData);
    } catch (e) {
      throw new Error(`Failed to parse configuration file ${environment}`);
    }
  } else {
    throw new Error(
      `Missing configuration file for environment ${environment}`
    );
  }
  config = Object.assign(
    {},
    {
      env: env,
      debug: env["debug"],
      apiHost: env["api"],
      host: env["host"],
      database: env["database"],
      user: env["user"],
      password: env["password"],
      dbUri: env["dbUri"] // || throw new ConfigurationError("Missing configuration entry for MongoDB"),
    }
  );
})();

function debug() {
  return getProperty("debug");
}

function apiPort() {
  return getProperty("apiPort");
}

function apiHost() {
  return getProperty("apiHost");
}

function databaseUrl() {
  return getProperty("dbUri");
}

function env() {
  return getProperty("env");
}

function getProperty(name) {
  return config[name];
}

module.exports = { debug, apiPort, databaseUrl, env, apiHost };
