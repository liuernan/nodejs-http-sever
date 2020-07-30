import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const {url: requestUrl, method, headers} = request;
  const {pathname} = url.parse(requestUrl);

  if ("GET" !== method) {
    response.statusCode = 405;
    response.end("Server do not allow POST Request now.");
    return;
  }

  let requestFile = pathname;

  if ("/" === request.url) {
    requestFile = "index.html";
  }
  fs.readFile(path.join("public", requestFile), (error, data) => {
    if (error) {
      response.statusCode = 404;
      response.end("no page for you");
    } else {
      if ("css" === requestFile.split(".")[requestFile.split(".").length - 1]) {
        response.setHeader("Content-Type", "text/css");
      }

      response.end(data.toString());
    }
  });

});

server.listen(8080);