var express = require('express');
var app = express();
var PORT = 3000;

app.get('/', function (req, res) {
console.log(req.subdomains);
res.send();
});

app.listen(PORT, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});