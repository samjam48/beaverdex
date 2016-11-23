// relationship model

const Mongo       = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const ObjectID    = Mongo.ObjectID


let Relationship
// connect to the database		// user: sam, pwrd: password
	// online server if desired 'mongodb://sam:password@ds053176.mlab.com:53176/node1es1'

MongoClient.connect('mongodb://sam:password@ds053176.mlab.com:53176/node1es1', function(err, database) {  // Use connect method to connect to the server
	if (err) return console.log(err);
    Relationship = database.collection('relationships');
});


module.exports = {
	all: function(cb){
		Relationship.find().toArray((err, result) =>{
			if (err) return console.log(err);
			cb(result);
		})
	},
	findOne: function(req, cb){
		Relationship.findOne({_id: ObjectID(req.params.id)}, (err, result) =>{
			if (err) return console.log(err);
			cb(result);
		})
	},
	create: function(req, cb){
		Relationship.save(req
			, (err, result) => {
			if (err) return console.log(err);
			cb(result);
		})
	},
	update: function(req, cb){ 
		Relationship.findOneAndUpdate({_id: ObjectID(req.params.id)},
			{$set:{
				// name	  : req.body.name,
				// birthdate : req.body.birthdate,
				// health	  : req.body.health
			}},
			(err, result) => {
				if (err) return console.log(err);
				cb(result);
		})
	},
	delete: function(req, cb) {
        Relationship.findOneAndDelete({_id: ObjectID(req.params.id)},
            (err, result) => {
                if (err) return console.log(err);
                cb(result);
            }
        )
    },
    removeAll: function(req, cb) {
        Relationship.remove(
            (err, result) => {
                if (err) return console.log(err);
                cb(result);
            })
    }
}




