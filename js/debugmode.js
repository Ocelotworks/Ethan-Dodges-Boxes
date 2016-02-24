/**
 * Created by Peter on 14/02/2016.
 */
Ethan.Debug = function(game){};
Ethan.Debug.prototype = {
    create: function(){
        var x = 0;
        for(let state in this.game.state.states){
            x++;
            var text = this.game.add.text(0,64 * x, state, {
                font: "34px Arial",
                fill: "#ffffff"
            });

            text.inputEnabled = true;
            text.events.onInputDown.add(function(){
                this.game.state.start(state);
            }, this);

        }


        var addEB = this.game.add.text(0,64 * (x+1), "+1000 EthanBucks ("+this.game.ethanBucks+")", {
            font: "34px Arial",
            fill: "#ffffff"
        });

        addEB.inputEnabled = true;
        addEB.events.onInputDown.add(function(){
            this.game.ethanBucks += 1000;
            this.game.state.start("DebugMode");
        }, this);

        var decEB = this.game.add.text(0,64 * (x+2), "-1000 EthanBucks ("+this.game.ethanBucks+")", {
            font: "34px Arial",
            fill: "#ffffff"
        });

        decEB.inputEnabled = true;
        decEB.events.onInputDown.add(function(){
            this.game.ethanBucks -= 1000;
            this.game.state.start("DebugMode");
        }, this);
    }
};