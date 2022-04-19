const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Receipt = require('../models/receipt');
const User = require('../models/user');
const HttpError = require('../models/http-error');

let DUMMY_RECEIPTS = [
  {
    id: 'rcpt1',
    date: '15/04/2022',
    time: '11:52:52',
    store: 'Morissons', //be sure to correct for typo's and match using small caps
    store_branche: 'Byker',
    items: [
      {id: 1, group: 'protein sources', subgroup: 'meat & alternatives', product: 'beef', product_detail: 'beef', footprint_g_100g: 2500, weight_g: 300, price_gbp: 4.2, sourcenote: "from my mind"},
      {id: 2, group: 'dairy & alternatives', subgroup: 'cheese', product: 'mozzarella', product_detail: 'mozzarella', footprint_g_100g: 1000, weight_g: 100, price_gbp: 1, sourcenote: "from my mind"},
    ],
    user: 'u1'
  },  {
    id: 'rcpt2',
    date: '15/04/2022',
    time: '11:52:52',
    store: 'Morissons', //be sure to correct for typo's and match using small caps
    store_branche: 'Byker',
    items: [
      {id: 1, group: 'protein sources', subgroup: 'meat & alternatives', product: 'beef', product_detail: 'beef', footprint_g_100g: 2500, weight_g: 300, price_gbp: 4.2, sourcenote: "from my mind"},
      {id: 2, group: 'dairy & alternatives', subgroup: 'cheese', product: 'mozzarella', product_detail: 'mozzarella', footprint_g_100g: 1000, weight_g: 100, price_gbp: 1, sourcenote: "from my mind"},
    ],
    user: 'u1'
  }
];

const getReceiptById = async (req, res, next) => {
  const receiptId = req.params.rcptid; 

    // send it to Mongo
    let receipt;
    try {
      receipt = await Receipt.findById(receiptId);
    } catch (err) {
      if (err){
        const error = new HttpError("Error retrieving receipt from DB. Does the id exist?",500);
        return next(error); 
      }
    }

  if (!receipt) {
    return next( new HttpError('Could not find a receipt for the provided id.', 404));
  }

  res.json({ receipt: receipt.toObject({getters: true}) }); // convert to normal js object, getters: true removes the _ from _id
};

// alternative ways of writing the function:
// function getreceiptById() { ... }
// const getreceiptById = function() { ... }

const getReceiptByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // send it to Mongo
  let receipts;
  try {
    receipts = await Receipt.find({user: userId });
  } catch (err) {
    if (err){
      const error = new HttpError("Fetching places failed, please try again later",500);
      return next(error); 
    }
  }

  if (!receipts || receipts.length === 0) {
    return next(
      new HttpError('Could not find receipts for the provided user id.', 404)
    );
  }

  res.json({ receipts: receipts.map(receipt => receipt.toObject({ getters: true })) });
};

const createReceipt = async (req, res, next) => {

  // process errors if there are any
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  // populate the receipt
  const newReceipt = new Receipt({
    ...req.body
  });

  //before we save, test if the user name exists

  let user;
  try {
    user = await User.findById(req.body.user);
  } catch (err) {
    const error = new HttpError('Creating receipt failed, please try again', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }
  
  // send it to Mongo -- we have to update two mongoose fields simultaneously, we need sessions to prevent one erroring and the other succeeding and imbalanced data being written
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newReceipt.save({ session: sess });
    user.receipt.push(newReceipt); //special mongoose method (not normal push) to establish the relation and add the id of the receipt behind the scene 
    await user.save({ session: sess, validateModifiedOnly: true  });
    await sess.commitTransaction();
  } catch (err) {
    if (err){
      const error = new HttpError("Creating receipt failed... Please try again",500);
      return next(error); 
    }
  }

  res.status(201).json({ receipt: newReceipt });
};

const updateReceipt = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next( new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const receiptId = req.params.rcptid;

  let receipt;
  try {
    receipt = await Receipt.findByIdAndUpdate(receiptId, {$set: req.body},  { new: true, runValidators: true})
  } catch (err) {
    const error = new HttpError("Updating receipts failed, please try again later",500);
    return next(error); 
  }

  res.status(200).json({ receipt: receipt.toObject({getters: true}) });
};

const deleteReceipt = async (req, res, next) => {
  const receiptId = req.params.rcptid;

  let receipt;
  try {
    receipt = await Receipt.findByIdAndDelete(receiptId);
  } catch (err) {
    return next(new HttpError('Could not find a receipt for that id.', 404));
  }

  if (!receipt) {
    const error = new HttpError('Could not find receipt for this id.', 404);
    return next(error);
  }

  res.status(200).json({ message: 'Deleted receipt.' });
};

exports.getReceiptById = getReceiptById;
exports.getReceiptByUserId = getReceiptByUserId;
exports.createReceipt = createReceipt;
exports.updateReceipt = updateReceipt;
exports.deleteReceipt = deleteReceipt;
