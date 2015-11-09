var chessRules = require('chess-rules');
var request = require('request');

var position = null;

function sendText(text) {
  request.post(
    process.env.HOOK_URL,
    {
      payload: {
        username: 'chessbot',
        text: text
      }
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    }
  );
};

module.exports.sendText = sendText;

module.exports.new = function () {
  position = chessRules.getInitialPosition();
  print();
};

function print() {
  sendText(chessRules.positionToString(position, true));
};

module.exports.print = print;

module.exports.move = function (movement) {
  var move = chessRules.pgnToMove(position, movement);
  position = chessRules.applyMove(position, move);

  var status = chessRules.getGameStatus(position);
  if(status == 'OPEN') {
    print();
  } else {
    sendText(status);
  }
};