var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://host:lBKPP2l2vREFQGLF@cluster0.gbvl6.mongodb.net/Secret?retryWrites=true&w=majority";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const secret_data = {};
let next_id = 0;

class Secret {
    

    constructor (id, owner, secret) {
        getSecretData();
        this.id = id;
        this.owner = owner;
        this.secret = secret;
    }


    update (secret) {
        this.secret = secret;
        secret_data.set(this.id.toString(), this);
    }

    delete () {
        secret_data.del(this.id.toString());
    }
}

Secret.getAllIDs = () => {
    return 0;
};

Secret.getAllIDsForOwner = (owner) => {
    return 0;
}

Secret.findByID = (id) => {
    let sdata = secret_data.get(id);
    if (sdata != null) {
        return new Secret(sdata.id, sdata.owner, sdata.secret);
    }
    return null;
};

Secret.next_id = () => {
    getSecretData();
    console.log(secret_data.length);
    return 0;
}

Secret.create = (owner, secret) => {
    let id = Secret.next_id;
    Secret.next_id += 1;
    let s = new Secret(id, owner, secret);
    addSecret(s);
    return s;
}

async function getSecretData (){

    const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true },{useCreateIndex: true});
    client.connect(err => {
        const collection = client.db("Secret").collection("users");
        collection.find().toArray(function(err, result) {
            this.secret_data = result;
            client.close();
        });
    });
}

async function addSecret(s) {
    const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true },{useCreateIndex: true});
    client.connect(err => {
        const collection = client.db("Secret").collection("users");
            collection.insertOne(s);
            client.close();
    });
}

module.exports = Secret;