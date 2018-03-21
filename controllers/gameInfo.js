const gameModel = require("../models/gameInfo");
const uuidV1 = require("uuid/v1");
const config = require("../bin/config");
const env = config.env();

async function getGameId({ id }) {
  const temp = id.split(":");
  const account = temp[0];
  const userId = temp[1];
  try {
    const gamesCount = await gameModel.getAllByAccount(account);
    const randId = Math.floor(Math.random() * gamesCount) + 1;
    console.log("count => ", gamesCount);
    const addInfo = await gameModel.getOneByGameId(randId);
    const imgUrl = "http://"+env.host + ":" + env.apiPort + "/images/" + addInfo.gameId + ".png";
    return {
      success: true,
      error: null,
      response: { gameName: addInfo.gameId, imgUrl }
    };
  } catch (error) {
    return { success: false, error: error, response: null };
  }
}

module.exports = { getGameId };
