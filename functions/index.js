const functions = require("firebase-functions");
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
const adminAuth = require("./utils/adminAuth");
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
  getAllFilms,
} = require("./handlers/film");
app.post("/addFilm", addFilm);
app.post("/updateFilm/:filmId", updateFilm);
app.delete("/deleteFilm/:filmId", deleteFilm);
app.get("/film/:filmId", getFilmData);
app.get("/getAllFilms", getAllFilms);

//ticket actions
const { booking, delTicket } = require("./handlers/ticket");
app.post("/booking", auth, booking);
app.delete("/delTicket", auth, delTicket);
//shows actions
const {
  addShow,
  delShowByDateNCineId,
  updateShow,
} = require("./handlers/show");
app.post("/addShow", adminAuth, addShow);
app.delete("/deleteShow/", adminAuth, delShowByDateNCineId);
app.post("/updateShow/:showId", adminAuth, updateShow);

//Schedule actions
const {
  getScheduleInNext5Days,
  addNewShowByDate,
} = require("./handlers/schedule");
app.get("/getScheduleInNext5Days", getScheduleInNext5Days);
app.post("/addNewShowByDate", addNewShowByDate);

//Seats
const { getBookedSeat } = require("./handlers/seat");
app.get("/getBookedSeats/:date/:cineId/:filmId", getBookedSeat);

exports.api = functions.region("asia-east2").https.onRequest(app);
