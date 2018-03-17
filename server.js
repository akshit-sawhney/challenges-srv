let teade = require('teade');

let server = new teade.Server();

server.addService({
  'rpcTest': rpcTest
});

server.bind(process.env.SERVER_RPC_PORT);
server.start();

let blank_response_struct = {
  success: null,
  message: "",
  type: "challenges-server",
  action: "",
  id: null,
  data: null
};

let blankPayload = {
  email: undefined
};

function rpcTest(call, callback) {
  let response_struct = Object.assign({}, blank_response_struct);
  response_struct.action = "rpcTest";
  response_struct.status = 200;
  response_struct.success = true;
  response_struct.message = "success";
  return callback(null, response_struct);
};

module.exports = server;