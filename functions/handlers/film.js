const { db, admin } = require("../utils/admin");

exports.getFilmData = async (req, res) => {
  const filmDoc = db.doc(`/films/${req.params.filmId}`);
  try {
    getFilmDoc = await filmDoc.get();
    //check if its exists
    if (getFilmDoc.exists) {
      return res.json(getFilmDoc.data());
    } else {
      return res.status(400).json({ film: "not exists" });
    }
  } catch (err) {
    return res.status(405).json({ error: err });
  }
};
