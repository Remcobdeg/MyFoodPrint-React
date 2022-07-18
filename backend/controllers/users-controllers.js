// const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const InvitedUser = require('../models/invitedUser');
// const acceptedUsers = require('../util/acceptedUsers');
// const user = require('../models/user');

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

  let invitedUsers;
  try {
    invitedUsers = await InvitedUser.find({email: req.body.email}) //left of here, find email, check if it returns somthing. delete next bit. don't forget to return to mongoaltas and session use (receipts)
  } catch (err) {
    return next(new HttpError('Could not retrieve users, try again later',500));
  }

  //error if sign-up email is not in the list of invited users
  if(!invitedUsers || invitedUsers.length < 1){
    return next(new HttpError('Not an invited user. Contact admin (Remco) if access should be granted.',500))
  }

  const createdUser = new User(
    {...req.body, receipts: []} //creating an empty array for receipts to be stored later
  );

  //hash the password
  try {
    createdUser.password = await bcrypt.hash(req.body.password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.PRIVATE_KEY,
      { expiresIn: '160h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError('Could not create user, try again later',500))
  }

  res.status(201).json({userId: createdUser.id, email: createdUser.email, token: token});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedUser
  try {
    identifiedUser = await User.findOne({email: email});
  } catch (err){
    return next(new HttpError('Could not retrieve user data, try again later',500) );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }
  
  let token;
  try {
    token = jwt.sign(
      { userId: identifiedUser.id, email: identifiedUser.email },
      process.env.PRIVATE_KEY,
      { expiresIn: '160h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    message: 'Logged in!',
    userId: identifiedUser.id, isAdmin: identifiedUser.is_admin, email: identifiedUser.email, token: token
  });
};

const getInvitedUsers = async (req, res, next) => {

  let invitedUsers;
  try {
    invitedUsers = await InvitedUser.find({})
  } catch (err) {
    return next(new HttpError('Could not retrieve users, try again later',500));
  }

  res.json( invitedUsers.map(u => u.toObject({getters: true})));
};

const createInvitedUsers = async (req, res, next) => {

  let newInvitedUsers;
  if(Array.isArray(req.body)){
    newInvitedUsers = req.body;
  } else {
    newInvitedUsers = [req.body];
  }

  try{
    await InvitedUser.insertMany(newInvitedUsers);
  } catch (err){
    console.log(err);
    return next(new HttpError('Error saving invited users. Try again.',500));
  }

  res.json("added invited user(s): "+newInvitedUsers.map(user => user.email));
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.getInvitedUsers = getInvitedUsers;
exports.createInvitedUsers = createInvitedUsers;
