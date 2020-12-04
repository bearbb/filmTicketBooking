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
const auth = require("./utils/authen");
//User actions
const { signup, login } = require("./user/user");
app.post("/signup", signup);
app.post("/login", login);

//film actions
const {
  getFilmData,
  addFilm,
  deleteFilm,
  updateFilm,
} = require("./handlers/film");
app.post("/addFilm", addFilm);
app.post("/updateFilm/:filmId", updateFilm);
app.delete("/deleteFilm/:filmId", deleteFilm);
app.get("/film/:filmId", getFilmData);

//ticket actions
const { booking } = require("./handlers/ticket");
app.post("/booking", auth, booking);
//shows actions
const { addShow, delShow, updateShow } = require("./handlers/show");
app.post("/addShow", addShow);
app.delete("/deleteShow/:showId", delShow);
app.post("/updateShow/:showId", updateShow);
exports.api = functions.region("asia-east2").https.onRequest(app);
