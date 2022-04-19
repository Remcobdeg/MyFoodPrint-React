const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    group: {type: String, required: true}, 
    subgroup: {type: String, required: true}, 
    product: {type: String, required: true},
    product_detail: {type: String, required: true},
    footprint_g_100g: {type: Number, required: true},
    weight_g: {type: Number, required: true},
    unit_price_gbp: {type: Number, required: true},
    units: {type: Number, default: 1},
    footprint_sourcenote: {type: String, required: true}
});

const receiptSchema = new Schema({
    date: {type: String, required: true},
    time: {type: String, required: false},
    store: {type: String, required: true}, //be sure to correct for typo's and match using small caps
    store_branche: {type: String, required: false},
    items: {type: [itemSchema], required: true},
    user: {type: mongoose.Types.ObjectId, required: true, ref: 'User'} //makes sure it's a mongoose object id and refers to the User model 
});

module.exports = mongoose.model("Receipt", receiptSchema);

