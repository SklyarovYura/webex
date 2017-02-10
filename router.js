const User = require('./user');
const Goods = require('./goods');


module.exports = function(app,wall){
    app.post('/api/user/subscriptions',wall,function(req,res,next){
        User.getSubscriptions(req.session.user._id).then(function(arr){
            if(!arr) arr={subscriptions:[]};
            res.status(200).json(arr);
        },
        function(err){
            res.status(500).send();
        });
    })

    app.post('/api/goods/list',function(req,res,next){
        Goods.getList().then(function(arr){
            res.status(200).json(arr);
        },
        function(){
            res.status(500).send();
        });
    })

    app.post('/api/user/subscriptions/add',wall,function(req,res,next){
       Goods.findById(req.body.id).then(
           function(product){
                User.addSubscription(req.session.user,product).then(
                    function(){
                        res.status(200).json(product);
                    },
                    function(){
                        res.status(500).send();
                    }
                );
           },
           function(err){
                res.status(500).send();
           }
       );
    });

    app.post('/api/user/subscriptions/delete',wall,function(req,res,next){
       Goods.findById(req.body.id).then(
           function(product){
                User.deleteSubscription(req.session.user,product).then(
                    function(){
                        res.status(200).json(product._id);
                    },
                    function(){
                        res.status(500).send();
                    }
                );
           },
           function(err){
                res.status(500).send();
           }
       );
    });


}

