require('array.prototype.find');
var fs = require('fs');
var Client = require('ftp');
var csv = require('csv');
var mongoose = require('mongoose');
var Contribution = require('./Contribution.js');



// Ok. This does directory traversal. Seems good.

// var c = new Client();
// c.on('ready', function() {
//   console.log('connected!');
//   c.list(function(err, list) {
//     if (err) throw err;
//     console.dir(list);

//     var testFolder = list.find(function(x){
//       return x.name === '2014';
//     });

//     if (testFolder){
//       c.list(testFolder.name, function(err, list){
//         if (err) throw err;
//         console.log('Entering testFolder...');
//         console.dir(list);
//       })
//     }

//     c.end();
//   });

// });

// Ok. Fetches a csv file.

// var c = new Client();
// c.on('ready', function() {
//   c.get('2011/2011 Cycle 6/Nutter for Mayor/20111207/contrib.txt', function(err, stream) {
//     if (err) throw err;
//     stream.once('close', function() { c.end(); });
//     stream.pipe(fs.createWriteStream('foo.local-copy.txt'));
//   });
// });


// Mongo & Mongoose
mongoose.connect('mongodb://odp:Password1@ds031611.mongolab.com:31611/opendisclosurephilly')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('DB connected...')
});

/////// CSV Parsing
var output = [];
// Create the parser
var parser = csv.parse({
  columns: Contribution.columnsDefinition
});

//Use the writable stream api
parser.on('readable', function(){
  while(record = parser.read()){
    var contrib = new Contribution(record);
    contrib.save(function(err, contrib){
      if (err){ console.log('error saving...');}
      console.log('Saved!');
    });
  }
});

// Catch any error
parser.on('error', function(err){
  console.log(err.message);
});
parser.on('finish', function(){
  console.log('Finished...');
  var results = db.collections.contributions.find();
  db.close();
});

var input = fs.createReadStream('foo.local-copy.txt');
input.pipe(parser);
// c.connect({
//   host: 'ftp.phila-records.com'
//});