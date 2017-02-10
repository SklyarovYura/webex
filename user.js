const data_source = require('./data-source')('users');
const ObjectID = require('mongodb').ObjectID;

function User(def={}){
    this._id        = null;
    this.name       = '';
    this.email      = '';
    this.password   = '';

    Object.assign(this,def);
}

User.findByEmail = function(email){
    return data_source.find({email},{subscriptions:0});
}

User.save = function(user){
    if(user._id===null){
        return new Promise(function(resolve,reject){
            data_source.insert(user).then(function(id){
                user._id = id;
                resolve();
            },function(err){
                reject(err);
            });
        });
    }
    else 
        return data_source.update({_id:user._id},user);
}

User.delete = function(user){
    return data_source.delete(user._id);
}

User.getSubscriptions = function(id){
    if(typeof(id)==='string') id = new ObjectID(id);
    return data_source.find({_id:id},{_id:0,subscriptions:1})
}
User.addSubscription = function(user,product){
    return new Promise(function(resolve,reject){
        let id = (typeof(user._id)==='string')?new ObjectID(user._id):user._id;

        data_source.update({_id:id},{ $addToSet: { 'subscriptions':product._id.toString()} }).then(function(info){
            resolve();
        }
        ,reject);
    });
}

User.deleteSubscription = function(user,product){
     return new Promise(function(resolve,reject){
        let id = (typeof(user._id)==='string')?new ObjectID(user._id):user._id;
        
        data_source.update({_id:id},{ $pull: { 'subscriptions':product._id.toString()} }).then(function(info){
                resolve();
        }
        ,reject);
    }); 
}

module.exports = User;