const { db, admin } = require("./admin");

module.exports = async (req, res, next) => {
  let idToken;
  if (
    req.cookies.authorization &&
    `${req.cookies.authorization}`.startsWith("Bearer")
  ) {
    idToken = `${req.cookies.authorization}`.split(" ")[1];
  } else {
    console.error("NO TOKEN FOUND");
    return res.status(406).json({ error: "unauthorized" });
  }
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    let userId = decodedIdToken.uid;
    const adminDoc = db
      .collection("admins")
      .where("userId", "==", userId)
      .limit(1);
    const getAdminData = await adminDoc.get();
    let isExisted;
    if (getAdminData.docs.length === 1) {
      isExisted = true;
    } else {
      isExisted = false;
    }
    if (isExisted) {
      //TODO:
      //   req.user.userName = getAdminData.docs[0].data().userName;
      //   req.user.avatar = getAdminData.docs[0].data().avatar;
      //   req.user.displayName = getAdminData.docs[0].data().displayName;
      console.log(getAdminData.docs[0].data());
      return next();
    } else {
      return res.status(401).json({ error: "unauthorized" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};
