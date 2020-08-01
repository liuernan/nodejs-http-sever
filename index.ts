import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const baseDir = path.resolve(__dirname, "public");

const server = http.createServer();
server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const {url: requestUrl, method} = request;
  let {pathname} = url.parse(requestUrl);

  if ("GET" !== method) {
    response.statusCode = 405;
    response.end("Server only handling Request with GET method.");
    return;
  }


  if ("/" === pathname) {
    pathname = "/index.html";
  }

  fs.readFile(path.resolve(baseDir, pathname.substring(1)), (error, data) => {
    if (error) {
      console.log(error);
      if (-2 === error.errno) {  // macOS 10.14.6 (18G4032)
        response.statusCode = 404;
        response.end("no page for you");
      } else {
        response.statusCode = 500;
        response.end("server being busy, try again later");
      }

    } else {
      if ("css" === pathname.substring(1).split(".")[1]) {
        response.setHeader("Content-Type", "text/css");
      }

      response.setHeader("Cache-Control", "public, max-age=600");
      response.end(data);
    }
  });

});

server.listen(8080);