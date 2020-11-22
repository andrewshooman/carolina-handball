var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://host:lBKPP2l2vREFQGLF@cluster0.gbvl6.mongodb.net/Secret?retryWrites=true&w=majority";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let secret_data = [];
let nextID;

class Secret {
    

    constructor (id, owner, favorite, name) {
        this.id = id;
        this.owner = owner;
        this.favorite = favorite;
        this.name = name;
    }

}

Secret.getAllIDs = () => {
    return 0;
};

Secret.findByID = (id) => {
    let sdata = secret_data.get(id);
    if (sdata != null) {
        return new Secret(sdata.id, sdata.owner, sdata.secret);
    }
    return null;
};



Secret.create = (owner, secret) => {

    addSecret(owner, secret);
    let s = new Secret(nextID, owner, secret);
    return s;
}

Secret.createteam = (owner, secret) => {

    addSecretTeam(owner, secret);
    let s = new Secret(nextID, owner, secret);
    return s;
}



async function getSecretData (){
    
    const client = new MongoClient("mongodb+srv://host:lBKPP2l2vREFQGLF@cluster0.gbvl6.mongodb.net/Secret?retryWrites=true&w=majority", {useNewUrlParser: true}, {useUnifiedTopology: true},{useCreateIndex: true});
  client.connect(err => {
      const collection = client.db("Secret").collection("secrets");
      collection.find().toArray(function(err, result) {
          secret_data = result;


        

          nextID = secret_data.length;
          client.close();
      });
    });
}



async function addSecret(owner, favorite) {
    const client = new MongoClient("mongodb+srv://host:lBKPP2l2vREFQGLF@cluster0.gbvl6.mongodb.net/Secret?retryWrites=true&w=majority", {useNewUrlParser: true}, {useUnifiedTopology: true},{useCreateIndex: true});
    let name = JSON.parse(favorite).name;

    client.connect(err => {
        const collection = client.db("Secret").collection("secrets");
        collection.find({"owner":owner, "name":name}).toArray(function(err, result) {
            if (result.length != 0){ client.close(); return;}

        });

        collection.find().toArray(function(err, result) {
            secret_data = result;
            let temp = result.sort(function compare(a, b) {
                const x = a.id;
                const y = b.id;
                let comparison = 0;
                if (x > y) {
                  comparison = -1;
                } else if (x < y) {
                    comparison = 1;
                }
                return comparison;
              })

            nextID = temp[0].id+1;
            collection.insertOne(new Secret(nextID, owner, favorite, name));
            client.close();
        });
      });
}

async function addSecretTeam(owner, favorite) {
    const client = new MongoClient("mongodb+srv://host:lBKPP2l2vREFQGLF@cluster0.gbvl6.mongodb.net/Secret?retryWrites=true&w=majority", {useNewUrlParser: true}, {useUnifiedTopology: true},{useCreateIndex: true});
    let name = JSON.parse(favorite).name;


    client.connect(err => {
        const collection = client.db("Secret").collection("secretteams");

        collection.find({"owner":owner, "name":name}).toArray(function(err, result) {
            if (result.length != 0){ client.close(); return;}

        });

        collection.find().toArray(function(err, result) {
            secret_data = result;
            let temp = result.sort(function compare(a, b) {
                const x = a.id;
                const y = b.id;
                let comparison = 0;
                if (x > y) {
                  comparison = -1;
                } else if (x < y) {
                    comparison = 1;
                }
                return comparison;
              })

            nextID = temp[0].id+1;
            collection.insertOne(new Secret(nextID, owner, favorite, name));
            client.close();
        });
      });
}

module.exports = Secret;