// Relationships controller

const express = require('express');
const router = express.Router();
const Beaver = require("../models/beaver");
const Relationship = require("../models/relationship");


module.exports = router;


router.get('/relationships', (req, res) => {		// render home page and all beavers
	Relationship.all(function(result){
		res.render('relationships.ejs', {relationships: result})
	})
})

router.get('/relationships/view/:id', (req, res) => {	// render beaver info
	Relationship.findOne(req, function(result) {
		res.render('relationship.ejs', {relationship: result});
	})
})

router.get('/relationships/new', (req, res) => {  // render create form
	Beaver.all(function(result){
		res.render('loveform.ejs', {beavers: result});
	})
})

// TODO - add date and request options to beaver relationship
router.post('/relationships/create', (req, res) => {	//create new beaver object and add first sighting
	Beaver.findLover(req.body.maleId, function(maleresult) {
		var male = maleresult;
		console.log(male)
		Beaver.findLover(req.body.femaleId, function(femaleresult){
			var female = femaleresult;
			console.log(female)
			Relationship.create({
				maleName: male,
				femaleName: female,
				maleId: req.body.maleId,
				femaleId: req.body.femaleId,
				type: req.body.type}
				, function(){
				// let id = req.body._id;
				// res.redirect('/relationships/details/'+ id);
				res.redirect('/relationships')
			})
		})
	})
})

// TODO - edit and delete relationships
router.get('/relationships/edit/:id', (req, res) => {		// render edit beaver page
	Relationship.findOne(req, function(result){
		res.render('editRelationship.ejs', {relationship: result});
	})
})

router.post('/relationships/update/:id', (req, res) => {	// save changes to db
	Relationship.update(req, function() {
		// let id = req.body._id    // not working for some mental reason =[
		// res.redirect('/beaver/details/'+ id);      	
		res.redirect('/');
	})
})

router.get('/relationships/delete/:id', (req, res) => {	// delete beaver
	Relationship.delete(req, function() {
		res.redirect('/relationships');
	})
})


router.get('/deleteRelationships', (req, res) => {	// removes all beavers from db
	Relationship.removeAll(req, function(){
		res.redirect('/');
	})
})