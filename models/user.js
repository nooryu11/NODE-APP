
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({ // create use scheme
    username: {type: String, unique: true, default: ''},
    fullname: {type: String, unique: true, default: ''},
    email: {type: String, unique: true},
    password: {type: String, default: ''},
    userImage: {type: String, default: 'defaultPic.png'},
	facebook: {type:String,default: ''},
	fbTokens:Array,
	google:{type:String,default: ''},
	sentRequest: [{
		username: {type:String , default: ''}
	}],
	request: [{
		userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
		username: {type:String, default: ''}
			  }],
	friendList: [{
		friendId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
		friendName: {type:String, default: ''}
		
	}],
	totalRequest: {type:Number,default:0},
	gender: {type:String, default: ''},
	city: {type: String, default: ''},
	mantra: {type:String, default: ''},
	fav_players: [{
		playername: {type:String,default:''},
	}],
	fav_team: [{
		teamname: {type:String,default:''}
	}],
	favclub: [{
		
		clubname: {type:String,default:''}
	}]
	
   
});

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null); //encrypt the passworf using hashsync and adding salt to it
};

userSchema.methods.validUserPassword = function(password){
    return bcrypt.compareSync(password, this.password); //this is when i login to check password mtches or not
};

module.exports = mongoose.model('User', userSchema);