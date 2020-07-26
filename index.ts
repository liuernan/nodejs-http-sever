import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";

const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  console.log(request.url);
  console.log(request.method);
  console.log(request.headers);

  response.end("hi, I received ur request.");
});

server.listen(6666);