import * as http from "http";

const server = http.createServer();

server.on("request", (request, response) => {
  console.log("someone request you");
  // console.log("request:");
  // console.log(request);
  // console.log("response:");
  // console.log(response);
  response.end("hi, I received ur request.");
});

server.listen(6666);