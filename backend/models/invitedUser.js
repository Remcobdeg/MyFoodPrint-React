const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const invitedUserSchema = new Schema({
    email: { type: String, required: true}
});

module.exports = mongoose.model('InvitedUser', invitedUserSchema);