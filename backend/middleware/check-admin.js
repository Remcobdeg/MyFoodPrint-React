const HttpError = require('../models/http-error');
const User = require('../models/user');

// make sure routes are only accessible if the user is the admin

module.exports = async (req,res,next) => {

  try {
    const userId = req.userData.userId;

    try {
      user = await User.findById(userId);
    } catch (err) {
      console.log(err);
      return next(err);
    }

    if(!!user.is_admin){
      next();
    } else {
      return next(new HttpError("Only accessible by admin", 403))
    }

  } catch (err){
    return next(new HttpError("Only accessible by logged-in admin", 403))
  }
  
}