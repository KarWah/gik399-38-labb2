const express = require("express");
const server = express();

server
  .use(express.json()) // Enable parsing of JSON data
  .use(express.urlencoded({ extended: false })) // Enable parsing of URL-encoded data
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Headers", "*"); // Allow all headers
    res.header("Access-Control-Allow-Methods", "*"); // Allow all HTTP methods
    next(); // Pass control to the next middleware
  });

  const PORT = 3000; // Define the port

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

server.get("/users", (req, res) => {
  res.send("This is the /users endpoint!");
});
