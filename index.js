const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`{$__dirnaame}/data/data.json`,  `utf-8`);
const packageData = JSON.parse(json);

const server = http.createServer((req, res) => {

  
  const pathName = url.parse(req.url, true).pathname;  
    const id = url.parse(req.url, true).query.id;

  // PRODUCT OVERVIEW
  if (pathName === '/packages' || pathName === '/') {
    res.writeHead(200, { 'Content-type': 'text/html'});

    fs.readFile(`${__dirname}/templates/overview.html`, 'utf-8', (err, data) => {
      let overviewOutput = data;
      
     

      fs.readFile(`${__dirname}/templates/card.html`, 'utf-8', (err, data) => {
        
        const cardsOutput = packageData.map(el => replaceTemplate(data, el)).join('');
        overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);
        res.end(overviewOutput);
      });
    });
   




}

// LAPTOP DETAIL
else if (pathName === '/details' && id < packageData.length)  {
  res.writeHead(200, { 'Content-type': 'text/html'});
  
  fs.readFile(`${__dirname}/templates/packages.html`, 'utf-8', (err, data) => {
    const package = packageData[id];
    const output = replaceTemplate(data, package);
    res.end(output);
  });

}
else if ((/\.(Jpg|jpeg|png|gif)$/i).test(pathName)) {
  fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
    res.writeHead(200, {'Content-type': 'image/jpg'});
    res.end(data);
  })


}





// URL NOT FOUND
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



function replaceTemplate(originalHtml, package) {
  let output = original.replace(/{%PRODUCTNAME%}/g, packageData[id].productName);
  output = output.replace(/{%IMAGE%}/g, package.image);
  output = output.replace(/{%PRICE%}/g, package.price);
  output = output.replace(/{%TWELVEMONTH-TWO%}/g, package.twelvemonth-two);
  output = output.replace(/{%TWELVEMONTH-THREE%}/g, package.twelvemonth-three);
  output = output.replace(/{%TWELVEMONTH-FOUR%}/g, package.twelvemonth-four);
  output = output.replace(/{%TWELVEMONTH-FIVE%}/g, package.twelvemonth-five);
  output = output.replace(/{%DESCRIPTION%}/g, package.description);
  output = output.replace(/{%ID%}/g, package.id);
  return output;
}

/*const query = url.parse(req.url, true)
  console.log(query);*/
