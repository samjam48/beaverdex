const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient, assert = require('assert');
const path = require('path');
const ID = require('mongodb').ObjectID

var url = 'mongodb://localhost:27017/myproject'; // Connection URL
var db

MongoClient.connect(url, function(err, database) {  // Use connect method to connect to the server
  db = database
  assert.equal(null, err);
  console.log("Connected successfully to db");
  app.listen(3000, () => {    // only display connection port if succesfully connecting to db
  console.log('swinging on 3000');
  })
});

app.set('view engine', 'ejs');  // res.render(view, locals);
app.use(bodyParser.urlencoded({extended: true}))		// enables body parser
app.use(bodyParser.json())
app.use(express.static('public'))


// basic info
app.get('/', (req,res) => {  // render home page with list of beavers
  db.collection('beavers').find().toArray((err, result) => {  // get our cursor form db and turn into a nice array of objects
    if (err) return console.log(err)
    res.render('index.ejs', {beavers: result});   // renders index.ejs onto the page
    console.log({beavers: result})
  })
  console.log('home page load');
});

app.get('/beaver/:id', (req, res) => {  // render beaver info
  var id = require('mongodb').ObjectID(req.params.id);
  db.collection('beavers').findOne({_id: id}, (err, result) => {  // get our cursor form db and turn into a nice array of objects
    if (err) return console.log(err)
    res.render('details.ejs', {beaver: result});   // renders user onto the page
    console.log({beaver: result})
  })
  console.log('user page load');
})


// creating
app.get('/create', (req, res) => { // render create form
  console.log('rendering create form')
  res.render('create.ejs')
})

app.post('/create', (req, res) => {  // post new beaver info to our db
  db.collection('beavers').save(req.body, (err, result) =>{
    if (err) return console.log(err)
    console.log('Beaver saved to database')
  })
  var log = {name: req.body.name,
             logger: [{location: req.body.location,
                        date: req.body.birthdate,
                        health: req.body.health}] }
  db.collection('sightings').save(log, (err, result) =>{
    if (err) return console.log(err)
    console.log('Beaver sighting saved to log')
    res.redirect('/')
  })
})


// editing
app.get('/edit/:id', (req, res) => {  // render edit form
  var id = ID(req.params.id);
  db.collection('beavers').findOne({_id: id}, (err, result) => {  // get our cursor form db and turn into a nice array of objects
    if (err) return console.log(err)
    res.render('edit.ejs', {beaver: result});   // renders user onto the page
    console.log({beaver: result})
  })
})

app.post('/savechanges/:id', (req, res) => { // save edits to beaver
  console.log('Saving Changes');
  var id = ID(req.params.id);
  var obj = {name: req.body.name,
            health: req.body.health,
            location: req.body.location,
            birthdate: req.body.birthdate}
  db.collection('beavers').findOneAndUpdate({_id: id}, obj, function(err, beaver){
    if (err) console.log(err)
  });
  res.redirect('/beaver/' + id)
})

app.get('/delete/:id', (req, res) => {  //Deleting beaver
  var id = require('mongodb').ObjectID(req.params.id);
  db.collection('beavers').findOneAndDelete(
      {_id: id},
      (err, result) => {
        if (err) return res.send(500, err)
          res.redirect('/')
      }
    )
})


// logging
app.get('/logger/:name', (req, res) => {  // render new sighting form
  var _name = req.params.name;
  db.collection('sightings').findOne({name: _name}, (err, result) => {  // get our cursor form db and turn into a nice array of objects
    if (err) return console.log(err)
    res.render('logger.ejs', {log: result});   // renders user onto the page
    console.log({log: result})
  })
})

app.post('/logging/:name', (req, res) =>{ // submit new sighting of beaver to 'sightings' log
  console.log('Saving new log')
  var _name = req.params.name;
  console.log(_name);
  db.collection('sightings').findOneAndUpdate(
    {name: _name},
      {$push:
          {logger: {"location": req.body.location, "date": req.body.date, "health": req.body.health}
      }}
    ,(err, result) => { if (err) return res.send(err) }
  );
  db.collection('beavers').findOneAndUpdate(
    {name: _name}, 
      {$set:
        {health: req.body.health}
      }
    ,(err, result) => { if (err) return res.send(err) }
  );

  res.redirect('/displayLog/' + _name)
})

app.get('/displayLog/:name', (req, res) => { // show beaver journey log
  var _name = req.params.name;
  db.collection('sightings').findOne({name: _name}, (err, result) => {  // get our cursor form db and turn into a nice array of objects
    if (err) return console.log(err)
    res.render('displayLog.ejs', {_logger: result.logger});   // renders user onto the page
    console.log({_logger: result.logger})
  })
})

app.get('/logger/:name/edit/:log', (req, res) => {  // render new sighting form
  var _name = req.params.name;
  var _log = req.params.log
  db.collection('sightings').findOne({name: _name}, (err, result) => {  // get our cursor form db and turn into a nice array of objects
    if (err) return console.log(err)
    res.render('editLog.ejs', {log: result});   // renders user onto the page
    console.log({log: result})
  })
})




// relationships
app.get('/relationships', (req, res) => { // show relationships
  db.collection('relationships').find().toArray((err, result) =>{
    if (err) return console.log(err)
    res.render('relationships.ejs', {relations: result})  
  })
})

app.get('/newLove', (req, res) => { // render relationship input form
  console.log('rendering new love form');
  db.collection('beavers').find().toArray((err, result) =>{
    if (err) return console.log(err)
    res.render('loveform.ejs', {beavers: result})
  })
});

app.post('/newLove', (req, res) => { // register new relationship
  console.log('Saving new love to database...')
  db.collection('relationships').save(req.body, (err, result) =>{
    if (err) return console.log(err)
    console.log('New love saved to database')
    res.redirect('/relationships')
  });
});



// delete all
app.get('/deleteRelationships', (req, res) =>{ // delete all relationship records
  db.collection("relationships").remove()
  res.redirect('/')
})

app.get('/deleteBeavers', (req, res) =>{  // delete all beaver records
  db.collection("beavers").remove()
  res.redirect('/')
})


// ------------ unused code that might be useful here ---------   //


