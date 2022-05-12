const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const async_ = require('async');

const Alternative = require('../models/alternatives');
const User = require('../models/user');
const HttpError = require('../models/http-error');

const getAlternativesByProduct = async (req, res, next) => {
  const productName = req.params.product; 

  //find the product in the database to determine the group and subgroup it belongs to
  let alternative;
  try {
    alternative = await Alternative.findOne({product: productName });
  } catch (err) {
    if (err){
      const error = new HttpError("Error retrieving alternatives from DB.",500);
      return next(error); 
    }
  }

  if (!alternative) {
    return next( new HttpError('Could not find the product.', 404));
  }

  //find alternatives in the same group
  let groupAlternatives;
  try {
    groupAlternatives = await Alternative.find({group: alternative.group });
  } catch (err) {
    if (err){
      const error = new HttpError("Error retrieving alternatives from DB.",500);
      return next(error); 
    }
  }

  if (groupAlternatives.length === 0) {
    return next( new HttpError('Could not find alternatives for the product.', 404));
  }

  const subGroupAlternatives = groupAlternatives.filter(groupAlternative => groupAlternative.subgroup === alternative.subgroup);
  groupAlternatives = groupAlternatives.filter(groupAlternative => groupAlternative.subgroup !== alternative.subgroup);


  // alternatives.group 

  // res.json({ alternative: alternative.toObject({getters: true}) }); // convert to normal js object, getters: true removes the _ from _id

  res.json({ 
    groupAlternatives: groupAlternatives.map(alternative => alternative.toObject({getters: true})),
    subGroupAlternatives: subGroupAlternatives.map(alternative => alternative.toObject({getters: true}))
  }); // convert to normal js object, getters: true removes the _ from _id
};



const createAlternative = async (req, res, next) => {

  const dateRecorded = new Date();
  const newAlternatives = req.body.map(alternative => {
    console.log(alternative);
    return new Alternative({...alternative, added_date: dateRecorded, added_user: req.userData.userId});
  });


  //send it to Mongo -- we have to update two mongoose fields simultaneously, we need sessions to prevent one erroring and the other succeeding and imbalanced data being written
  try {
    await Alternative.insertMany(newAlternatives);
  } catch (err) {
    if (err){
      const error = new HttpError("Creating alternatives failed... Please try again",500);
      return next(error); 
    }
  }

  res.status(201).json({ alternatives: newAlternatives });
};

const updateAlternative = async (req, res, next) => {

  const productId = req.params.altid;

  let foundProduct;
  try {
    foundProduct = await Alternative.findById(productId);
  } catch(err){
    return next( new HttpError("Editing alternative failed... Please try again",500));
  }

  if(!foundProduct){return next( new HttpError("Could not find product",500));}

  if (foundProduct.added_user.toString() !== req.userData.userId && req.userData.userId !== "superuser"){
    return next( new HttpError('Editing this product not authorized.', 422));
  }

  console.log(req.body);
  let product;
  try {
    await foundProduct.updateOne({$set: req.body});
  } catch (err) {
    const error = new HttpError("Updating receipts failed, please try again later",500);
    return next(error); 
  }

  res.status(200).json({ message: "product updated" });
};

const deleteAlternative = async (req, res, next) => {
  const productId = req.params.altid;

  let foundProduct;
  try {
    foundProduct = await Alternative.findById(productId); 
    } catch (err) {
    return next(new HttpError('Something went wrong, could not delete product', 500));
  }

  if (!foundProduct) {
    const error = new HttpError('Could not find product for this id.', 404);
    return next(error);
  }

  if (foundProduct.added_user.toString() !== req.userData.userId && req.userData.userId !== "superuser") {
    const error = new HttpError('Deletion not authorized. User ID on product does not match logged in user.', 403);
    return next(error);
  }

  try {
    await foundProduct.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete product.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted product.' });
};

exports.getAlternativesByProduct = getAlternativesByProduct;
exports.createAlternative = createAlternative;
exports.updateAlternative = updateAlternative;
exports.deleteAlternative = deleteAlternative;