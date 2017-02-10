var fs = require('fs');
var http = require('http');
var express = require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sms', function(req, res) {
  var twiml = new twilio.TwimlResponse();
  twiml.message('wew lad');

  writeToFile(req.body.Body);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(process.env.PORT, function () {
  console.log(`listening on ${process.env.PORT}`);
});

function writeToFile(data) {
  fs.appendFile('sms.txt', data, (err) => {
    if (err) {
      throw err;
    }
    console.log(`appended ${data} to sms.txt`);
  });
}
