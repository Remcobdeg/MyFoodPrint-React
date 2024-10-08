const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    termsAgreed: { type: Boolean, required: true, default: false },
    is_admin: { type: Boolean, required: true, default: false  },
    linked_accounts: [{ type: String, required: false }],
    receipts: [{type: mongoose.Types.ObjectId, required: false, ref: 'Receipt'}] //ref referes to the model. Important the name is correct

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);