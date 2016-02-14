/**
 * Created by Peter on 07/02/2016.
 */

var settings = {
    "Debug Mode": false,
    "Background Music": true,
    "Sound Effects": true
};

FappyBird.Settings = function(game){};
FappyBird.Settings.prototype = {

    preload: function(){
        this.game.load.spritesheet("tickbox", "assets/tickbox.png", 36, 36);
        this.game.load.image("creditsImg", "assets/credits.png");
        var newSettings = localStorage.getItem("settings");
        if(newSettings)
            settings = JSON.parse(newSettings);
    },

    create: function () {

        if(this.game.senpaiMode){
            background = this.game.add.group();
            for(var i = 0; i < 20; i++){
                var arrow = this.game.add.sprite(this.game.rnd.integerInRange(0,1080), this.game.rnd.integerInRange(0,1920), "background");
                var scale = this.game.rnd.integerInRange(1,100)/100;
                arrow.scale.setTo(scale, scale);
                arrow.speed = this.game.rnd.integerInRange(1,10);
                background.add(arrow);
            }

            head = this.add.sprite(0, 400, "anime");
            var headTween = this.game.add.tween(head);
            headTween.from({x: -1080}, 1000, Phaser.Easing.Bounce.In, true, 250);

            this.game.stage.backgroundColor = "#551a8b";
        }else{
            background = this.add.sprite(0,0, "space");
            background.anchor.setTo(0.5, 0.5);
            background.angle = 90;
            background.scale.set(2.5, 2);
        }


        var keys = Object.keys(settings);
        for(var i in keys){
            var setting = keys[i];
            var text =  this.game.add.text(25, 450 + (160 * i) , setting, {
                font: "100px Arial",
                fill: "#ffffff"
            });
            var button = this.game.add.button(950, 450 + (160 * i), "tickbox",  this.toggleSetting, this, settings[setting] ? 1 : 0, settings[setting] ? 1 : 0);
            button.scale.setTo(3, 3);
            button.setting = setting;
        }

        var backButton = this.game.add.button(230, 1700, "back", this.menu, this);
        var creditsButton = this.game.add.button(230, 1530, "creditsImg", this.credits, this);
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