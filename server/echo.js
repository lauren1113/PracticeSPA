const http = require("http");

const server = http.createServer((request, response) => {
  const headers = { "Content-Type": "application/json" };
  let message = "Not Found";
  let status = 404;

  if (request.url === "/" && request.method === "
  ") {
    // handle "correct" requests
    message = "hello world";
    status = 200;
  }

  response.writeHead(status, headers);
  response.write(JSON.stringify({ message }));
  response.end();
});

server.listen(8675);
