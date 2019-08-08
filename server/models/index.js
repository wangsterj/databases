var db = require('../db');
var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT messages.message, users.username, rooms.roomname FROM messages INNER JOIN users, rooms ON messages.user_ID = users.ID AND messages.room_ID = room.ID', function(err, values, fields) {
        if (err) {
          callback(err, null, null);
        } else {
          callback(null, values, fields);
        }
      });
    }, // a function which produces all the messages
    post: function (data, callback) {
      var queryString = `INSERT INTO messages (messageText, users_ID) VALUES(?, 1)`;
      console.log(queryString);
      db.query(queryString, data.message, function(err, values, fields) {
        if (err) {
          callback(err, null, null);
        } else {
          callback(null, values, fields);
        }
      });
    }
    // post: function (message, callback) {
    //   var queryMessage = `INSERT INTO messages (message) VALUES('${connection.escape(message.message)}')`
    //   // "INSERT INTO messages (message) VALUES ('"+message.message+"')";
    //   // INSERT INTO users (username) VALUES ('"+message.username+"') INSERT INTO rooms (roomname) VALUES ('"+message.roomname+"');";
    //   console.log(queryMessage)
    //   db.query(queryMessage, function(err, values, fields){
    //     if (err){
    //       callback(err,null, null);
    //     } else {
    //       callback(null, values, fields);
    //     }
    //     // callback();
    //   });
    // } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT users.username FROM users', function(err, values, fields) {
        if (err) {
          callback(err, null, null);
        } else {
          callback(null, values, fields);
        }
      });
    },
    post: function (data, callback) {
      var queryString = `INSERT INTO users (username) VALUES( '${data.username}')`;
      console.log(queryString);
      db.query(queryString, function(err, values, fields) {
        if (err) {
          callback(err, null, null);
        } else {
          callback(null, values, fields);
        }
      });
    }
  }
};

