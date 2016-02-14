/**
 * Created by Peter on 07/02/2016.
 */

var settings = {

};

Ethan.Settings = function(game){};
Ethan.Settings.prototype = {

    preload: function(){
       // this.game.load.spritesheet("tickbox", "assets/tickbox.png", 36, 36);
        var newSettings = localStorage.getItem("settings");
        if(newSettings)
            settings = JSON.parse(newSettings);
    },

    create: function () {

        if(this.game.senpaiMode){
            background = this.game.add.group();
            for(var i = 0; i < 20; i++){
                var arrow = this.game.add.sprite(this.game.rnd.integerInRange(0,1080), this.game.rnd.integerInRange(0,1920), "assets", "background");
                var scale = this.game.rnd.integerInRange(1,100)/100;
                arrow.scale.setTo(scale, scale);
                arrow.speed = this.game.rnd.integerInRange(1,10);
                background.add(arrow);
            }

            head = this.add.sprite(0, 400, "assets", "anime");
            var headTween = this.game.add.tween(head);
            headTween.from({x: -1080}, 1000, Phaser.Easing.Bounce.In, true, 250);

            this.game.stage.backgroundColor = "#551a8b";
        }else{
            background = this.add.sprite(0,0, "assets","space");
        }


        var keys = Object.keys(settings);
        for(var i in keys){
            var setting = keys[i];
            var text =  this.game.add.text(25, 450 + (160 * i) , setting, {
                font: "100px Arial",
                fill: "#ffffff"
            });
            var button = this.game.add.button(950, 450 + (160 * i), "assets",  this.toggleSetting, this, settings[setting] ? 1 : 0, settings[setting] ? 1 : 0);
            button.scale.setTo(3, 3);
            button.setting = setting;
        }

        var backButton = this.game.add.button(230, 1700, "assets", this.menu, this, "back", "back", "back");
        var creditsButton = this.game.add.button(230, 1530, "assets", this.credits, this, "credits", "credits", "credits");
    },

    menu: function(){
       this. game.state.start("Menu");
    },

    credits: function(){
        this.game.state.start("Credits");
    },

    toggleSetting: function(button){
        settings[button.setting] = !settings[button.setting];
        button.setFrames(settings[button.setting] ? 1 : 0);
    }
};