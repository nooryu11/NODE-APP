'use strict';

const passport = require('passport');
const User = require('../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;
const secret = require('../secret/secretFile')

passport.serializeUser((user, done) => {
    done(null, user.id);		//serialize the user
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => { //deserialize but first check if that id exist
        done(err, user);
    });
});

passport.use( new FacebookStrategy({ // create stategy of how to use signin feature
 	clientID:secret.facebook.clientID,
	clientSecret: secret.facebook.clientSecret,
		profileFields: ['email','displayName','photos'],
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		passReqToCallback: true
}, (req, token, refreshToken,profile, done) => { //callback
    
    User.findOne({facebook:profile.id}, (err, user) => { // used email as a varification, check if username with email exist or not
       if(err){
           return done(err); //error 
       }
        
        if(user){ //if exist flash it user already exist
            return done(null, user)
        }else{
				const newUser = new User();
				newUser.facebook = profile.id;
			newUser.fullname = profile.displayName;
			newUser.email = profile._json.email;
			newUser.userImage = 'http://graph.facebook.com/'+profile.id+'/picture?type=large';
			newUser.username = profile.displayName;
			newUser.fbTokens.push({token:token})
						newUser.save((err)=>{
							return done(null,user)
						})
						}
        
     
    });
}));

//login passport

