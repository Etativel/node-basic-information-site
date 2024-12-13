import http from "http";
import url from "url";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

http
  .createServer((req, res) => {
    let query = url.parse(req.url, true);
    let filePath =
      "./pages/" +
      (query.pathname === "/" ? "/index.html" : query.pathname + ".html");
    let errorPath = "./pages/404.html";
    fs.readFile(filePath, (err, data) => {
      if (err) {
        fs.readFile(errorPath, (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            return res.end("<h1>500 Internal Server Error</h1>");
          }
          res.writeHead(404, { "Content-Type": "text/html" });
          return res.end(data);
        });
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      console.log(process.env.KEY);
      return res.end(data);
    });
  })
  .listen(8080);
