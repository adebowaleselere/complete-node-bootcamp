const fs = require('fs');
const url = require('url');
const http = require('http');

const replaceTemplate = require('./modules/replaceTemplate');



//this is where the data is
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, `utf-8`);
const dataObj = JSON.parse(data);
// console.log(dataObj)






//these are for the templates being used
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, `utf-8`);
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, `utf-8`);
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, `utf-8`);


const server = http.createServer((req, res) => {
    // const pathName = req.url;

    const {query, pathname} = url.parse(req.url, true);
    //homepage
    if (pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type' : 'text/html'})

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)

        res.end(output);

    //product page
    }else if ( pathname === '/product'){
        res.writeHead(200, { 'Content-type': 'text/html'});

        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);


        //api page
    } 
    else if (pathname === '/api'){
        res.end(data);
        
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