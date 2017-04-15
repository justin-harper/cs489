var fs = require("fs");
var http = require("http");
var path = require("path");

function GetType(stats, file)
{
  if(stats.isFile())
  {
    var ext = path.extname(file);

    if(ext === "")
    {
      return "file";
    }
    else
    {
      return ext;
    }
  }
  else if(stats.isDirectory())
  {
    return "dir";
  }
}

function GetMIMEType(type)
{
  if(type === ".mov")
  {
    return "video/quicktime";
  }
  if(type === ".avi")
  {
    return "video/avi";
  }
  if(type === "file")
  {
    return "text/plain";
  }
  if(type === ".mp3")
  {
    return "audio/mp3";
  }
  if(type === ".pdf")
  {
    return "application/pdf";
  }
  if(type === ".js")
  {
    return "text/javascript"
  }
  if(type === ".txt")
  {
    return "text/plain";
  }
  if(type === ".jpg")
  {
    return "image/jpeg";
  }
  if(type === ".png")
  {
    return "image/png";
  }
  if(type === ".gif")
  {
    return "image/gif";
  }
  // ... and many more

}

var handler = function(request, responce)
{

  if(request.url === "/favicon.ico")
  {
    responce.writeHead(404);
    responce.end();
    return;
  }






  var p = "." + request.url;
  console.log(p);
  try
  {
    var s = fs.statSync(p);

    if (s.isDirectory())
    {
      responce.writeHead(200, {"Content-Type" : "text/json", "Access-Control-Allow-Origin": "*"});
      fs.readdir(p, function (err, files)
      {
        if (err)
        {
          responce.end("error: " + err.toString());
          return;
        }

        var directory = [];

        files.map(function (file)
        {
          return path.join(p, file);
        }).forEach(function (file)
        {
          var stats = fs.statSync(file);
          var type = GetType(stats, file);

          var x = {"name": file, "type": type, "stats": stats};
          directory.push(x);

        });
        var z = JSON.stringify(directory);
        //console.log(z);
        responce.end(JSON.stringify(directory));
      })
    }
    else
    {
      var ContentType = GetMIMEType(GetType(s, p));

      responce.writeHead(200, {"Content-Type" : ContentType, "Access-Control-Allow-Origin": "*"})
      var readS = fs.createReadStream(p);
      readS.pipe(responce);
    }
  }
  catch (e)
  {
    console.log("ERROR: " + e);
  }

};



http.createServer(handler).listen(7070);
console.log("Server running @ localhost:7070/");
