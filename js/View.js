var View = Backbone.View.extend({
    tagName: "span",
    id: "planet-name",

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.html(this.model.escape("name"));
    }
});

var LordsView = Backbone.View.extend({
  tagName: "ul",
  className: "css-slots",
  initialize: function() {
      this.listenTo(this.collection, 'addData', this.render);

  },
  render: function() {
      this.$el.html("");
      this.collection.each(function(lord) {        
        this.$el.append('<li class="css-slot"><h3>'+lord.get("name")+'</h3></li>');
      }, this);
  }
});
