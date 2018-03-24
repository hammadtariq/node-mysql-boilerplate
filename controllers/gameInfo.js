const gameModel = require("../models/gameInfo");
const uuidV1 = require("uuid/v1");
const config = require("../bin/config");
const env = config.env();

async function getGameId(reqId) {
  const temp = reqId.split("_");
  const account = temp[0];
  const userId = temp[1];
  try {
    const gamesCount = await gameModel.getAllByAccount(account);
    const randId = Math.floor(Math.random() * gamesCount) + 1;
    console.log("count => ", gamesCount);
    console.log("rand => ", rand);
    const addInfo = await gameModel.getOneByGameId(randId);
    const imgUrl = `http://${env.host}:${env.apiPort}/images/${addInfo.gameId}.png`;
    return { userId: reqId, gameId: addInfo.gameId, account, imgUrl };
  } catch (error) {
    return error;
  }
}

module.exports = { getGameId };
