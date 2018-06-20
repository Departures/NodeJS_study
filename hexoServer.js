let  http = require("http");
let  fs = require("fs");
let  url = require("url");
let  path=require("path");

let server = http.createServer(function (req, res) {
    let pathname=url.parse(req.url).pathname;
    /*设置index页面*/
    if(pathname=="/"){
        pathname="/public/index.html";
    }
    //读取拓展名MIME
    let extname=path.extname(pathname);

    fs.readFile(filePath,function (err, data) {
        if(err){
            fs.readFile("./public/404.html",function(err,data){
                res.writeHead(404,{"Content-type":"text/html;charset=UTF8"});
                res.end(data);
            });
            return;
        }else{
            getMime(extname,function (mime) {
                res.writeHead(200,{"Content-type":mime});
                res.end(data);
            });
        }
    });

}).listen(80, "198.13.47.11");

function getMime(extname,callback) {
    fs.readFile("./public/mime.json",function (err, data) {
        if(err){
            console.log(err);
            return;
        }else{
            let mimeJson=JSON.parse(data);
            let mime=mimeJson[extname]||"text/plain";
            callback(mime);
        }
    });
}