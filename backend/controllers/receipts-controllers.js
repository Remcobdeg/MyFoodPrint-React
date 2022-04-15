const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  }
];

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

const getReceiptById = (req, res, next) => {
  const receiptId = req.params.rcptid; 

  const receipt = DUMMY_RECEIPTS.find(r => {
    return r.id === receiptId;
  });

  if (!receipt) {
    throw new HttpError('Could not find a receipt for the provided id.', 404);
  }

  res.json({ receipt }); // => { receipt } => { receipt: receipt }
};

// alternative ways of writing the function:
// function getreceiptById() { ... }
// const getreceiptById = function() { ... }

const getReceiptByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const receipts = DUMMY_RECEIPTS.filter(r => {
    return r.user === userId;
  });

  if (!receipts || receipts.length === 0) {
    return next(
      new HttpError('Could not find receipts for the provided user id.', 404)
    );
  }

  res.json({ receipts });
};

const createReceipt = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { date, time, store, store_branche, items, user} = req.body;

  // const title = req.body.title;
  const createdReceipt = {
    id: uuid(),
    // date,
    // time,
    // store, 
    // store_branche, 
    // items,
    // user
    ...req.body
  };

  DUMMY_RECEIPTS.push(createdReceipt); 

  res.status(201).json({ receipt: createdReceipt });
};

const updateReceipt = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { date, store } = req.body;
  const receiptId = req.params.rcptid;

  const updatedReceipt = { ...DUMMY_RECEIPTS.find(r => r.id === receiptId) };
  const receiptIndex = DUMMY_RECEIPTS.findIndex(r => r.id === receiptId);
  updatedReceipt.date = date; // 'date','time','store','store_branche','items','user'
  updatedReceipt.store = store;

  DUMMY_RECEIPTS[receiptIndex] = updatedReceipt;

  res.status(200).json({ receipt: updatedReceipt });
};

const deleteReceipt = (req, res, next) => {
  const receiptId = req.params.rcptid;
  if (!DUMMY_RECEIPTS.find(r => r.id === receiptId)) {
    throw new HttpError('Could not find a receipt for that id.', 404);
  }
  DUMMY_RECEIPTS = DUMMY_RECEIPTS.filter(r => r.id !== receiptId);
  res.status(200).json({ message: 'Deleted receipt.' });
};

exports.getReceiptById = getReceiptById;
exports.getReceiptByUserId = getReceiptByUserId;
exports.createReceipt = createReceipt;
exports.updateReceipt = updateReceipt;
exports.deleteReceipt = deleteReceipt;
