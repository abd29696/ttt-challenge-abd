var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');


let ttt_text = "";
let frequency = {};



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/topn', function(req, res){
    let resultHash = {};
    var getValue = req.body.topnvalue;
    var n = parseInt(getValue);
    var keys = Object.keys(frequency);
    keys.sort(function(a, b) {
      return frequency[b] - frequency[a]
    }).slice(1,n+1).forEach(function(n) {
      resultHash[n] = frequency[n];
    });

    // console.log(resultHash);
    res.send(JSON.stringify(resultHash));

});

request.get('https://terriblytinytales.com/test.txt', function (error, response, body){
  if (!error && response.statusCode == 200) {
    ttt_text = body;
    var wordArray = ttt_text.replace( /\n/g, " " ).replace(".", " ").replace("?", " ").split( " " );  
    wordArray.forEach(function(word){
      if (!frequency[word]) {
        frequency[word] = 0;
      }
      frequency[word] = frequency[word]+1;
    });
  }
});

module.exports = app;






