const mongoose = require('mongoose');

const gpmessageSchema = mongoose.Schema({
	
	message: {type:String},
	sender: {type:mongoose.Schema.Types.ObjectId,ref: 'User'},
	senderName: {type: String},
	userImage: {type: String, default:'default.png'},
	club_name: {type:String},
	createdAt: {type: Date, default: Date.now}

		
	})

module.exports = mongoose.model('gp_message',gpmessageSchema)