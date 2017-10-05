const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

http.createServer(function (req, res) {
 //console.log(req)
 // console.log("*****************************************************************************");
 // console.log('request: ', req.headers);
 // console.log("*****************************************************************************");
 // console.log('request method: ', req.method);
 // console.log("*****************************************************************************");
 // console.log('request url: ', req.url);
 // console.log("*****************************************************************************");
 // console.log('response: ', res);
 // console.log("*****************************************************************************");
 // console.log('response: ', res.method);
 // console.log("*****************************************************************************");
 // console.log('response: ', res.url);
 // console.log("*****************************************************************************");
 // console.log('response: ', res.header);

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!');
  res.end();
}).listen(8080);