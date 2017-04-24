var https = require('https');
var fs = require('fs');

var options =
{
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var a = https.createServer(options, function(req, res)
{
  res.writeHead(200);
  res.end(fs.readFileSync('hw8.html'));
}).listen(7070);

console.log("listening on :7070");
