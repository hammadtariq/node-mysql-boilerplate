const userModel = require("../models/user");
const uuidV1 = require("uuid/v1");

async function getUserId({ account }) {
  const id = uuidV1();
  const userId = account + "_" + id;
  try {
    const results = await userModel.create(userId, account);
    return { success: true, message: 'ok', response: { userId: results } };
  } catch (error) {
    return { success: false, message: error, response: null };
  }
}

module.exports = { getUserId };
