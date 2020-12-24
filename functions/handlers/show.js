const { db, admin } = require("../utils/admin");

exports.addShow = async (req, res) => {
  //TODO: when add new show, loop through all show time and add it to shows collection
  const showData = {
    filmId: req.body.filmId,
    filmName: req.body.filmName,
    showTime: req.body.showTime,
    cineId: req.body.cineId,
    ticketPrice: req.body.ticketPrice,
    showDate: req.body.showDate,
    //TODO: add cine type, show type (2D, 3D,...)
  };
  try {
    //check existed
    const showDoc = db.doc(
      `showByDate/${showData.showDate}/shows/${showData.cineId}`
    );
    const getShowDoc = await showDoc.get();
    if (getShowDoc.exists) {
      //if exist then return that already exist
      return res.status(400).json({ show: "already existed" });
    } else {
      let date = new Date(showData.showDate);
      const addNewShow = db
        .collection("showByDate")
        .doc(`${showData.showDate}`)
        .set({ showDate: date });
      const addNewShowsCollection = db
        .collection("showByDate")
        .doc(`${showData.showDate}`)
        .collection("shows")
        .doc(`${showData.cineId}`)
        .set(showData);
      const showTimeArr = showData.showTime;
      let newSeatsArr = [];
      showTimeArr.forEach((showTime) => {
        newSeatsArr.push(`${showData.showDate}T${showTime}`);
      });
      //add new Seat doc for each showTime
      const addNewSeats = newSeatsArr.map(async (seat) => {
        const addSeatData = await db
          .collection("seats")
          .doc(`${seat}C${showData.cineId}`)
          .set({
            cineId: showData.cineId,
            filmId: showData.filmId,
            seatBooked: [],
            showDateNTime: seat,
          });
      });
      const [
        addNewShowRes,
        addNewShowsCollectionRes,
        addNewSeatsRes,
      ] = await Promise.all([addNewShow, addNewShowsCollection, addNewSeats]);
      return res.json({ show: "added successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

//----------------------------SEPARATE-------------------------------------
exports.delShowByDateNCineId = async (req, res) => {
  const showDate = req.body.showDate;
  const cineId = req.body.cineId;
  const showByDateDoc = db.doc(`/showByDate/${showDate}/shows/${cineId}`);
  try {
    const getShowByDateDoc = await showByDateDoc.get();
    if (getShowByDateDoc.exists) {
      //then del all seat doc with its showtime
      let showTime = getShowByDateDoc.data().showTime;
      let filmId = getShowByDateDoc.data().filmId;
      let showDateNTime = [];
      showTime.forEach((time) => {
        showDateNTime.push(`${showDate}T${time}`);
      });
      console.log(showDateNTime);
      const delSeatsData = showDateNTime.map(async (doc) => {
        const seatRef = db.doc(`/seats/${doc}C${cineId}`);
        const delSeatData = await seatRef.delete();
      });
      const delSeats = await Promise.all(delSeatsData);
      const delShowByDate = await showByDateDoc.delete();
      return res.json({ show: "Deleted successfully" });
    } else {
      return res.status(400).json({ show: "not existed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

//----------------------------SEPARATE-------------------------------------
//Should not use this route =))
exports.updateShow = async (req, res) => {
  const showData = {
    filmId: req.body.filmId,
    showTime: req.body.showTime,
    cineId: req.body.cineId,
    ticketPrice: req.body.ticketPrice,
    //TODO: add cine type, show type (2D, 3D,...)
  };
  const showId = req.params.showId;
  const showDoc = db.doc(`/shows/${showId}`);
  try {
    const getShowDoc = await showDoc.get();
    if (getShowDoc.exists) {
      const updateShow = await showDoc.update(showData);
      return res.json({ show: "updated successfully" });
    } else {
      return res.status(400).json({ show: "not existed" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
