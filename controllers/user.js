const userModel = require("../models/user");
const uuidV1 = require("uuid/v1");

async function getUserId({ account }) {
  const id = uuidV1();
  const userId = account + ":" + id;
  try {
    const results = await userModel.create(userId, account);
    return { success: true, error: null, response: results };
  } catch (error) {
    return { success: false, error: error, response: null };
  }
}

module.exports = { getUserId };
