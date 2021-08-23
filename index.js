const express = require('express');
const bodyParser = require('body-parser');
const { JSONRPCServer } = require('json-rpc-2.0');

const server = new JSONRPCServer();

server.addMethod('echo', ({ text }) => text);
server.addMethod('log', ({ message }) => console.log(message));

const app = express();
app.use(bodyParser.json());

app.post('/json-rpc', (req, res) => {
  const jsonRPCRequest = req.body;
  // server.receive takes a JSON-RPC request and returns a promise of a JSON-RPC response.

  server.receive(jsonRPCRequest).then(jsonRPCResponse => {
    if (jsonRPCResponse) {
      res.json(jsonRPCResponse);
    } else {
      // If response is absent, it was a JSON-RPC notification method.
      // Respond with no content status (204).
      res.sendStatus(204);
    }
  });
});

app.listen(80);
