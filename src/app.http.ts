import http from 'http';
import fs from 'fs';


const server = http.createServer((req, res) => {
    console.log(req.url);

    // RESPONDER EN TODAS LAS URL UN TEXTO
    //res.write('Hola Mundo');
    //res.end();

    // RESPONDER TIPO DE CONTENIDO HTML
    //res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write(`<h1>Hola Mundo ${req.url} </h1>`);
    //res.end();

    // RESPONDER CON JSON
    //const data = {'name': 'Lili', 'games': ['Tekken 5', 'Tekken 6', 'Tekken 7', 'Tekken 8']}
    //res.writeHead(200, {'content-type': 'application/json'});
    //res.end(JSON.stringify(data));

    // RESPONDER SOLO EN URL ESPESIFICA CON HTML
    if(req.url ==='/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(htmlFile);
        return;
    } 

    if(req.url?.endsWith('.js')){
        res.writeHead(200, {'content-type': 'application/javascript'});
    } else if(req.url?.endsWith('.css')) {
        res.writeHead(200, {'content-type': 'text/css'});
    }

    const responseContent = fs.readFileSync(`./public/${req.url}`, 'utf-8');
    res.end(responseContent);

});


server.listen(8080, () => {
    console.log('Server is running on port 8080!')
});
