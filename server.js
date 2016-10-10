const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient, assert = require('assert');
const path = require('path');
const ID = require('mongodb').ObjectID

var url = 'mongodb://localhost:27017/myproject'; // Connection URL
var db
// Use connect method to connect to the server
MongoClient.connect(url, function(err, database) {
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


app.get('/', (req,res) => {
  db.collection('beavers').find().toArray((err, result) => {  // get our cursor form db and turn into a nice array of objects
    if (err) return console.log(err)
    res.render('index.ejs', {beavers: result});   // renders index.ejs onto the page
    console.log({beavers: result})
  })
  console.log('home page load');
});

app.get('/create', (req, res) => {
  console.log('rendering create form')
  res.render('create.ejs')
})

app.post('/create', (req, res) => {  // post new beaver info to our db
  db.collection('beavers').save(req.body, (err, result) =>{
    if (err) return console.log(err)
    console.log('Beaver saved to database')
  })
  var log = {name: req.body.name,
             log0: {location: req.body.location,
                        date: req.body.birthdate} }
  db.collection('log').save(log, (err, result) =>{
    if (err) return console.log(err)
    console.log('Beaver sighting saved to log')
    res.redirect('/')
  })
})

app.get('/beaver/:id', (req, res) => {
  var id = require('mongodb').ObjectID(req.params.id);
  db.collection('beavers').findOne({_id: id}, (err, result) => {  // get our cursor form db and turn into a nice array of objects
    if (err) return console.log(err)
    res.render('details.ejs', {beaver: result});   // renders user onto the page
    console.log({beaver: result})
  })
  console.log('user page load');
})

app.get('/edit/:id', (req, res) => {
  var id = require('mongodb').ObjectID(req.params.id);
  db.collection('beavers').findOne({_id: id}, (err, result) => {  // get our cursor form db and turn into a nice array of objects
    if (err) return console.log(err)
    res.render('edit.ejs', {beaver: result});   // renders user onto the page
    console.log({beaver: result})
  })
})

app.post('/savechanges/:id', (req, res) => {
  console.log('Saving Changes');
  var id = ID(req.params.id);
  db.collection('beavers').findOne({_id: id}, function(err, beaver){
    if (err) console.log(err)
    console.log(beaver);
    beaver.name = req.body.name;
    beaver.log[0] = [{location: req.body.location,
                date: req.body.birthdate}];
  });
  // console.log(beaver)
  // db.collection('beavers').findOneAndUpdate(
  //   {_id: id},
  //   {$set:{
  //    name: req.body.name
  //    ,
  //     log: [{location: req.body.location,
  //               date: req.body.birthdate}]}
  //   }}
  //   ,
  //   (err, result) => {
  //     if (err) return res.send(err)
  //   }
  // )
  res.redirect('/beaver/' + id)
})

app.get('/logger/:id', (req, res) => {
  var id = require('mongodb').ObjectID(req.params.id);
  db.collection('beavers').findOne({_id: id}, (err, result) => {  // get our cursor form db and turn into a nice array of objects
    if (err) return console.log(err)
    res.render('logger.ejs', {beaver: result});   // renders user onto the page
    console.log({beaver: result})
  })
})

app.post('/logging/:id', (req, res) =>{
  console.log('Saving new log to db')
  var id = require('mongodb').ObjectID(req.params.id);
  db.collection('beavers').findOneAndUpdate(
    {_id: id},
    {$push:{
      log:{"location": req.body.location, "date": req.body.date}
    }}
    ,
    (err, result) => {
      if (err) return res.send(err)
      res.redirect('/beaver/' + id)
    }
  );
})

app.get('/displayLog/:id', (req, res) => {
  var id = require('mongodb').ObjectID(req.params.id);
  db.collection('beavers').findOne({_id: id}, (err, result) => {  // get our cursor form db and turn into a nice array of objects
    if (err) return console.log(err)
    res.render('displayLog.ejs', {log: result.log});   // renders user onto the page
    console.log({log: result.log})
  })
})

app.get('/relationships', (req, res) => {
  db.collection('relationships').find().toArray((err, result) =>{
    if (err) return console.log(err)
    res.render('relationships.ejs', {relations: result})  
  })
})

app.get('/newLove', (req, res) => {
  console.log('rendering new love form');
  db.collection('beavers').find().toArray((err, result) =>{
    if (err) return console.log(err)
    res.render('loveform.ejs', {beavers: result})
  })
});

app.post('/newLove', (req, res) => {
  console.log('Saving new love to database...')
  db.collection('relationships').save(req.body, (err, result) =>{
    if (err) return console.log(err)
    console.log('New love saved to database')
    res.redirect('/relationships')
  });
});

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

app.get('/deleteRelationships', (req, res) =>{ // delete all relationship records
  db.collection("relationships").remove()
  res.redirect('/')
})

app.get('/deleteBeavers', (req, res) =>{  // delete all beaver records
  db.collection("beavers").remove()
  res.redirect('/')
})


// --------------------


// var beaver =  db.collection('beavers').find({_id: id})
//   var location = beaver.location
//   console.log(location);
//   var date =  beaver.birthdate
//   db.collection('beavers').findOneAndUpdate(
//       {_id: id},
//       {$push:{
//         log:{"location": location, "date": date}
//       }},
//     (err, result) => {
//       res.render('logger.ejs', {beaver: result});   // renders user onto the page
//       console.log({beaver: result})
//     })


// app.get('/', (req, res) => {   // get initial page _ arg1 = path _ arg2 = function (takes http 'request' and 'response'
// 	db.collection('quotes').find().toArray((err, result) => {  // get our cursor form db and turn into a nice array of objects
//     if (err) return console.log(err)
//     res.render('index.ejs', {quotes: result});   // renders index.ejs onto the page
//     // res.send('<h2>'+result[0].quote+'</h2>');   // sends just the first quote to the page as H2
//   })
// });


// app.post('/quotes', (req, res) => { // post form info to our db
//   // console.log(req.body);
//   db.collection('quotes').save(req.body, (err, result) => {
//   	if (err) return console.log(err);

//   	console.log("saved to db");
//   	res.redirect('/');
//   })
// });


// app.put('/quotes', (req, res) => {
//   db.collection('quotes')
//   .findOneAndUpdate({name: 'Yoda'}, {
//     $set: {
//       name: req.body.name,
//       quote: req.body.quote
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })