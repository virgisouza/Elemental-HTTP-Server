const http = require('http');
const fs = require('fs');
const qs = require('querystring');


http.createServer(function (req, res) {

  // console.log(req)
  switch (req.method) {
    case "GET":
      if (req.url === '/') {
        getIt(res,'./public/index.html');
      }else if( req.url === '/index.html' ) {
        getIt(res, './public/index.html');
      }else if( req.url === '/css/styles.css') {
        getItCSS(res, './public/css/styles.css');
      }else {
        getIt(res, `./public${req.url}`);
      };

        break;

    case "POST":
      if( req.url === '/boron.html') {
        let reqBody = '';

        req.on('data', (data) => {
          //receiving chunks of data
          reqBody += data;
          //console.log(reqBody);

        });

        req.on('end', (data) => {
          var formData = qs.parse(reqBody);
          console.log(formData)

          res.writeHead(200, {'Content-Type': 'text/html'});

          res.write(template('Boron', 'B', '5', 'Boron is a chemical element with symbol B and atomic number 5. Because boron is produced entirely by cosmic ray spallation and not by stellar nucleosynthesis it is a low-abundance element in both the Solar system and the Earths crust.[12] Boron is concentrated on Earth by the water-solubility of its more common naturally occurring compounds, the borate minerals. These are mined industrially as evaporites, such as borax and kernite. The largest proven boron deposits are in Turkey, which is also the largest producer of boron minerals.'));

          res.end();
        });
      }

        break;

      default:
        getIt(res, './public/404.html');

        break;
  }





}).listen(8080);


///begin getIt function
function getIt (res, path, data) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err){
      res.write(404, {'Content-Type': 'text/html'});
      fs.readFile('./public/404.html', 'utf8', (data) => {
        res.write(data);
      });
      res.end();
      }else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    }
  })
};
///end getIt function

//begin getItCSS function
function getItCSS (res, path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err){
      res.write(404, {'Content-Type': 'text/html'});
      fs.readFile('./public/404.html', 'utf8', (data) => {
        res.write(data);
      });
      res.end();
      }else{
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
        res.end();
      }
  })
};
///end getItCSS function


////getItPost
function getItPost (req, res, formData) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  getIt(req, res, formData);
  res.end();
}
////end getItPost

///build template function
function template(elementName, elementSymbol, elementAtomicNumber, elementDescription) {
  return  `<html>\n<body>\n<h1>${elementName}</h1><h2>${elementSymbol}</h2><h3>Atomic number ${elementAtomicNumber}</h3>\n<p>${elementDescription}</p>\n<p><a href="/">back</a></p>\n</body>\n</html>`
};
///buildtemplate function end


