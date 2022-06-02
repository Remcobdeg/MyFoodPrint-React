const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const async_ = require('async');

const DictItem = require('../models/dictItem')
const User = require('../models/user');
const HttpError = require('../models/http-error');

const getDictItemByItem = async (req, res, next) => {
  const itemName = req.params.item; 

  //find the product in the database to determine the group and subgroup it belongs to
  let item;
  try {
    item = await DictItem.findOne({product: itemName });
  } catch (err) {
    if (err){
      const error = new HttpError("Error retrieving items from DB.",500);
      return next(error); 
    }
  }

  if (!item) {
    return next( new HttpError('Could not find the product.', 404));
  }

  
  res.json({ 
    dictItem: item.toObject({getters: true})
  }); // convert to normal js object, getters: true removes the _ from _id
};

const getDictItems = async (req, res, next) => {
  let items;
  try {
    items = await DictItem.find({});
  } catch (err) {
    if (err){
      const error = new HttpError("Error retrieving items from DB.",500);
      return next(error); 
    }
  }

  if (items.length === 0) {
    return next( new HttpError('Could not find items.', 404));
  }

  res.json({ 
    dictItems: items.map(item => item.toObject({getters: true})),
  }); 
};

const createDictItems = async (req, res, next) => {

  const dateRecorded = new Date();
  const newItems = req.body.map(item => {
    return new DictItem({...item, added_date: dateRecorded, added_user: req.userData.userId});
  });


  //send it to Mongo -- we have to update two mongoose fields simultaneously, we need sessions to prevent one erroring and the other succeeding and imbalanced data being written
  try {
    await DictItem.insertMany(newItems);
  } catch (err) {
    if (err){
      console.log(err);
      const error = new HttpError("Creating items failed... Please try again",500);
      return next(error); 
    }
  }

  res.status(201).json({ dictItems: newItems });
};

const updateDictItem = async (req, res, next) => {

  const itemId = req.params.itemid;

  let foundItem;
  try {
    foundItem = await DictItem.findById(itemId);
  } catch(err){
    return next( new HttpError("Editing item failed... Please try again",500));
  }

  if(!foundItem){return next( new HttpError("Could not find product",500));}

  if (foundItem.added_user.toString() !== req.userData.userId && req.userData.userId !== "superuser"){
    return next( new HttpError('Editing this product not authorized.', 422));
  }

  try {
    await foundItem.updateOne({$set: req.body});
  } catch (err) {
    const error = new HttpError("Updating receipts failed, please try again later",500);
    return next(error); 
  }

  res.status(200).json({ message: "product updated" });
};

const deleteDictItem = async (req, res, next) => {
  const itemId = req.params.item;

  let foundItem;
  try {
    foundItem = await DictItem.findById(itemId); 
    } catch (err) {
    return next(new HttpError('Something went wrong, could not delete product', 500));
  }

  if (!foundItem) {
    const error = new HttpError('Could not find product for this id.', 404);
    return next(error);
  }

  if (foundItem.added_user.toString() !== req.userData.userId && req.userData.userId !== "superuser") {
    const error = new HttpError('Deletion not authorized. User ID on product does not match logged in user.', 403);
    return next(error);
  }

  try {
    await foundItem.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete product.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted product.' });
};

exports.getDictItemByItem = getDictItemByItem;
exports.getDictItems = getDictItems;
exports.createDictItems = createDictItems;
exports.updateDictItem = updateDictItem;
exports.deleteDictItem = deleteDictItem;