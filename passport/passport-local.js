'use strict';

const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);		//serialize the user
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => { //deserialize but first check if that id exist
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({ // create stategy of how to use signin feature
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => { //callback
    
    User.findOne({'username': username}, (err, user) => { // used email as a varification, check if username with email exist or not
       if(err){
           return done(err); //error 
       }
        
        if(user){ //if exist flash it user already exist
            return done(null, false, req.flash('error', 'User with username already exist'));
        }
        
        const newUser = new User(); //else create new one
        newUser.username = req.body.username; //req.body
        newUser.fullname = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password); // call ecrrpy password function fro user.js schema function to 
       
        newUser.save((err) => {
            done(null, newUser);//then save it
        });
    });
}));

//login passport


passport.use('local.login', new LocalStrategy({ // create stategy of how to use signin feature
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => { //callback
    
    User.findOne({'username': username}, (err, user) => { // used email as a varification, check if username with email exist or not
       if(err){
           return done(err); //error 
       }
        
        const messages = [];
		if(!user ){
			messages.push('Username Does not Exist')
			return done(null,false,req.flash('error',messages))
		}
		if( !user.validUserPassword(password)){
			messages.push('Password is Wrong!')
			return done(null,false,req.flash('error',messages))
		}
		return done(null,user);
 
    });
}));
