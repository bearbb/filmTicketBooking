const { db, admin } = require("../utils/admin");

exports.booking = async (req, res) => {
  const ticketData = {
    showDateNTime: req.body.showDateNTime,
    cineId: req.body.cineId,
    seatId: req.body.seatId,
    filmId: req.body.filmId,
    ticketPrice: req.body.ticketPrice,

    //Not from request body
    userName: req.user.userName,
  };
  try {
    // const ticketId = addTicketData.id;
    // const addTicketId = await db
    //   .doc(`/tickets/${ticketId}`)
    //   .update({ ticketId });
    //Add new seat booked to seat doc    "userName": "user0"

    const seatDoc = db.doc(
      `/seats/${ticketData.showDateNTime}C${ticketData.cineId}`
    );
    const getSeatDoc = await seatDoc.get();
    let seatBookedUpdated = [];
    seatBookedUpdated = [...getSeatDoc.data().seatBooked, ticketData.seatId];
    const addTicketData = db
      .collection("tickets")
      .doc(
        `${ticketData.showDateNTime}CINE${ticketData.cineId}SEAT${ticketData.seatId}FILM${ticketData.filmId}USER${ticketData.userName}`
      )
      .set(ticketData);
    const updateSeatData = seatDoc.update({ seatBooked: seatBookedUpdated });
    const [addTicketRes, updateSeatRes] = await Promise.all([
      addTicketData,
      updateSeatData,
    ]);
    return res.json({ ticket: "added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

//---------------------------------------SEPARATE----------------------------
exports.delTicket = async (req, res) => {
  const userName = req.user.userName;
  //from body
  const showDateNTime = req.body.showDateNTime;
  const seatId = req.body.seatId;
  const cineId = req.body.cineId;
  const filmId = req.body.filmId;
  try {
    const ticketDoc = db.doc(
      `/tickets/${showDateNTime}CINE${cineId}SEAT${seatId}FILM${filmId}USER${userName}`
    );
    const getTicketDoc = await ticketDoc.get();
    //check if ticket is existed
    //if that not the ticket owner => userName won't fit => no Doc
    if (getTicketDoc.exists) {
      const delTicket = await ticketDoc.delete();
      return res.json({ ticket: "deleted successfully" });
    } else {
      return res.status(400).json({ ticket: "not existed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

//----------------------------------------------SEPARATE---------------------------------------------

exports.getTicketData = async (req, res) => {
  const userName = req.user.userName;
  try {
    const ticketDoc = await db
      .collection("tickets")
      .where("userName", "==", userName)
      .get();
    let rd = [];
    ticketDoc.docs.forEach((doc) => {
      rd.push(doc.data());
    });
    return res.json(rd);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
