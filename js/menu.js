/*
 * Copyright �2015 UnacceptableUse
 */
/**
 * Created by Peter on 16/08/2015.
 */

Ethan.Menu = function(game){
};


Ethan.Menu.prototype = {
    create: function(){

        //if(this.game.debugMode) {
        //    this.game.plugins.add(Phaser.Plugin.Debug);
        //}
        if(this.game.senpaiMode){

            Ethan.Menu.background = this.game.add.group();
            for(var i = 0; i < 20; i++){
                var arrow = this.game.add.image(this.game.rnd.integerInRange(0,1080), this.game.rnd.integerInRange(0,1920), "assets", "background");
                var scale = this.game.rnd.integerInRange(1,100)/100;
                arrow.scale.setTo(scale, scale);
                arrow.speed = this.game.rnd.integerInRange(1,10);
                Ethan.Menu.background.add(arrow);
            }

            Ethan.Menu.floatingHead = this.game.add.image(0, 400, "anime");
            var headTween = this.game.add.tween(Ethan.Menu.floatingHead);
            headTween.from({x: -1080}, 1000, Phaser.Easing.Bounce.In, true, 250);

            this.game.stage.backgroundColor = "#551a8b";

        }else{

            Ethan.Menu.background = this.game.add.image(0,0, "assets", "space");
            var fuckPhaserBitmap = this.game.make.bitmapData(250, 275);
            fuckPhaserBitmap.draw(this.game.make.sprite(0,0, "assets", "player"));
            Ethan.Menu.floatingHead = this.game.add.sprite(0, 0, fuckPhaserBitmap);
            Ethan.Menu.floatingHead.anchor.set(0.5, 0.5);
            Ethan.Menu.floatingHead.inputEnabled = true;
            Ethan.Menu.floatingHead.input.enableDrag(true);
            Ethan.Menu.floatingHead.events.onInputDown.add(function(){
                if(window.game)
                    window.game.unlockAchievement("CgkIrP6I1bcCEAIQAw");
            }, this);
        }

        Ethan.Menu.debugModeCounter = 0;
        Ethan.Menu.logo = this.game.add.image(535, 490, "assets", "ethangame");
        Ethan.Menu.logo.anchor.setTo(0.5, 0.5);
        Ethan.Menu.logo.inputEnabled = true;
        Ethan.Menu.logo.events.onInputDown.add(function(){
           Ethan.Menu.debugModeCounter++;
            if(Ethan.Menu.debugModeCounter >= 10){
                this.game.debugMode = !this.game.debugMode;
                this.game.state.start("Menu");
            }
        }, this);

        this.game.ethanBucks = parseInt(localStorage.getItem("ethanbucks")) || 0;
        Ethan.Menu.ethanBucksIcon = this.game.add.image(5, 20, "assets", "ethanbucks");
        Ethan.Menu.ethanBucksIcon.scale.set(0.7, 0.7);
        Ethan.Menu.ethanBucksText = this.game.add.text(200, 15, this.game.ethanBucks, {
            font: "100px Arial",
            fill: this.game.debugMode ? "#000000" : "#ffffff"
        });

        if(this.game.senpaiMode){
            var logoTween = this.game.add.tween(Ethan.Menu.logo);
            logoTween.from({angle: 180}, 500, Phaser.Easing.Linear.None, true);
        }

        if(this.game.debugMode){
            this.game.add.button(240,1350, "assets",function(){
                this.game.state.start("DebugMode");
            }, this, "powerup-invincibility","powerup-invincibility", "powerup-invincibility");
        }

        Ethan.Menu.playButton = this.game.add.button(240, 850, "assets", this.startgame, this, "play", "play");
        Ethan.Menu.storeButton = this.game.add.button(240, 1050, "assets", this.openstore, this, "store", "store");
        Ethan.Menu.settingsButton = this.game.add.button(10, 1810,"assets", this.opensettings, this, "settings", "settings");
        Ethan.Menu.settingsButton.scale.setTo(2, 2);
        if(window.game){
            this.game.add.button(150, 1810, "assets",
            function(){
                window.game.showLeaderboards();
            }, this, "leaderboard", "leaderboard", "leaderboard").scale.setTo(2, 2);
        }
        var snd = localStorage.getItem("sound") === "true" ? "soundOnBlack" : "soundOffBlack";
        Ethan.Menu.muteButton = this.game.add.button(this.game.width - 150, 0, "assets", this.toggleMusic, this, snd, snd, snd);
        Ethan.Menu.muteButton.scale.setTo(4, 4);



        //if(localStorage.getItem("sound") === "true")
        //    menumusic.play();
    },

    startgame: function(){
        //menumusic.stop();
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
           // menumusic.stop();
            localStorage.setItem("sound", false);
            Ethan.Menu.muteButton.setFrame("soundOffBlack");
        }else{
           // menumusic.play();
            localStorage.setItem("sound", true);
            Ethan.Menu.muteButton.setFrame("soundOnBlack");
        }

    },

    update: function(){
        if(this.game.senpaiMode){
            Ethan.Menu.background.forEach(function (arrow){
                arrow.x-=arrow.speed;
                if(arrow.x < -300){
                    arrow.x = 1080;
                }
            });
        }else{
            Ethan.Menu.floatingHead.x++;
            Ethan.Menu.floatingHead.angle+=0.5;
            Ethan.Menu.floatingHead.y++;

            if(Ethan.Menu.floatingHead.x > 1280){
                Ethan.Menu.floatingHead.x = -20;
                Ethan.Menu.floatingHead.y = this.game.rnd.integerInRange(0,1920);
            }
        }

        if(this.game.debugMode){
            Ethan.Menu.ethanBucksText.setText(
                "\nW: "+window.innerWidth+
                "\nH: "+window.innerHeight+
                "\nFPS:"+this.game.time.fps+
                "\nFrame Time:"+this.game.time.elapsed+
                "\nFrame Time Max:"+this.game.time.msMax+
                "\nFrame Time Min:"+this.game.time.msMin);
        }

    }
};
