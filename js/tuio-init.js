$(document).ready(function () {

  var TuioCanvas = {
    init: function () {
      this.Main.init();
    }
  };

  TuioCanvas.Main = (function () {
    var client = null,
      screenW = null,
      screenH = null,
      time = null,
      canvas = null,
      context = null,
      objSize = 50,

      init = function () {
        screenW = $(window).innerWidth();
        screenH = $(window).innerHeight();

        initClient();
      },

      initClient = function () {
        client = new Tuio.Client({
          host: "http://localhost:5000"
        });
        client.on("connect", onConnect);
        client.on("addTuioObject", onAddTuioObject);
        client.on("removeTuioObject", onRemoveTuioObject);
        client.connect();
      },

      onConnect = function () {
        console.log("onConnect");
        logObject();
      },

      logObject = function () {
        // functions are fun
      },

      onAddTuioObject = function (addObject) {

        console.log("yay added ");

        if (addObject.symbolId == 2) { // Show trail
          $("div.marker").each(function () {
            console.log($(this));
            $(this).hide();
          })
        }
      }

    onRemoveTuioObject = function (removeObject) {
      console.log("yay removed ");

      if (removeObject.symbolId == 2) { // Show trail
        $("div.marker").each(function () {
          console.log($(this));
          $(this).show();
        })
      }
    }

    return {
      init: init
    };
  }());

  $(function () {
    TuioCanvas.init();
  });

  console.log(map);

  $("#hideline").on("click", function(e){
    console.log(map);

    hideLine(map, "trail");
  });
});