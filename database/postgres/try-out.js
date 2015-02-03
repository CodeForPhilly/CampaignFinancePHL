'use strict';

var pg = require('pg');
var conString = 'postgres://jeffersii:password1@localhost/open_disclosure_philly';

pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  // client.query('SELECT reportedBy, SUM(amount) AS totalRaised FROM contributions GROUP BY reportedBy ORDER BY totalRaised DESC', function(err, result) {
  //   //call `done()` to release the client back to the pool
  //   //done();

  //   if(err) {
  //     return console.error('error running query', err);
  //   }
  //   console.log(result.rows[0]);
  //   console.log(result.rows[1]);
  //   console.log(result.rows[2]);
  //   console.log(result.rows[3]);
  //   console.log(result.rows[4]);
  //   //output: 1
  // });

  client.query('SELECT name, amount FROM contributions ORDER BY amount DESC LIMIT 10', function(err, results){
    done();
    console.log(results.rows);
  });
  
});

pg.end();