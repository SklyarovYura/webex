const ds = new Map();
const db  = require('./data-base').handler();

class DataSource{

    constructor(collection){
        Object.defineProperty(this,'collection',{get:()=>collection});
    }

    insert(document){
        return this.collection.insertOne(document);
    }
    delete(id){
        return this.collection.deleteOne({_id:id});
    }
    find(query,projection={}){
        return this.collection.findOne(query,projection);
    }
    update(query,update){
        return this.collection.updateOne(query,update);
    }
    list(query){
       return this.collection.find(query).toArray();
    }

}

module.exports = function(name){

    if(!ds.has(name)){
        ds.set(name, new DataSource(db.collection(name)));
    }

    return ds.get(name);
};
