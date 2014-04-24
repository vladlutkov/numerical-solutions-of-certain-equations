fs = require "fs"
express = require "express"
app = express()

app.use require("body-parser")()
app.use require("method-override")()
app.use "/", express.static("site/")

log = (str) ->
  console.log "### Service Action ###"
  console.log "Message: " + str
  console.log "######################"

app.get "/", (req, res) ->
  fs.readFile "site/index.html", (err, html) ->
    throw err if err
    
    res.writeHeader 200,
      "Content-Type": "text/html"
    res.write html
    res.end()

app.post "/data", (req, res) ->
  result = [];
  for x in [-10..10]
    eval "result.push([x, " + req.body.formula + "]);"
  res.json result

app.listen 3000