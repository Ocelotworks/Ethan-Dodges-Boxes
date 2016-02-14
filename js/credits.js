/**
 * Created by Peter on 07/02/2016.
 */
Ethan.Credits = function(game){};
Ethan.Credits.prototype = {

    preload: function(){
        this.load.json("credits", "assets/credits.json");
    },

    create: function(){
      this.game.stage.backgroundColor = "#000000";
        var creditIndex = 0;
        var credits = this.game.cache.getJSON('credits');
        var creditText = this.game.add.text(0, 0, "A GAME BY\nOcelotworks", {
                            font: "40px Arial",
                            fill: "#ffffff",
                            align: "center",
                            boundsAlignH: "center",
                            boundsAlignV: "middle"
                        });
        creditText.setTextBounds(0, 0, 1080, 1920);
        var timeout = setInterval(function(){
            creditText.setText(credits[creditIndex].join("\n"));
            creditIndex++;
            if(creditIndex > credits.length){
                timeout = null;
            }
        }, 1500);

      this.game.input.onDown.add(function(){
          this.game.state.start("Settings");
      }, this);
    }
};