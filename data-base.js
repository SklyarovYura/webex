const MongoClient = require('mongodb').MongoClient;
var mongodbHandler = null;

class DataBase{
    connect(connectString = "mongodb://localhost:27017/webex"){
        return new Promise(function(resolve,reject){
            MongoClient.connect(connectString)
                .then(
                    (db)=>{
                        mongodbHandler = db;
                        resolve(mongodbHandler);
                    },
                    (err)=>{
                        reject(err);
                    });
        });
    };
    handler(){
        return mongodbHandler;
    }
}

module.exports = new DataBase();