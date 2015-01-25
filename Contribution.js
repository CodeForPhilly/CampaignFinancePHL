var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  col0: Number,
  year: Number,
  cycle: Number,
  schedule: String,
  name: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  profession: String,
  employer: String,
  employerAddress1: String,
  employerAddress2: String,
  employerCity: String,
  employerState: String,
  employerZip: String,
  date: Number,
  amount: Number,
  col19: String,
  col20: String,
  col21: String,
  col22: String,
  description: String ,
  reportedOn: String,
  reportedBy: String
});

var Model = mongoose.model('Contribution', schema);

Model.columnsDefinition = ['col0',
  'year',
  'cycle',
  'schedule',
  'name',
  'address1',
  'address2',
  'city',
  'state',
  'zip',
  'profession',
  'employer',
  'employerAddress1',
  'employerAddress2',
  'employerCity',
  'employerState',
  'employerZip',
  'date',
  'amount',
  'col19',
  'col20',
  'col21',
  'col22',
  'description'];

module.exports = Model;