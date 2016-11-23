// Controllers

const express = require('express');
const router = express.Router();
const Beaver = require("../models/beaver");
const Sighting = require("../models/sighting");


module.exports = router


router.get('/', (req, res) => {		                // render home page and all beavers
	Beaver.all(function(result){
		res.render('index.ejs', {beavers: result})
	})
})

router.get('/beavers', (req, res) => {		        // render home page and all beavers
	Beaver.all(function(result){
		res.render('beavers.ejs', {beavers: result})
	})
})

router.get('/beaver/details/:id', (req, res) => {	// render beaver info
	Beaver.findOne(req, function(result) {
		res.render('details.ejs', {beaver:result});
	})
})

router.get('/beaver/new', (req, res) => {           // render create form
	res.render('create.ejs');
})

router.post('/beaver/create', (req, res) =>{	    //create new beaver object and add first sighting
	Beaver.create(req, function(){
		let id = req.body._id
		birth = {'id': id,
				'date': req.body.date,
				'location': req.body.location,
				'health': req.body.health,
				'name' : req.body.name}
		Sighting.born(birth, function(){
			console.log("create 1st sighting")
		})
		res.redirect('/beaver/details/'+ id);
	})
})

router.get('/beaver/edit/:id', (req, res) => {		// render edit beaver page
	Beaver.findOne(req, function(result){
		res.render('edit.ejs', {beaver: result});
	})
})

router.post('/beaver/update/:id', (req, res) => {	// save changes to db
	Beaver.update(req, function() {
		// let id = req.body._id    // not working for some mental reason =[
		// res.redirect('/beaver/details/'+ id);      	
		res.redirect('/');
	})
})

router.get('/beaver/delete/:id', (req, res) => {	// delete beaver
	Beaver.delete(req, function() {
		res.redirect('/');
	})
})

router.get('/deleteBeavers', (req, res) => {	    // removes all beavers from db
	Beaver.removeAll(req, function(){
		res.redirect('/');
	})
})