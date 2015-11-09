var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded());

app.post('/', function(request, response) {

});

app.listen(app.get('port'), function() {
  console.log('slack-chess is running on port', app.get('port'));
});