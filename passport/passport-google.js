'use strict';

const passport = require('passport');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const secret = require('../secret/secretFile')

passport.serializeUser((user, done) => {
    done(null, user.id);		//serialize the user
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => { //deserialize but first check if that id exist
        done(err, user);
    });
});

passport.use( new GoogleStrategy({ // create stategy of how to use signin feature
 	clientID:secret.google.clientID,
	clientSecret: secret.google.clientSecret,
		callbackURL: 'http://localhost:3000/auth/google/callback',
		passReqToCallback: true
}, (req, accessToken, refreshToken,profile, done) => { //callback
    
    User.findOne({google:profile.id}, (err, user) => { // used email as a varification, check if username with email exist or not
       if(err){
           return done(err); //error 
       }
		if(user){
			return done(null,user);
		}
		else{
			const newUser = new User();
			newUser.google = profile.id;
			newUser.fullname = profile.displayName;
			newUser.email = profile.emails[0].value;
			newUser.userImage = profile._json.image.url;
			newUser.username = profile.displayName;
			newUser.save((err)=>{
				if(err){
					return done(err);
				}
				return done(null,user);
			})
		}
        

        
     
    });
}));

//login passport

