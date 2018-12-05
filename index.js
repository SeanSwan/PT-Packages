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

else if (pathName === '/details' && id < packageData.length)  {
  res.writeHead(200, { 'Content-type': 'text/html'});
  
  fs.readFile(`${__dirname}/package.html`, 'utf-8', (err, data) => {
    const package = packageData[id];
    let output = data.replace(/{%PRODUCTNAME%}/g, packageData[id].productName);
     output = output.replace(/{%IMAGE%}/g, package.image);
     output = output.replace(/{%PRICE%}/g, package.price);
     output = output.replace(/{%TWELVEMONTH-TWO%}/g, package.twelvemonth-two);
     output = output.replace(/{%TWELVEMONTH-THREE%}/g, package.twelvemonth-three);
     output = output.replace(/{%TWELVEMONTH-FOUR%}/g, package.twelvemonth-four);
     output = output.replace(/{%TWELVEMONTH-FIVE%}/g, package.twelvemonth-five);
     output = output.replace(/{%DESCRIPTION%}/g, package.description);
    res.end(output);
  });

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
