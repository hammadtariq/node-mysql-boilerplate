const addStatsModel = require("../models/addStats");
const gameInfoController = require("../controllers/gameInfo");

async function insertAddInfo({id}) {
  try {
    const addInfo = await gameInfoController.getGameId(id);
    const results = await addStatsModel.create(addInfo.userId, addInfo.gameId, addInfo.account);
    return { success: true, error: null, response: addInfo };
  } catch (error) {
    return { success: false, error: error, response: null };
  }
}

async function updateAddInfo({id}, action) {
  try {
    const results = await addStatsModel.create(action, addInfo.userId, addInfo.gameId);
    return { success: true, error: null, response: addInfo };
  } catch (error) {
    return { success: false, error: error, response: null };
  }
}

module.exports = { insertAddInfo, updateAddInfo };
