const addStatsModel = require("../models/addStats");
const gameInfoController = require("../controllers/gameInfo");

async function insertAddInfo({ userId }) {
  try {
    const addInfo = await gameInfoController.getGameId(userId);
    const results = await addStatsModel.create(
      addInfo.userId,
      addInfo.gameId,
      addInfo.account
    );
    return { success: true, error: null, response: addInfo };
  } catch (error) {
    return { success: false, error: error, response: null };
  }
}

async function updateAddInfo({ userId, gameId }, action) {
  try {
    const results = await addStatsModel.updateAddById(
      action,
      userId,
      gameId
    );
    return { success: true, error: null, response: results };
  } catch (error) {
    return { success: false, error: error, response: null };
  }
}

module.exports = { insertAddInfo, updateAddInfo };
