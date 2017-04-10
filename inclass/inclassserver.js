var fs = require("fs");
var http = require("http");

var handler = function(request, responce)
{
  responce.writeHead(200, {"Content-Type": "text/html"});

  responce.write("<htmkl><body>");

  console.log("Requsted URL: " + request.url);

  var hitcount = 0;
  try
  {
      hitcount = fs.readFileSync("hitcount.dat");
  }
  catch (e)
  {

  }

  hitcount++;
  fs.writeFileSync("hitcount.dat", hitcount.toString());
  responce.write("Hit count: " + hitcount);

  responce.end("</body></html>");

}

http.createServer(handler).listen(7070);
console.log("server running at http://127.0.0.1:7070/");
