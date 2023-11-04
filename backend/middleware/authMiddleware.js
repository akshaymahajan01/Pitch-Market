
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    // get token from header
    const token = req.header("authorization").split(" ")[1];
    // console.log("Received token:", token); // Check the received token

    const decryptedToken = jwt.verify(token, process.env.JWT_SECRECT);
    //console.log("Decoded token:", decryptedToken); // Check the decoded token

    req.body.userId = decryptedToken.userId;
    next();
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
