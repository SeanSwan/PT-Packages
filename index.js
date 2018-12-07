const fs = require('fs');
const http = require('http');
const url = require('url');

// Read File from data.JSON using syncrouns only at begining of script  
// utf-8 specifiys the char encoding 

const json = fs.readFileSync(`${__dirname}/data/data.json`,  `utf-8`);
const packageData = JSON.parse(json);

// Creating Server passing in call back function (req, res) runs each time webserver is used
const server = http.createServer((req, res) => {

  // pulling pathname from req with const pathName
  // const id is parseing the url to a query specifically to pull the id from the query string
  
  const pathName = url.parse(req.url, true).pathname;  
    const id = url.parse(req.url, true).query.id;

  // PRODUCT OVERVIEW---------------------------------------------------------------------------------------------------------
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

// LAPTOP DETAIL---------------------------------------------------------------------------------------------------------------------
else if (pathName === '/packages' && id < packageData.length)  {
  res.writeHead(200, { 'Content-type': 'text/html'});

  
  fs.readFile(`${__dirname}/templates/packages.html`, 'utf-8', (err, data) => {
    const packages = packageData[id];
    const output = replaceTemplate(data, package);
    
    res.end(output);
    
  });

  fs.readFile(`${__dirname}/templates/packages.html`, 'utf-8', (err, data) => {   
    const packages = packageData[id];
    const output = replaceTemplate(data, package);
    res.end(output);
  });

}
else if ((/\.(Jpg|jpeg|png|gif)$/i).test(pathName)) {
  fs.readFile(`${__dirname}/img${pathName}`, (err, data) => {
    res.writeHead(200, {'Content-type': 'image/jpg'});
    res.end(data);
  })

}

// URL NOT FOUND----------------------------------------------------------------------------------------------------------------------------
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

// Using regular expression for price.
function replaceTemplate(originalHtml, package) {
  let output = originalHtml.replace(/{%PRODUCTNAME%}/g, packageData[id].productName);
  output = output.replace(/{%IMAGE%}/g, package.image);
  output = output.replace(/{%PRICE%}/g, package.price);
  output = output.replace(/{%TWELVEMONTHTWO%}/g, package.twelvemonthtwo);
  output = output.replace(/{%TWELVEMONTHTHREE%}/g, package.twelvemonththree);
  output = output.replace(/{%TWELVEMONTHFOUR%}/g, package.twelvemonthfour);
  output = output.replace(/{%TWELVEMONTHFIVE%}/g, package.twelvemonthfive);
  output = output.replace(/{%DESCRIPTION%}/g, package.description);
  output = output.replace(/{%ID%}/g, package.id);
  return output;
}

