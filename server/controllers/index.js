var models = require('../models');
var express = require('express');
var app = express();

module.exports = {
  messages: {
    get: function (req, res) {

      // models.messages.get()
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var message = req.body;
      console.log("Message received: " + message)
      models.messages.post(message, function(){
        res.send('success');
      });
      // console.log(message)
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('controller')
    },
    post: function (req, res) {
      var user = req.body;
      console.log("Controller for users received: " + user)
      models.users.post(user, function(){
        res.send('success');
      });
    }
  }
};
