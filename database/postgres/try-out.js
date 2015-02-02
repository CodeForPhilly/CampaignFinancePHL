'use strict';

var pg = require('pg');
var conString = 'postgres://jeffersii:password1@localhost/open_disclosure_philly';

pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * FROM candidates', function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0]);
    //output: 1
  });
  
});