var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url, true);
  var method = request.method;

  // get URL pathing match, with request type.
  if(parsedUrl.pathname == "/listings" && method == 'GET') {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(JSON.stringify(listingData));
    response.end();
  } else if(method == 'GET'){
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Bad gateway error');
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('404 Not Found');
  }
};

 // a server is created, but not started
 server = http.createServer(requestHandler);

fs.readFile('./listings.json', 'utf8', function(err, data) {
    try {
      listingData = JSON.parse(data);
      console.log(listingData);
    } catch (e) {
      console.error(e.message);
    }
});


// the server is now started, listening for requests on port 8080
server.listen(port);
