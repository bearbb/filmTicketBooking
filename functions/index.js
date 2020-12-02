const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = require("express")();
app.use(
  cors({
    origin: "https://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
//get an film name
const { getFilmData } = require("./handlers/film");
app.get("/film/:filmId", getFilmData);

exports.api = functions.region("asia-east2").https.onRequest(app);
