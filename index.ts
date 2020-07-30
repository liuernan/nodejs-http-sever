import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";

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
    pathname = "index.html";
  }

  fs.readFile(path.join("public", pathname), (error, data) => {
    if (error) {
      if ("ENOENT" === error.code) {
        response.statusCode = 404;
        response.end("no page for you");
      } else {
        response.statusCode = 500;
        response.end("server being busy, try again later");
      }

    } else {
      if ("css" === pathname.split(".")[pathname.split(".").length - 1]) {
        response.setHeader("Content-Type", "text/css");
      }

      response.end(data.toString());
    }
  });

});

server.listen(8080);