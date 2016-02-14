/*
 * Copyright ©2015 UnacceptableUse
 */
/**
 * Created by Peter on 16/08/2015.
 */

Ethan.Menu = function(game){
}


Ethan.Menu.prototype = {
    create: function(){

        if(this.game.senpaiMode){

            background = this.game.add.group();
            for(var i = 0; i < 20; i++){
                var arrow = this.game.add.image(this.game.rnd.integerInRange(0,1080), this.game.rnd.integerInRange(0,1920), "background");
                var scale = this.game.rnd.integerInRange(1,100)/100;
                arrow.scale.setTo(scale, scale);
                arrow.speed = this.game.rnd.integerInRange(1,10);
                background.add(arrow);
            }

            head = this.game.add.image(0, 400, "anime");
            var headTween = this.game.add.tween(head);
            headTween.from({x: -1080}, 1000, Phaser.Easing.Bounce.In, true, 250);

            this.game.stage.backgroundColor = "#551a8b";

        }else{

            background = this.game.add.image(0,0, "space");
            background.anchor.setTo(0.5, 0.5);
            background.angle = 90;
            background.scale.set(2.5, 2);

            head = this.game.add.sprite(0, 0, "player");
            head.scale.set(0.2, 0.2);
            head.anchor.set(0.5, 0.5);
            head.inputEnabled = true;
            head.input.enableDrag(true);
            head.events.onInputDown.add(function(){
                if(window.game)
                    window.game.unlockAchievement("CgkIrP6I1bcCEAIQAw");
            }, this);
        }


        this.game.ethanBucks = parseInt(localStorage.getItem("ethanbucks")) || 0;
        if(this.game.ethanBucks > 0) {
            crate = this.game.add.sprite(5, 20, "ethanbucks");
            crate.scale.set(0.7, 0.7);
            crateText = this.game.add.text(200, 15, this.game.ethanBucks, {
                font: "100px Arial",
                fill: "#ffffff",
                align: "center"
            });
        }

        logo = this.game.add.image(535, 490, "logo");
        logo.anchor.setTo(0.5, 0.5);

        if(this.game.senpaiMode){
            var logoTween = this.game.add.tween(logo);
            logoTween.from({angle: 180}, 500, Phaser.Easing.Linear.None, true);
        }

        button = this.game.add.button(240, 850, 'startgame', this.startgame, this, 1, 1, 1);
        storeButton = this.game.add.button(240, 1050, 'store', this.openstore, this, 1, 1, 1);
        settingsButton = this.game.add.button(10, 1810, "settings", this.opensettings, this, 1, 1, 1);
        settingsButton.scale.setTo(2, 2);
        if(window.game){
            this.game.add.button(150, 1810, "leaderboard",
            function(){
                window.game.showLeaderboards();
            }, this, 1, 1, 1).scale.setTo(2, 2);
        }

        mutebutton = this.game.add.button(this.game.width - 150, 0, localStorage.getItem("sound") === "true" ? "soundon" : "soundoff", this.toggleMusic, this);
        mutebutton.scale.setTo(4, 4);

        if(localStorage.getItem("sound") === "true")
            menumusic.play();
    },

    startgame: function(){
        menumusic.stop();
        this.game.state.start("Game");
    },

    openstore: function(){
        this.game.state.start("Store");
    },

    opensettings: function(){
        this.game.state.start("Settings");
    },

    toggleMusic: function(){
        if(localStorage.getItem("sound") === "true"){
            menumusic.stop();
            localStorage.setItem("sound", false);
            mutebutton.loadTexture("soundoff");
        }else{
            menumusic.play();
            localStorage.setItem("sound", true);
            mutebutton.loadTexture("soundon");
        }

    },

    update: function(){
        if(this.game.senpaiMode){
            background.forEach(function (arrow){
                arrow.x-=arrow.speed;
                if(arrow.x < -300){
                    arrow.x = 1080;
                }
            });
        }else{
            head.x++;
            head.angle-=0.5;
            head.y++;

            if(head.x > 1280){
                head.x = -20;
                head.y = this.game.rnd.integerInRange(0,1920);
            }
        }

    },

    render: function(){
        if(this.game.debugMode){
            this.game.debug.soundInfo(menumusic, 32, 32);
        }
    }
}
