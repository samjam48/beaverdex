// Beaver Model

const Mongo       = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const ObjectID    = Mongo.ObjectID


let Beaver
// connect to the database		// user: sam, pwrd: password
	// online server if desired 'mongodb://sam:password@ds053176.mlab.com:53176/node1es1'

MongoClient.connect('mongodb://sam:password@ds053176.mlab.com:53176/node1es1', function(err, database) {  // Use connect method to connect to the server
	if (err) return console.log(err);
    Beaver = database.collection('beavers');
});


module.exports = {
	all: function(cb){
		Beaver.find().toArray((err, result) =>{
			if (err) return console.log(err);
			cb(result);
		})
	},
	findOne: function(req, cb){
		Beaver.findOne({_id: ObjectID(req.params.id)}, (err, result) =>{
			if (err) return console.log(err);
			cb(result);
		})
	},
	findLover: function(req, cb){
		Beaver.findOne({_id: ObjectID(req)}, (err, result) =>{
			if (err) return console.log(err);
			console.log()
			cb(result.name);
		})
	},
	create: function(req, cb){
		return Beaver.save(req.body, (err, result) => {
			if (err) return console.log(err);
			cb(result);
		})
	},
	update: function(req, cb){ 
		Beaver.findOneAndUpdate({_id: ObjectID(req.params.id)},
			{$set:{
				name	  : req.body.name,
				birthdate : req.body.birthdate,
				health	  : req.body.health
			}},
			(err, result) => {
				if (err) return console.log(err);
				cb(result);
		})
	},
	delete: function(req, cb) {
        Beaver.findOneAndDelete({_id: ObjectID(req.params.id)},
            (err, result) => {
                if (err) return console.log(err);
                cb(result);
            }
        )
    },
    removeAll: function(req, cb) {
        Beaver.remove(
            (err, result) => {
                if (err) return console.log(err);
                cb(result);
            })
    }
}




