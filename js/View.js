var View = Backbone.View.extend({
    tagName: "span",
    id: "planet-name",

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.html(planet.escape("name"));
    }
});
