var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);
    Parse.createUser({username: App.username}, ()=>{console.log("Stored user!")});

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);


    // Poll for new messages every 3 sec
    // setInterval(App.fetch, 3000);
      },

  fetch: function(callback = ()=>{}) {

    Parse.readAll((data) => {
      data = JSON.parse(data)
      // Don't bother to update if we have no messages
      if (!data || !data.length) { return; }
        Messages.update(data, MessagesView.render);
        Rooms.update(data, RoomsView.render);

      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
