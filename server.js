const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient, assert = require('assert');
const path = require('path');
const ID = require('mongodb').ObjectID



app.use(bodyParser.urlencoded({extended: true}))		// enables body parser
app.use(bodyParser.json())

app.set('view engine', 'ejs');  // res.render(view, locals);
app.use(express.static('public'))

// require all routes for beavers
const beaverscontrollers = require('./controllers/beavers')
app.use(beaverscontrollers)

const relationshipscontrollers = require('./controllers/relationships')
app.use(relationshipscontrollers)

const sightingscontrollers = require('./controllers/sightings')
app.use(sightingscontrollers)


app.listen(3000, () => {    // only display connection port if succesfully connecting to db
  console.log('swinging on 3000');
})





// // editing
// app.get('/beaver/edit/:id', (req, res) => {  // render edit form
//   var id = ID(req.params.id);
//   console.log(id);
//   db.collection('beavers').findOne({_id: id}, (err, result) => {  // get our cursor form db and turn into a nice array of objects
//     if (err) return console.log(err)
//     res.render('edit.ejs', {beaver: result});   // renders user onto the page
//     console.log({beaver: result})
//   })
// })

// app.post('/beaver/update/:id', (req, res) => { // save edits to beaver
//   console.log('Saving Changes');
//   var id = ID(req.params.id);
//   var obj = {name: req.body.name,
//             health: req.body.health,
//             location: req.body.location,
//             birthdate: req.body.birthdate}
//   db.collection('beavers').findOneAndUpdate({_id: id}, obj, function(err, beaver){
//     if (err) console.log(err)
//   });
//   res.redirect('/beaver/details/' + id)
// })

// app.get('/beaver/delete/:id', (req, res) => {  //Deleting beaver
//   var id = require('mongodb').ObjectID(req.params.id);
//   db.collection('beavers').findOneAndDelete(
//       {_id: id},
//       (err, result) => {
//         if (err) return res.send(500, err)
//           res.redirect('/')
//       }
//     )
// })



// // Sightings
// app.get('/beaver/sightings/:name', (req, res) => { // show beaver journey log
//   var _name = req.params.name;
//   db.collection('sightings').findOne({name: _name}, (err, result) => {  
//     if (err) return console.log(err)
//     res.render('displayLog.ejs', {logger: result.logger, name:_name});   
//     console.log({logger: result.logger})
//     console.log(result);
//   })
// })

// app.get('/beaver/sightings/newlog/:name', (req, res) => {  // render new sighting form
//   var _name = req.params.name;
//   db.collection('sightings').findOne({name: _name}, (err, result) => {  // get our cursor form db and turn into a nice array of objects
//     if (err) return console.log(err)
//     res.render('newLog.ejs', {log: result});   // renders user onto the page
//     console.log({log: result.logger})
//   })
// })

// app.post('/beaver/sightings/newlog/:name', (req, res) =>{ // submit new sighting of beaver to 'sightings' log
//   console.log('Saving new log')
//   var _name = req.params.name;
//   console.log(_name);
//   db.collection('sightings').findOneAndUpdate(
//     {name: _name},
//       {$push:
//           {logger: {"location": req.body.location, "date": req.body.date, "health": req.body.health}
//       }}
//     ,(err, result) => { if (err) return res.send(err) }
//   );
//   db.collection('beavers').findOneAndUpdate(
//     {name: _name}, 
//       {$set:
//         {health: req.body.health}
//       }
//     ,(err, result) => { if (err) return res.send(err) }
//   );
//   res.redirect('/beaver/sightings/' + _name)
// })

// app.get('/beaver/sightings/:name/edit/:ref', (req, res) => {  // render edit form
//   var _name = req.params.name;
//   var _ref = req.params.ref
//   db.collection('sightings').findOne({name: _name}, (err, result) => {  
//     if (err) return console.log(err)
//     res.render('editLog.ejs', {logger: result.logger, name: _name, ref: _ref});
//     console.log({logItem: result.logger[_ref]});
//   })
// })

// app.post('/beaver/sightings/:name/update/:ref', (req, res) => {  // render edit form
//   var _name = req.params.name;
//   var _ref = req.params.ref;
//   // console.log(_ref);
//   var _log = JSON.parse(req.body.logger);
//   // var _log = log.toArray();
//   // console.log("1st log " + _log[_ref]);
//   obj = {"location": req.body.location,
//         "date": req.body.date,
//         "health": req.body.health}
//   _log.splice(_ref, 1, obj);
//   // console.log("2nd log " + _log[_ref]);
//   db.collection('sightings').findOneAndUpdate({name: _name },
//      {$set:{logger: _log} } ,(err, result) => {
//      if (err) return console.log(err)
//     res.redirect('/beaver/sightings/' + _name);
//   }) 
// })





// // relationships
// app.get('/relationships', (req, res) => { // show relationships
//   db.collection('relationships').find().toArray((err, result) =>{
//     if (err) return console.log(err)
//     res.render('relationships.ejs', {relations: result})  
//   })
// })

// app.get('/newLove', (req, res) => { // render relationship input form
//   console.log('rendering new love form');
//   db.collection('beavers').find().toArray((err, result) =>{
//     if (err) return console.log(err)
//     res.render('loveform.ejs', {beavers: result})
//   })
// });

// app.post('/newLove', (req, res) => { // register new relationship
//   console.log('Saving new love to database...')
//   db.collection('relationships').save(req.body, (err, result) =>{
//     if (err) return console.log(err)
//     console.log('New love saved to database')
//     res.redirect('/relationships')
//   });
// });






// // ------------ unused code that might be useful here ---------   //


