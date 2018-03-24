const addStatsModel = require("../models/addStats");
const gameInfoController = require("../controllers/gameInfo");

async function insertAddInfo({ userId }) {
  try {
    const addInfo = await gameInfoController.getGameId(userId);
    const results = await addStatsModel.create(
      addInfo.userId,
      addInfo.gameId,
      addInfo.account,
      "GET"
    );
    return { success: true, message: 'ok', response: addInfo };
  } catch (error) {
    return { success: false, message: error, response: null };
  }
}

async function updateAddInfo({ userId, gameId }, action) {
  const temp = userId.split("_");
  const account = temp[0];
  // const userId = temp[1];
  try {
    const results = await addStatsModel.create(
      userId,
      gameId,
      account,
      action
    );
    return { success: true, message: 'ok', response: results };
  } catch (error) {
    return { success: false, message: error, response: null };
  }
}


// async function updateAddInfo({ userId, gameId }, action) {
//   try {
//     const results = await addStatsModel.updateAddById(
//       action,
//       userId,
//       gameId
//     );
//     return { success: true, message: 'ok', response: results };
//   } catch (error) {
//     return { success: false, message: error, response: null };
//   }
// }

module.exports = { insertAddInfo, updateAddInfo };
