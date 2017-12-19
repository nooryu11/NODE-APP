module.exports = function(){
	return{
		signUpValidation:(req,res,next)=> {
			req.checkBody('username','Username is Required').notEmpty();
			req.checkBody('username','Username Must be less then 5').isLength({min:5});
			req.checkBody('email','Email is Required').notEmpty();
			req.checkBody('email','Email is Invalid').isEmail();
			req.checkBody('password','Password Must  not be less then 5').isLength({min:5});
			req.checkBody('password','password is Required').notEmpty();
			req.getValidationResult() //store result of validation return promise
			.then((result)=>{
				const errors = result.array(); //error array
				const messages = [];
				errors.forEach((errors)=>{
					messages.push(errors.msg) // pushes arrrors
				})
				req.flash('error',messages); //flash
				res.redirect('/signup') // redirect 
			})
			.catch((err)=>{
				return next();
			})
		},

//LOGIN VALIDATION

	LoginValidation:(req,res,next)=> {
			
			req.checkBody('username','username is Required').notEmpty();
			req.checkBody('password','Password Must  not be less then 5').isLength({min:5});
			req.checkBody('password','password is Required').notEmpty();
			req.getValidationResult() //store result of validation return promise
			.then((result)=>{
				const errors = result.array(); //error array
				const messages = [];
				errors.forEach((errors)=>{
					messages.push(errors.msg) // pushes arrrors
				})
				req.flash('error',messages); //flash
				res.redirect('/') // redirect 
			})
			.catch((err)=>{
				return next();
			})
		}
	}
}

