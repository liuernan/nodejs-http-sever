import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as path from "path";

const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const {url, method, headers} = request;
  let requestFile = url;

  if ("/" === request.url) {
    requestFile = "index.html";
  }
  fs.readFile(path.join("public", requestFile), (error, data) => {
    if (error) {
      response.statusCode = 404;
      response.end("no page for you");
    } else {
      response.end(data.toString());
    }
  });

});

server.listen(8080);