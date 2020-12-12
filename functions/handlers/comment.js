const { db, admin } = require("../utils/admin");

exports.addComment = async (req, res) => {
  const commentData = {
    userName: req.user.userName,
    avatar: req.user.avatar,
    filmId: req.body.filmId,
    content: req.body.content,
  };
  try {
    const filmRef = db.doc(`/films/${commentData.filmId}`);
    //get film name
    const getFilmDoc = await filmRef.get();
    if (getFilmDoc.exists) {
      commentData.filmName = getFilmDoc.data().filmName;
      const addCommentDoc = await db.collection("comments").add(commentData);
      return res.json({ comment: "added successfully" });
    } else {
      return res.status(400).json({ film: "Not existed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

exports.delComment = async (req, res) => {
  const commentId = req.body.commentId;
  try {
    const commentRef = db.doc(`/comments/${commentId}`);
    const commentDoc = await commentRef.get();
    //check if that comment's user ??
    if (commentDoc.data().userName !== req.user.userName) {
      return res.status(401).json({ user: "unauthorized" });
    } else {
      const delCommentDoc = await commentRef.delete();
      return res.json({ comment: "deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

exports.updateComment = async (req, res) => {
  const commentId = req.body.commentId,
    content = req.body.content;
  try {
    const commentRef = db.doc(`/comments/${commentId}`);
    const commentDoc = await commentRef.get();
    //check comment owner
    if (commentDoc.data().userName !== req.user.userName) {
      return res.status(401).json({ user: "unauthorized" });
    } else {
      const updateComment = await commentRef.update({ content });
      return res.json({ comment: "updated successfully" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};
