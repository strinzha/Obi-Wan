var planet = new Planets;

var ws = new WebSocket('ws://jedi.smartjs.academy');

ws.onmessage = function(event) {
  var currentPlanet = JSON.parse(event.data);

  planet.set({
    "id": currentPlanet.id,
    "name": currentPlanet.name
  });
};

var planetName = new View({model: planet});
$(".css-planet-monitor").append(planetName.el);
