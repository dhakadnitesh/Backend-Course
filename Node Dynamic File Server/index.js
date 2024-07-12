const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;

const server = http.createServer((req, res) => {
    const requestedPath = path.join(__dirname, req.url);

    if (fs.existsSync(requestedPath)) {
        const stat = fs.statSync(requestedPath);

        if (stat.isDirectory()) {
            const files = fs.readdirSync(requestedPath, 'utf-8');
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            files.forEach((ele) => {
                const fullPath = path.join(req.url, ele);
                const isDirectory = fs.statSync(path.join(requestedPath, ele)).isDirectory();
                const icon = isDirectory ? '📁' : '📄';
                res.write(`<li>${icon} <a href="${fullPath}">${ele}</a></li>`);
            });
            res.end();
        } else {
            const data = fs.readFileSync(requestedPath, 'utf-8');
            res.writeHead(200, {
                'Content-Type': 'text/plain',
            });
            res.end(data);
        }
    } else if (req.url !== "/favicon.ico") {
        console.log("req.url in else is", req.url);
        res.writeHead(404, {
            'Content-Type': 'text/html',
        });
        res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
