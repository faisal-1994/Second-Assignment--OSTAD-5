let http = require('http');
let fs = require('fs');
let multer = require('multer')


http.createServer(function(req, res) {
    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let data = fs.readFileSync('homepage.html', 'utf8');
        res.end(data);
    } else if (req.url === "/about") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let data = fs.readFileSync('about.html', 'utf8');
        res.end(data);
    } else if (req.url === "/contact") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let data = fs.readFileSync('contact.html', 'utf8');
        res.end(data);
    } 

    else if (req.url === "/bootstrap.css") { 
        res.writeHead(200, { 'Content-Type': 'text/css' });
        let data = fs.readFileSync('./bootstrap.css', 'utf8');
        console.log("served css");
        res.end(data);
    } 

    else if (req.url === "/file-write") { 
        fs.writeFile('demo.txt', 'hello world', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Internal Server Error");
                console.error("Error writing file:", err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("File written successfully");
                console.log("File written successfully");
            }
        });
    }
    
    else if (req.url === "/upload") { 

            let storage = multer.diskStorage({
                destination:function(req,file,callBack){
                    callBack (null, './uploads')
                },
            
                filename : function(req,file,callBack){
                    callBack(null,file.originalname)
                }
            });
            
            let upload = multer({storage:storage}).single('myfile');

            upload(req,res, function(error){
                if(error){
                    res.end("file upload fail")
                }
        
                else{
                    res.end('file upload successful')
                }
            })
    }
    
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 - Not Found");
    }

}).listen(5500, () => {
    console.log("Server running at http://localhost:5500/");
});


