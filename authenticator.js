const User = require('./user');

class Authenticator {
    constructor(){
        this._authenticated = false;
    }
    init(req,res,next){
        this._authenticated = req.session && req.session.user?true:false;
        next();
    }
    login(req,res,next){
        req.session && req.session.user && delete req.session.user;
        if(req.body){
            let {email,password} = req.body;
            if(email && password){
                User.findByEmail(email).then(function(user){
                   if(user.password === password){
                        req.session.user = user;
                        res.status(200).json({login:true,username:user.name});
                   }
                   else 
                        res.status(401).json({login:false});
                },function(err){
                    res.status(401).json({login:false});
                });
            }
            else 
                res.status(401).json({login:false});
        }
        else 
            res.status(401).json({login:false});

        
    }
    logout(req,res,next){
        req.session && req.session.user && delete req.session.user;
        this._authenticated = false;
        res.status(200).json({login:false});
    }
    register(req,res,next){
        req.session && req.session.user && delete req.session.user;
        if(req.body){
            let {name,email,password} = req.body;
            if(name && email && password){
                User.findByEmail(email).then(
                function(doc){
                    if(doc!==null)
                        res.status(401).json({login:false});

                    let user = new User({name,email,password});
                    User.save(user).then(function(){
                        req.session.user = user;
                        res.status(200).json({login:true,username:user.name});
                    },function(){
                        res.status(401).json({login:false});
                    });
                },
                function(err){
                    res.status(401).json({login:false});
                });
            }
            else 
                res.status(401).json({login:false});
        }
        else 
            res.status(401).json({login:false});
        
    }
    isAuthenticated(req,res,next){
        if(this._authenticated)
            next();
        else 
            next(new Error('acces'));
    }
}

module.exports = function(app){

    let  auth = new Authenticator()
        ,wall = auth.isAuthenticated.bind(auth);

    app.use(auth.init.bind(auth));
    app.post('/login',   auth.login.bind(auth));
    app.post('/logout',  wall, auth.logout.bind(auth));
    app.post('/register',auth.register.bind(auth));

    return wall;
}
