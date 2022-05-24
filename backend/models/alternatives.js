const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const altSchema = new Schema({
    group: {type: String, required: true}, 
    subgroup: {type: String, required: true}, 
    product: {type: String, required: true},
    product_detail: {type: String, required: true},
    footprint_g_100g: {type: Number, required: true},
    kcal_100g: {type: Number, required: false},
    footprint_sourcenote: {type: String, required: true},
    added_date: {type: Date, required: true},
    added_user: {type: mongoose.Types.ObjectId, required: true, ref: 'User'} //makes sure it's a mongoose object id and refers to the User model
});

module.exports = mongoose.model("Alternative", altSchema);

