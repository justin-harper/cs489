var fs = require("fs");
var http = require("http");
var path = require("path");

var handler = function(request, responce)
{
  responce.writeHead(200, {"Content-Type" : "text/json", "Access-Control-Allow-Origin": "*"});

  var p = "./";

  fs.readdir(p, function(err, files)
  {
    if(err)
    {
      responce.end("error: " + err.toString());
      return;
    }

    var directory = new Array();

    files.map(function(file)
    {
      return path.join(p, file);
    }).forEach(function(file)
    {
      //responce.write(file.toString() + " (" + path.extname(file).toString() + ")\n");
      directory.push({"name": file, "type": path.extname(file)});

      //console.log("%s (%s)", file, path.extname(file));
    });
    var z = JSON.stringify(directory);
    console.log(z);
    responce.end(JSON.stringify(directory));
  })


}

//var callme =

http.createServer(handler).listen(7070);
console.log("Server running @ localhost:7070/");
