const { db, admin } = require("../utils/admin");

exports.getAllCarousels = async (req, res) => {
  try {
    const allCarouselsDoc = await db.collection("carousels").get();
    let payload = [];
    allCarouselsDoc.docs.forEach((doc) => {
      payload.push(doc.data());
    });
    return res.json(payload);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

//----------------------------SEPARATE----------------------------------------

exports.addCarousel = async (req, res) => {
  const carouselData = {
    filmId: req.body.filmId,
    filmName: "",
    thumbnailLink: req.body.thumbnailLink,
    trailerLink: req.body.trailerLink,
  };
  try {
    //get film data
    const filmDoc = await db.doc(`/films/${carouselData.filmId}`).get();
    if (filmDoc.exists) {
      carouselData.filmName = filmDoc.data().filmName;
      const addCarouselRes = db.collection("carousels").add(carouselData);
      return res.json({ carousel: "added successfully" });
    } else {
      return res.status.json({ film: "not existed" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err });
  }
};
