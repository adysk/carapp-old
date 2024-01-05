
var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/car";

var client = new pg.Client(conString);
client.connect();
var dbConnection ={};

dbConnection.getPersons = function () {

	var query = client.query({
		name: 'get person',
		text: "Select * from Persoane"
	});
	return query.on('end', function(result) {
		
	  return result;
    });

}

dbConnection.getAccounts = function () {

	var query = client.query({
		name: 'get accounts',
		text: "Select * from Conturi"
	});
	return query.on('end', function(result) {
		
	  return result;
    });

}
dbConnection.submitForm = function (data) {

	console.log(data);

	return "sdg";
}
module.exports = dbConnection;
