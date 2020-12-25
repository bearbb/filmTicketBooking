// const { db, admin } = require("../utils/admin");

// exports.getAllCarousels = async (req, res) =>{
//     try{
//         const allCarouselsDoc = await db.collection("carousels").get()
//         let payload = []
//         allCarouselsDoc.docs.forEach(doc =>{
//             payload.push(doc.data())
//         })
//         return res.json(payload)
//     }
//     catch(err){
//         console.error(err);
//         return re
//     }
// }
