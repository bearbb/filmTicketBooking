const { db, admin } = require("../utils/admin");

exports.getBookedSeat = async (req, res) => {
  let date = req.params.date,
    cineId = req.params.cineId,
    filmId = req.params.filmId;
  let seatDoc = db
    .collection(`seats`)
    .where("showDateNTime", "==", date)
    .where("cineId", "==", cineId)
    .where("filmId", "==", filmId)
    .limit(1);
  try {
    const getSeatDoc = await seatDoc.get();
    return res.json(getSeatDoc.docs[0].data().seatBooked);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
