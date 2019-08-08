var models = require('../models');
var express = require('express');
var app = express();

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(err, values) {
        var data = JSON.stringify(values);
        if (err) throw err;
        res.send(data);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var message = req.body;
      models.messages.post(message, function() {
        res.send('success');
      });
      // console.log(message)
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('controller');
    },
    post: function (req, res) {
      var user = req.body;
      models.users.post(user, function() {
        res.send('success');
      });
    }
  }
};
