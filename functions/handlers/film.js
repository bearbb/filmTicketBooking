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

//----------------------------SEPARATE----------------------------------------
//Add new film data
exports.addFilm = async (req, res) => {
  let date = new Date();
  let ISOString = date.toISOString();
  const filmData = {
    createAt: ISOString,
    trailerLink: req.body.trailerLink,
    filmName: req.body.filmName,
    description: req.body.description,
    thumbnail: req.body.thumbnail,
    releaseDate: req.body.releaseDate,
    shortName: req.body.shortName,
    //TODO: add showCount if needed
    rating: req.body.rating,
  };
  try {
    //add new film now collection
    const addFilmData = await db.collection("films").add(filmData);
    const filmId = addFilmData.id;
    const updateFilmId = await db.doc(`/films/${filmId}`).update({ filmId });
    return res.json({ film: "added successfully" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

//----------------------------SEPARATE----------------------------------------
exports.deleteFilm = async (req, res) => {
  //delete by id
  const filmId = req.params.filmId;
  try {
    //check if that doc is exists
    const filmDoc = db.doc(`/films/${filmId}`);
    const getFilm = await filmDoc.get();
    if (getFilm.exists) {
      const delFilm = await filmDoc.delete();
      return res.json({ film: "deleted successfully" });
    } else {
      return res.status(400).json({ film: "not existed" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

//----------------------------SEPARATE----------------------------------------

exports.updateFilm = async (req, res) => {
  let currentTime = new Date();
  const ISOString = currentTime.toISOString();
  const filmData = {
    createAt: ISOString,
    trailerLink: req.body.trailerLink,
    filmName: req.body.filmName,
    description: req.body.description,
    thumbnail: req.body.thumbnail,
    releaseDate: req.body.releaseDate,
    shortName: req.body.shortName,
    rating: req.body.rating,
  };
  const filmId = req.params.filmId;
  const filmDoc = db.doc(`/films/${filmId}`);
  try {
    const getFilmDoc = await filmDoc.get();
    let filmDocIsExists = getFilmDoc.exists;
    if (filmDocIsExists) {
      const updateFilmData = await filmDoc.update(filmData);
      return res.json({ film: "updated successfully" });
    } else {
      return res.status(400).json({ film: "not existed" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//----------------------------SEPARATE----------------------------------------
