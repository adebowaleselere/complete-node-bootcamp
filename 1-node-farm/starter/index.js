const fs = require('fs');
const url = require('url');
const http = require('http');



//this is where the data is
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, `utf-8`);
const dataObj = JSON.parse(data);

//these are for the templates being used
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, `utf-8`);
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, `utf-8`);
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, `utf-8`);


const server = http.createServer((req, res) => {
    const pathName = req.url;
    //homepage
    if (pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {'Content-type' : 'text/html'})
        res.end('<h1>You are seeing the overview</h1>');

    //api page
    } if (pathName === '/api'){
        res.end(dataObj);
        
    //error 404 
    } else{
        res.writeHead(404, {
            'content-type' : 'text/html'
        });
        res.end('<h1>Soorry, Wrong place to be at the wrong time</h1>');
    };
});


server.listen(8000, '127.0.0.1', ()=>{
    console.log(`The server is running`);
});