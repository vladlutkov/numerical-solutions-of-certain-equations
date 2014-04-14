var fs = require('fs');
var express = require('express');
var app = express();
 
app.use(require("body-parser")()); // стандартный модуль, для парсинга JSON в запросах
app.use(require("method-override")()); // поддержка put и delete
app.use('/', express.static("../web_frontend/"));

function log(str) {
  console.log("### Service Action ###");
  console.log("Message: " + str);
  console.log("######################");
}

app.get('/', function (req, res) {
	fs.readFile('../web_frontend/index.html', function (err, html) {
		if (err) {
			throw err; 
		}
		res.writeHeader(200, {"Content-Type": "text/html"});
		res.write(html);
		res.end();
	});
});

app.get("/categories", function(req, res){
	log("GET /categories");
	res.json(cats);
});

app.get("/schools", function(req, res){
	log("GET /schools");
	res.json({schools: "azaazazaz!"});
});

app.get("/profiles/:id/categories", function(req, res){
	log("GET /profiles/" + req.params.id + "/categories");
	res.json(cats.slice(1, 3));
});

app.post("/login", function(req, res){
	console.log(req.body);
});

app.listen(3000);