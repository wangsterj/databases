var db = require('../db');
var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT messages.messageText, users.username FROM messages, users WHERE users.ID = messages.users_ID', function(err, values) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, values);
        }
      });
    }, // a function which produces all the messages
    post: function (data, callback) {
      var user_ID;
      var querySearch = `SELECT ID FROM users WHERE username = '${data.username}';`;
      var query = db.query(querySearch, function(err, values) {
        if (err) {
          throw err;
        } else {
          user_ID = values[0].ID;
        }
      })

      query.on('end', () => {
        var queryString = `INSERT INTO messages (messageText, users_ID) VALUES(?, ${user_ID})`;
        db.query(queryString, data.message, function(err, values) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, values);
          }
        });
      });
    }


    //   var queryString = `INSERT INTO messages (messageText, users_ID) VALUES(?, 1)`;
    //   db.query(queryString, data.message, function(err, values, fields) {
    //     if (err) {
    //       callback(err, null, null);
    //     } else {
    //       callback(null, values, fields);
    //     }
    //   });
    // }
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT users.username FROM users', function(err, values) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, values);
        }
      });
    },
    post: function (data, callback) {
      var querySearch = `SELECT ID FROM users WHERE username = '${data.username}';`;
      db.query(querySearch, function(err, values) {
        if (err) {
          throw err;
        } else if (values.length === 0) {
            var queryString = `INSERT INTO users (username) VALUES( '${data.username}')`;
            db.query(queryString, function(err, values) {
              if (err) {
                callback(err, null);
              } else {
                callback(null, values);
              }
            });
        }
      });
    }
  }
};

