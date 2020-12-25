const functions = require("firebase-functions");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = require("express")();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
const auth = require("./utils/userAuth");
const adminAuth = require("./utils/adminAuth");
//User actions
const { signup, login, logout, isLoggedIn, getUser } = require("./user/user");
app.post("/signup", signup);
app.post("/login", login);
app.post("/logout", logout);
app.get("/isLoggedIn", isLoggedIn);
app.get("/getUser", auth, getUser);

//film actions
const {
  getFilmData,
  addFilm,
  deleteFilm,
  updateFilm,
  getAllFilms,
  getUpcomingFilm,
} = require("./handlers/film");
app.post("/addFilm", addFilm);
app.post("/updateFilm/:filmId", updateFilm);
app.delete("/deleteFilm/:filmId", deleteFilm);
app.get("/film/:filmId", getFilmData);
app.get("/getAllFilms", getAllFilms);
app.get("/getUpcomingFilm", getUpcomingFilm);

//ticket actions
const { booking, delTicket, getTicketData } = require("./handlers/ticket");
app.post("/booking", auth, booking);
app.delete("/delTicket", auth, delTicket);
app.get("/getTicketData", auth, getTicketData);
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

//Comment actions
const {
  addComment,
  delComment,
  updateComment,
  getCommentsByFilmId,
} = require("./handlers/comment");
app.post("/addComment", auth, addComment);
app.delete("/deleteComment", auth, delComment);
app.post("/updateComment", auth, updateComment);
app.get("/getComments/:filmId", getCommentsByFilmId);

const {
  addNews,
  delNews,
  updateNews,
  getAllNews,
  getNewsById,
} = require("./handlers/news");
app.post("/addNews", adminAuth, addNews);
app.delete("/deleteNews", adminAuth, delNews);
app.post("/updateNews", adminAuth, updateNews);
app.get("/getAllNews", getAllNews);
app.get("/getNewsById/:newsId", getNewsById);

const {
  getAllCarousels,
  addCarousel,
  delCarousel,
} = require("./handlers/carousel");
app.get("/getAllCarousels", getAllCarousels);
app.post("/addCarousel", adminAuth, addCarousel);
app.delete("/deleteCarousel", adminAuth, delCarousel);

exports.api = functions.region("asia-east2").https.onRequest(app);
