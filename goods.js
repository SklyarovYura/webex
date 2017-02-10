const data_source = require('./data-source')('goods');
const ObjectID = require('mongodb').ObjectID;

function Product(def={}){
    this._id        = null;
    this.name       = '';
    this.image      = '';
    this.price     = '';
    this.description = '';
    
    Object.assign(this,def);
}

Product.getList = function(){
    return data_source.list({});
}
Product.findById = function(id){
    if(typeof(id)==='string')
        id = new ObjectID(id);
    return data_source.find({_id:id});
}

module.exports = Product;