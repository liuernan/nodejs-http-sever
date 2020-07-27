import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as path from "path";

const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  // console.log(request.url);
  // console.log(request.method);
  // console.log(request.headers);

  const data = fs.readFileSync(path.join("public", "index.html"));
  // response.write(data);
  // response.setHeader("liuernan", "hahaha");
  // response.statusCode = 404;
  response.end(data);
});

server.listen(8080);