const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const receiptSchema = new Schema({
    date: {type: String, required: true},
    time: {type: String, required: false},
    store: {type: String, required: true}, //be sure to correct for typo's and match using small caps
    store_branche: {type: String, required: false},
    item_receipt_desc: {type: String, required: true}, 
    item_group: {type: String, required: true}, 
    item_subgroup: {type: String, required: true}, 
    item_receipt_desc: {type: String, required: true},
    item_product: {type: String, required: true},
    item_product_detail: {type: String, required: false},
    item_footprint_g_100g: {type: Number, required: true},
    item_kcal_100g: {type: Number, required: false},
    item_weight_g: {type: Number, required: true},
    item_unit_price_gbp: {type: Number, required: true},
    item_units: {type: Number, default: 1},
    item_footprint_sourcenote: {type: String, required: true},
    item_footprint_sourcenote_detail: {type: String, required: false},
    date_recorded: {type: Date, required: true},
    is_checked_off: {type: Boolean, required: true},
    user: {type: mongoose.Types.ObjectId, required: true, ref: 'User'} //makes sure it's a mongoose object id and refers to the User model 
});

module.exports = mongoose.model("Receipt", receiptSchema);

