var Planets = Backbone.Model.extend({
  initialize: function(){
        console.log('Planets has been intialized');
    }
});

var Lords = Backbone.Model.extend({
  initialize: function(){
        console.log('Lords has been intialized');
        // this.on('change', function() {
        //   console.log('dddd');
        // });
    }
});

var LordsCollection = Backbone.Collection.extend({
  model: Lords,
  initialize: function(){
        console.log('LordsCollection has been intialized');

    }  
});
