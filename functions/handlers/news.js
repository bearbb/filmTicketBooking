const { db, admin } = require("../utils/admin");

exports.addNews = async (req, res) => {
  const currentTime = new Date();
  const newsData = {
    //not from request body
    createAt: currentTime,

    //from request body
    author: req.body.author,
    content: req.body.content,
    thumbnailLink: req.body.thumbnailLink,
    title: req.body.title,
    videoLink: req.body.videoLink,
  };
  try {
    const addNewsDoc = await db.collection("news").add(newsData);
    return res.json({ news: "added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

exports.delNews = async (req, res) => {
  const newsId = req.body.newsId;
  const newsRef = db.doc(`/news/${newsId}`);
  try {
    //check if news exists
    const newsDoc = await newsRef.get();
    if (!newsDoc.exists) {
      return res.status(400).json({ news: "not existed" });
    } else {
      const delNewsDoc = await newsRef.delete();
      return res.json({ news: "deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

exports.updateNews = async (req, res) => {
  const newsId = req.body.newsId;
  const content = req.body.content;
  const newsRef = db.doc(`/news/${newsId}`);
  try {
    //check if news exists
    const newsDoc = await newsRef.get();
    if (!newsDoc.exists) {
      return res.status(400).json({ news: "not existed" });
    } else {
      const updateNews = newsRef.update({ content });
      return res.json({ news: "update successfully" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

exports.getAllNews = async (req, res) => {
  let returnedData = [];
  try {
    const allNewsRef = db.collection("news");
    const allNewsDoc = await allNewsRef.get();
    allNewsDoc.forEach((doc) => {
      let newsData = doc.data();
      newsData.newsId = doc.id;
      returnedData.push(newsData);
    });
    return res.json(returnedData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

exports.getNewsById = async (req, res) => {
  const newsId = req.params.newsId;
  const newsRef = db.doc(`/news/${newsId}`);
  try {
    const newsDoc = await newsRef.get();
    if (newsDoc.exists) {
      return res.json(newsDoc.data());
    } else {
      return res.status(400).json({ news: "not existed" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
