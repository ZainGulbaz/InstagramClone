const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");

module.exports = (req, res, next) => {
  // console.log("MiddleWare");
  const { authorization } = req.headers;

  if (!authorization) {
    //authorization=== Bearer sadda123sda2kg48y1          ----(token)
    return res.status(401).json({ error: "you must be loged in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be loged in" });
    } else {
      // console.log("Here");
      const { id } = payload;

      User.findById(id, (err, userData) => {
        req.user = userData;
        next();
    });
    }

   
  });
};
