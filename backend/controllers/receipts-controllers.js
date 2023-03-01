const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const async_ = require('async');
const fs = require('fs');

const Receipt = require('../models/receipt');
const User = require('../models/user');
const HttpError = require('../models/http-error');
const moment = require('moment');
var path = require('path');
const e = require('express');

//NOTE: each receipt that is added is automatically assumed not to be checked off! (is_checked_off: false)

// let DUMMY_RECEIPTS = [
//   {
//     id: 'rcpt1',
//     date: '15/04/2022',
//     time: '11:52:52',
//     store: 'Morissons', //be sure to correct for typo's and match using small caps
//     store_branche: 'Byker',
//     items: [
//       { id: 1, group: 'protein sources', subgroup: 'meat & alternatives', product: 'beef', product_detail: 'beef', footprint_g_100g: 2500, weight_g: 300, price_gbp: 4.2, sourcenote: "from my mind" },
//       { id: 2, group: 'dairy & alternatives', subgroup: 'cheese', product: 'mozzarella', product_detail: 'mozzarella', footprint_g_100g: 1000, weight_g: 100, price_gbp: 1, sourcenote: "from my mind" },
//     ],
//     user: 'u1'
//   }, {
//     id: 'rcpt2',
//     date: '15/04/2022',
//     time: '11:52:52',
//     store: 'Morissons', //be sure to correct for typo's and match using small caps
//     store_branche: 'Byker',
//     items: [
//       { id: 1, group: 'protein sources', subgroup: 'meat & alternatives', product: 'beef', product_detail: 'beef', footprint_g_100g: 2500, weight_g: 300, price_gbp: 4.2, sourcenote: "from my mind" },
//       { id: 2, group: 'dairy & alternatives', subgroup: 'cheese', product: 'mozzarella', product_detail: 'mozzarella', footprint_g_100g: 1000, weight_g: 100, price_gbp: 1, sourcenote: "from my mind" },
//     ],
//     user: 'u1'
//   }
// ];

const getReceiptById = async (req, res, next) => {
  const receiptId = req.params.rcptid;

  // send it to Mongo
  let receipt;
  try {
    receipt = await Receipt.findById(receiptId);
  } catch (err) {
    if (err) {
      const error = new HttpError("Error retrieving receipt from DB. Does the id exist?", 500);
      return next(error);
    }
  }

  if (!receipt) {
    return next(new HttpError('Could not find a receipt for the provided id.', 404));
  }

  res.json({ receipt: receipt.toObject({ getters: true }) }); // convert to normal js object, getters: true removes the _ from _id
};

// alternative ways of writing the function:
// function getreceiptById() { ... }
// const getreceiptById = function() { ... }

const getReceiptByUserId = async (req, res, next) => {
  const userId = req.userData.userId;//req.params.uid;


  // send it to Mongo
  let receipts;
  try {
    receipts = await Receipt.find({ 
      $and: [
        { user: userId },
        { is_checked_off: true}
      ]
    }); //can alternativily use the reference technique again (as used for creating and deleting below. --> userWithReceipts = await User.findById(userId).populate('receipts'))
  } catch (err) {
    if (err) {
      const error = new HttpError("Fetching places failed, please try again later", 500);
      return next(error);
    }
  }

  if (!receipts || receipts.length === 0) {
    return next(
      new HttpError('Could not find receipts for the provided user id.', 404)
    );
  }

  //convert the receipt date string to a date format the 'Date' object can understand
  receipts.forEach(receipt => {receipt.date = moment(receipt.date, "DD/MM/YYYY").toDate()});

  res.json({ receipts: receipts.map(receipt => receipt.toObject({ getters: true })) }); //aligning with the populate approach above, this would become receipts: userWithReceipts.receipts.map(receipt => 
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
  const dateRecorded = new Date();
  const newReceipt = new Receipt({
    ...req.body, date_recorded: dateRecorded, is_checked_off: false
  });

  //before we save, test if the user name exists

  let user;
  try {
    user = await User.findById(req.userData.userId);
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
    user.receipts.push(newReceipt); //special mongoose method (not normal push) to establish the relation and add the id of the receipt behind the scene 
    await user.save({ session: sess, validateModifiedOnly: true });
    await sess.commitTransaction();
  } catch (err) {
    if (err) {
      console.log(err);
      const error = new HttpError("Creating receipt failed... Please try again", 500);
      return next(error);
    }
  }

  res.status(201).json({ receipt: newReceipt });
};


const createReceiptMany = async (req, res, next) => {

  // TO DO: define users that are allowed to perform this operation and check these I'd against the provided token -- route currently disabled

  // process errors if there are any
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  // populate the receipt
  const dateRecorded = new Date();
  const newReceiptMany = req.body.map(receipt => new Receipt({ ...receipt, date_recorded: dateRecorded, is_checked_off: false }));

  //before we save, test if the user name exists

  let users = Array.from(new Set(req.body.map(receipt => receipt.user)));


  if(!!users){users = [req.userData.userId]};

  try {
    foundUsers = await User.find({ _id: { $in: users } }, '-password');
  } catch (err) {
    console.log(err);
    const error = new HttpError('Bollucks, Creating receipt failed, please try again', 500);
    return next(error);
  }

  // check if all the users were found and, if not, notify which weren't found
  if (foundUsers.length !== users.length || !foundUsers) {
    const foundID = foundUsers.map(user => user.toObject({ getters: true }).id);
    const missingID = users.filter(user => !foundID.includes(user));
    const error = new HttpError('Could not find user for provided id(s): ' + missingID, 404);
    return next(error);
  }

  //check if the user is either a super user of the user adding their own receipts
  if (req.userData.userId !== "superuserID" && req.userData.userId !== foundUsers[0].id) {
    const error = new HttpError('Not authorized. Logged in user does not match user on receipt', 403);
    return next(error);
  }

  //send it to Mongo -- we have to update two mongoose fields simultaneously, we need sessions to prevent one erroring and the other succeeding and imbalanced data being written  
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Receipt.insertMany(newReceiptMany, { session: sess });
    // update the users by adding the new receipt (aka item) ids
    await async_.forEachOf(foundUsers, (foundUser, key, callback) => {
      const newReceipts = (newReceiptMany.filter(receipt => String(receipt.user) === String(foundUser._id)));
      newReceipts.forEach(newReceipt => foundUser.receipts.push(newReceipt));
      User.updateOne({ _id: foundUser._id }, { receipts: foundUser.receipts }, function (err) {
        if (err) {
          console.log(err);
        } else { console.log("entry successfully updated"); }
      });
    }, err => {
      if (err) {
        console.error(err.message);
        return (err);
      }
    });

    await sess.commitTransaction();
  } catch (err) {
    if (err) {
      console.log(err);
      const error = new HttpError("Creating receipt failed... Please try again", 500);
      return next(error);
    }
  }

  // //send it to Mongo -- local mongoDB alternative to sessions!!
  // try {
  //   await Receipt.insertMany(newReceiptMany);
  // } catch (err) {
  //   if (err) {
  //     console.log(err);
  //     const error = new HttpError("Creating receipt failed... Please try again", 500);
  //     return next(error);
  //   }
  // }

  res.status(201).json({ receipt: newReceiptMany });
};

const updateReceipt = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  if (!req.body.user === req.userData.userId) {
    return next(new HttpError('Could not update receitp. User ID on receipt does not match logged in user.', 422));
  }

  const receiptId = req.params.rcptid;

  let receipt;
  try {
    receipt = await Receipt.findByIdAndUpdate(receiptId, { $set: req.body }, { new: true, runValidators: true })
  } catch (err) {
    const error = new HttpError("Updating receipts failed, please try again later", 500);
    return next(error);
  }

  res.status(200).json({ receipt: receipt.toObject({ getters: true }) });
};

const deleteReceipt = async (req, res, next) => {
  const receiptId = req.params.rcptid;

  let foundReceipt;
  try {
    foundReceipt = await Receipt.findById(receiptId).populate('user', '-password'); //populate works because we have established the connection to User in the model. user refers to the user element in Receipt
  } catch (err) {
    return next(new HttpError('Something went wrong, could not delete receipt', 500));
  }

  if (!foundReceipt) {
    const error = new HttpError('Could not find receipt for this id.', 404);
    return next(error);
  }

  if (!foundReceipt.user.id === req.userData.userId) {
    const error = new HttpError('Deletion not authorized. User ID on receipt does not match logged in user.', 403);
    return next(error);
  }

  try {
    sess = await mongoose.startSession();
    sess.startTransaction();
    await foundReceipt.remove({ session: sess });
    foundReceipt.user.receipts.pull(foundReceipt);
    await foundReceipt.user.save({ session: sess, validateModifiedOnly: true });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Something went wrong, could not delete receipt.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted receipt.' });
};

const fetchImageByName = async (req, res, next) => {
  const imageName = req.params.imageName;
  try {
    await res.status(200).sendFile(path.resolve('images/' + imageName));
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Something went wrong, could not delete receipt.',
      500
    );
    return next(error);
  }
};

const deleteImageByName = async (req, res, next) => {
  const imageName = req.params.imageName;
  var path = require('path');
  try {
    fs.unlinkSync(path.resolve('images/' + imageName));
    return res.end("success");
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Something went wrong, could not delete receipt.',
      500
    );
    return next(error);
  }
};

const fetchImageList = async (req, res, next) => {
  const testFolder = './images';
  let responseData = [];
  try {
    fs.readdir(testFolder, async (err, files) => {
      for await (const file of files) {
        const userID = file.replace(".jpg", "").split("-")[1];
        let takenDate = file.replace(".jpg", "").split("-")[2];
        let isChecked = false;
        if (file.replace(".jpg", "").split("-").length > 3) {
          isChecked = true;
        }
        let identifiedUser, userName = "NA";
        try {
          identifiedUser = await User.findById(userID);
          userName = identifiedUser.name;
        } catch (err) {
          return next(new HttpError('Could not retrieve user data, try again later', 500));
        }
        let data = {
          fileName: file,
          userName: userName,
          date: moment(new Date(parseInt(takenDate))).format("DD/MM/YYYY"),
          isChecked: isChecked
        };
        responseData.push(data);
      }
      return res.end(JSON.stringify(responseData));
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Something went wrong, could not delete receipt.',
      500
    );
    return next(error);
  }
};

const fetchDetailsByImage = async (req, res, next) => {
  const imageName = req.params.imageName;
  const imageDate = imageName.replace(".jpg", "").split("-")[2];
  const imageUser = imageName.replace(".jpg", "").split("-")[1];
  let receipts;
  try {
    receipts = await Receipt.find({ date_recorded: new Date(parseInt(imageDate)), user: imageUser }).exec();
    return res.end(JSON.stringify(receipts));
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Something went wrong, could not delete receipt.',
      500
    );
    return next(error);
  }
};

exports.getReceiptById = getReceiptById;
exports.getReceiptByUserId = getReceiptByUserId;
exports.createReceipt = createReceipt;
exports.updateReceipt = updateReceipt;
exports.deleteReceipt = deleteReceipt;
exports.createReceiptMany = createReceiptMany;
exports.fetchImageByName = fetchImageByName;
exports.deleteImageByName = deleteImageByName;
exports.fetchImageList = fetchImageList;
exports.fetchDetailsByImage = fetchDetailsByImage;
