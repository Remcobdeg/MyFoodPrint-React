const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    // console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }

    //temporarily overwrite userid if its the super user (temp)
    if(token === "iamthesuperuser"){
      console.log("tried superuser"); 
      req.userData = { userId: "superuserID" };
      throw new Error('Super user not allowed!');
    } else {
      const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
      req.userData = { userId: decodedToken.userId };
    }
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
