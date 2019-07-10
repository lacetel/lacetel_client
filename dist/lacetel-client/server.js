var express = require('../../node_modules/express');

var app = express();

app.get("**", function(req, res, next) {

  console.log(req.url);

  var file;

  if ( /\.(js|svg|png|gif)$/.test(req.url) ) {
    file = req.url;
  } else {
    file = 'index.html';
  }

  res.sendFile(file, {
    root: __dirname
  });
});

app.listen(5000, function() {
  console.log('Express running at http://localhost:5000/');
});