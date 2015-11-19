var planet = new Planets;
var lords = new Lords;


var lordsCollection = new LordsCollection;


function getLord(lordURL, action) {
  if (lordURL !== null) {
    $.ajax({
      url: lordURL,
    }).done(function(data) {

      switch (action) {
        case 'add':
          lordsCollection.add(data);
          break;
        case 'unshift':
          lordsCollection.unshift(data);
          break;
        case 'push':
          lordsCollection.push(data);
          break;
      }

      lordsCollection.trigger('addData');
    });
  } else {

    switch (action) {
      case 'unshift':
        console.log("up block");
        break;
      case 'push':
        console.log("down block");
        break;
    }
  }
}


//--

//-----
function initialize(getLord, startURL) {
  var t = 0;

  getLord(startURL, 'add');

  lordsCollection.on('addData', function() {
    var url = lordsCollection.at(t-1).attributes.apprentice.url;
    if (t < 5) {
      getLord(url, 'add');
      t++;
    }
  });
}


//------
function loadLords(key, action, direction, index) {
  var masterURL = lordsCollection.at(index).get(key).url;

    if (lordsCollection.length < 5) {
      getLord(masterURL, action);

      lordsCollection.once('addData', function() {
        masterURL = lordsCollection.at(index).get(key).url;
        getLord(masterURL, action);
      });

    } else {

      if (direction === 'down') {
        lordsCollection.shift();
      } else if (direction === 'up') {
        lordsCollection.pop();
      }

      getLord(masterURL, action);

      lordsCollection.once('addData', function() {
        masterURL = lordsCollection.at(index).get(key).url;
        if (direction === 'down') {
          lordsCollection.shift();
        } else if (direction === 'up') {
          lordsCollection.pop();
        }
        getLord(masterURL, action);
      });

    }
}
//-------

initialize(getLord, 'http://jedi.smartjs.academy/dark-jedis/3616');

//-----
$(".css-button-up").on('click', function() {
  loadLords('master', 'unshift', 'up', 0);
});

//------
$(".css-button-down").on('click', function() {
  loadLords('apprentice', 'push', 'down', 4);
});



//----
var ws = new WebSocket('ws://jedi.smartjs.academy');

ws.onmessage = function(event) {
  var currentPlanet = JSON.parse(event.data);
  planet.set(currentPlanet);
};

var planetName = new View({model: planet});
$(".css-planet-monitor").append(planetName.el);

//---
var lordsView = new LordsView({collection: lordsCollection});
$(".css-scrollable-list").prepend(lordsView.el);
