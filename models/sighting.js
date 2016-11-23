// sighting model

const Mongo       = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const ObjectID    = Mongo.ObjectID


let Sighting
// connect to the database		// user: sam, pwrd: password
	// online server if desired 'mongodb://sam:password@ds053176.mlab.com:53176/node1es1'
	// local server 'mongodb://localhost:27017/myproject'

MongoClient.connect('mongodb://sam:password@ds053176.mlab.com:53176/node1es1', function(err, database) {  // Use connect method to connect to the server
	if (err) return console.log(err);
    Sighting = database.collection('sightings');
});


module.exports = {
	all: function(cb){
		Sighting.find().toArray((err, result) => {
			if (err) return console.log(err);
			cb(result);
		})
	},
	beaverLogs: function(req, cb){
		Sighting.find().toArray((err, result) => {
			if (err) return console.log(err);
			let beaverLog = result.filter(obj => { // filter all logs for just this beaver
				if (obj.id == req.params.id){ return obj }})
			// order sightings by date
			cb(beaverLog);
		})
	},
	create: function(req, cb){	// add a new sighting to db
		Sighting.save(req.body, (err, result) => {
			console.log("saving log")
			if (err) return console.log(err);
			cb(result);
		})
	},
	born: function(req, cb){
		Sighting.save(req, (err, result) => {
			console.log("saving log")
			if (err) return console.log(err);
			cb(result);
		})
	},
	findOne: function(req, cb){
		Sighting.findOne({_id: ObjectID(req.params.id)}, (err, result) => {
			console.log(ObjectID(req.params.id))
			if (err) return console.log(err);
			cb(result);
		})
	},
	update: function(req, cb) {
		Sighting.findOneAndUpdate({_id: ObjectID(req.params.id)},
			{$set:{
				location  : req.body.location,
				date 	  : req.body.date,
				health	  : req.body.health
			}},
			(err, result) => {
				if (err) return console.log(err);
				cb(result);
		})
	},
	delete: function(req, cb) {
        Sighting.findOneAndDelete({_id: ObjectID(req.params.id)},
            (err, result) => {
                if (err) return console.log(err);
                cb(result);
            }
        )
    },
	
	removeAll: function(req, cb) { // remove all sightings from db
        Sighting.remove(
            (err, result) => {
                if (err) return console.log(err);
                cb(result);
            })
    }
}

