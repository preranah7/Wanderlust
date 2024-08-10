let User = require("../models/user.js");


module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup =  async(req,res)=>{
    try{
        let{username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser , password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if (err) {
                return next();
            }
            req.flash("success","User registered successfully");
            res.redirect("/listings");
        })

    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.postLogin = async(req,res)=>{
    req.flash("success","Welcome to Wanderlust!");
    let redirectUrl = res.locals.redirect || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err)
        };
        req.flash("success","Logged Out");
        res.redirect("/listings");
    });
};