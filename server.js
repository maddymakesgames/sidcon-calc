const http = require('http');
const fs = require('fs');
const Url = require('url').Url;


let files = {};

for(let file of fs.readDirSync('./')) {
    if(!fs.lstatSync(file).isDirectory()) {
        files[file] = fs.readFileSync(file);
    }
}


const server = http.createServer((req, res) => {
    let url = new Url(`localhost${req.url}`);
}).listen(8080);
