import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const {url: requestUrl, method, headers} = request;
  const {pathname} = url.parse(requestUrl);

  if ('GET' === method) {
    console.log("get method to be handling");
    console.log(headers);
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
      response.end(data.toString());
    }
  });

});

server.listen(8080);