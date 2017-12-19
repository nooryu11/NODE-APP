const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
	
	message: {type:String},
	author: {type:mongoose.Schema.Types.ObjectId,ref: 'User'},
	receiver: {type:mongoose.Schema.Types.ObjectId,ref: 'User'},
	senderName: {type: String},
	receiverName: {type: String},
	userImage: {type: String, default:'default.png'},
	isRead:{type: Boolean,default:false},
	createdAt: {type: Date, default: Date.now}
		
	})

module.exports = mongoose.model('message',messageSchema)