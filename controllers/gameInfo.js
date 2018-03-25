const gameModel = require("../models/gameInfo");
const uuidV1 = require("uuid/v1");
const path = require("path");
const fs = require("fs");

const config = require("../bin/config");
const env = config.env();

function imagesScanner(gameId) {
  const relativePath = path.relative(process.cwd(), "./public/images");
  const files = fs.readdirSync(relativePath);
  let myImg = null;
  console.log("files", files);
  for (const file of files) {
    const imageName = file.split(".");
    if (gameId === imageName[0]) {
      myImg = file;
      return myImg;
    }
  }
  console.log("img add ", myImg);
  
  if (!myImg) {
    return "default.jpg";
  } else {
    return myImg;
  }
}

async function getGameId(reqId) {
  const temp = reqId.split("_");
  const account = temp[0];
  const userId = temp[1];
  try {
    const gamesCount = await gameModel.getAllByAccount(account);
    const randId = Math.floor(Math.random() * gamesCount.length) + 1;
    console.log("count => ", gamesCount.length);
    console.log("rand => ", randId);
    const addInfo = gamesCount[randId - 1];
    const imgName = imagesScanner(addInfo.gameId);
    const imgUrl = `http://${env.host}:${env.apiPort}/images/${imgName}`;
    return {
      userId: reqId,
      gameUrl: addInfo.gameUrl,
      gameId: addInfo.gameId,
      account,
      imgUrl
    };
  } catch (error) {
    return error;
  }
}

module.exports = { getGameId };
