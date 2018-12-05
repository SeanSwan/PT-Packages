const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`{$__dirnaame}/data/data.json`,  `utf-8`);
const packageData = JSON.parse(json);

const server = http.createServer((req, res) => {

  
  const pathName = url.parse(req.url, true).pathname;  
    
  
  if (pathName === '/packages' || pathName === '/') {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end('this is the PACKAGES page');
}

else if (pathName === '/details') {
  res.writeHead(200, { 'Content-type': 'text/html'});
  res.end('this is the DETAILS page');

}

else {
  res.writeHead(404, { 'Content-type': 'text/html'});
  res.end('URL was not found on the server!');

}


  

  
  
  res.writeHead(200, { 'Content-type': 'text/html'});
  res.end('this is the responce!');
});

server.listen(1337, '127.0.0.1', () =>  {
  console.log('Listening for requests now');
});





/*const query = url.parse(req.url, true)
  console.log(query);*/
