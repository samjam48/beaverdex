// Sightings Controller

const express = require('express');
const router = express.Router();
const Sighting = require("../models/sighting");
const Beaver = require("../models/beaver");


module.exports = router



// TODO add order of beaver sightings
router.get('/sightings', (req, res) => {
	Sighting.all(function(result){
		res.render('sightings.ejs', {logger: result})
	})
})



// TODO add order of beaver sightings
router.get('/sightings/:id', (req, res) => {	// render all sightings of beaver
	Sighting.beaverLogs(req, function(result) {
		console.log(result);
		res.render('displayLog.ejs', {logger: result});
	})
})





router.get('/sightings/new/:id', (req, res) => {  // render create form
	Beaver.findOne(req, function(result) {
		// console.log(result);
		res.render('newLog.ejs', {beaver: result});
	})
})

router.post('/sightings/create/:id', (req,res) =>{	// add sighting to log
	Sighting.create(req, function(){
		let id = req.params.id;
		console.log('controller running');
		res.redirect('/sightings/' + id);
	})
})

router.get('/sightings/edit/:id', (req, res) =>{
	Sighting.findOne(req, function(result) {
		res.render('editLog.ejs', {log: result});
	})
})

router.post('/sightings/update/:id', (req, res) => {
	Sighting.update(req, function(){
		res.redirect('/sightings/' + req.body.id)
	})
})

router.get('/sightings/delete/:id', (req, res) => {	// delete beaver
	Sighting.delete(req, function() {
		res.redirect('/');
	})
})

router.get('/deleteSightings', (req, res) => {	// removes all sightings from db
	Sighting.removeAll(req, function(){
		res.redirect('/');
	})
})