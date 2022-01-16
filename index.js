const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  
  // figure out the URL
  let serverCode = 200;
  let htmlPath;
  
  switch(req.url) {
    case '/':
      htmlPath = './index.html';
      break;
    case '/about.html':
      htmlPath = './about.html';
      break;
    case '/contact-me.html':
      htmlPath = './contact-me.html';
      break;
    default:
      serverCode = 404;
      htmlPath = './404.html';
      break;
  }

  // send back the page
  res.statusCode = serverCode;
  res.setHeader('Content-Type', 'text/html');
  sendHtml(htmlPath, res);
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

const sendHtml = (filePath, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // send back the pate
    res.write(data);
    res.end();
  });
}