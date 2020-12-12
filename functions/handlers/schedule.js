const { db, admin } = require("../utils/admin");

exports.getScheduleInNext5Days = async (req, res) => {
  let currentDate = new Date();
  let currentDateInString = currentDate.toDateString();
  currentDate = new Date(currentDateInString);
  const scheduleDoc = db
    .collection("showByDate")
    .orderBy("showDate", "asc")
    .where("showDate", ">=", currentDate)
    .limit(5);
  try {
    const getSchedule = await scheduleDoc.get();
    let scheduleData = [];
    getSchedule.docs.forEach((doc) => {
      scheduleData.push({ showId: doc.id });
    });
    const payload = scheduleData.map(async (doc) => {
      const showData = await db
        .collection("showByDate")
        .doc(`${doc.showId}`)
        .collection("shows")
        .get();
      let shows = [];
      showData.docs.forEach((show) => {
        shows.push(show.data());
      });
      return { showId: doc.showId, shows };
    });
    let returnedData = await Promise.all(payload);
    return res.json(returnedData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

exports.addNewShowByDate = async (req, res) => {
  const date = new Date("2020-12-10T00:00");
  try {
    const addNewShow = db.collection("showByDate").doc("2020-12-10").set({
      showDate: date,
    });
    return res.json({ newShow: "added successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
