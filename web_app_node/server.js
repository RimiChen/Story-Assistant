var http = require('http');
var fs = require('fs');

http.createServer( function(request, response){
  var url = request.url;
  switch(url){
    case '/':
      gerStaticFileContent(response, 'index2.html', 'text/html');
      break;
    default:
      response.writeHead(404, {'Content-Type':'text/plain'});
      response.end('404 - Page not found.');
   
  }
}).listen(5678);
console.log('server run at http://localhost:5678');

function gerStaticFileContent(response, filepath, contentType){
  fs.readFile(filepath, function(error, data){
    if(error){
      response.writeHead(500, {'Content-Type':'text/plain'});
      response.end('500 - Internal Server Error.');
    }
    if(data){
      response.writeHead(200, {'Content-Type':'text/html'});
      response.end(data);
    }
  });
}