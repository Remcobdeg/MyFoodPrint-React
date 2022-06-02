const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dictSchema = new Schema({
    description_on_receipt: {type: String, required: true}, 
    weight_g: {type: Number, required: true}, 
    unit_price_gbp: {type: Number, required: false},
    kcal_100g: {type: Number, required: false},
    matching_footprint_item: {type: String, required: true},
    added_date: {type: Date, required: true},
    added_user: {type: mongoose.Types.ObjectId, required: true, ref: 'User'} //makes sure it's a mongoose object id and refers to the User model
});

module.exports = mongoose.model("DictItem", dictSchema);

