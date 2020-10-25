const path = require('path');
const express = require('express');
const cors = require('cors');
const dbConnect = require('./db/dbConnect');

// Define Port
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

// Database connection
dbConnect();

// Setting up port with express js
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// api routes
app.use('/api/user', require('./routes/user.route'));

// if(process.env.NODE_ENV === 'production'){
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '/client/dist/client')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/client/dist/client/index.html'))
  });
// }

// start server
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});