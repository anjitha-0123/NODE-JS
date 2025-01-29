const http = require('http');


// Define the server
const server = http.createServer((req, res) => {
  // Log incoming request details
  console.log(`Request received: ${req.method} ${req.url}`);

  
});

// Define the port
const PORT = 3000;

// Start listening for requests
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
