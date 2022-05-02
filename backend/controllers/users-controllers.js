const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const user = require('../models/user');

const getUsers = async (req, res, next) => {

  let users
  try {
    users = await User.find({}, '-password')
  } catch (err) {
    return next(new HttpError('Could not retrieve users, try again later',500));
  }

  console.log(users);

  res.json( users.map(u => u.toObject({getters: true})));
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  let user;
  try {
    user = await User.findOne({email: req.body.email});
  } catch (err) {
    return next(new HttpError('Could not create user, try again later',500))
  }

  if(user){
    return next(new HttpError('Email already exists, please login instead',500))
  }

  const createdUser = new User(
    {...req.body, receipts: []} //creating an empty array for receipts to be stored later
  );

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError('Could not create user, try again later',500))
  }

  res.status(201).json({user: createdUser.toObject({getters: true})});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedUser
  try {
    identifiedUser = await User.findOne({email: email});
  } catch (err){
    return next(new HttpError('Could not retrieve user data, try again later',500) );
  }

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(new HttpError('Could not identify user, credentials seem to be wrong.', 401));
  }

  res.json({
    message: 'Logged in!',
    user: identifiedUser.toObject({ getters: true })
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
