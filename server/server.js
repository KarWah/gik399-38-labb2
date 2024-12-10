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



const sqlite3 = require("sqlite3").verbose(); // Import SQLite3
const db = new sqlite3.Database("./gik339-labb2.db"); 


server.get("/users", (req, res) => {
  const query = "SELECT * FROM users"; // SQL query to fetch all rows from the 'users' table

  db.all(query, (err, rows) => {
    if (err) {
      // Handle database error
      console.error(err.message);
      res.status(500).send("Database error");
    } else {
      // Send the rows as JSON response
      res.json(rows);
    }
  });
});
