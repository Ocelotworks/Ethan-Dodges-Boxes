/* 
 * Copyright ©2014 UnacceptableUse
 */
Ethan.Loading = function(game){
    uiLoadingText = null;
    uiEthan = null;
    uiFedora = null;
    debug = false;
};

var uiEthan, uiFedora, menumusic, bgmusic, pickupFx, smashFx, phrases;
Ethan.Loading.prototype = {
    preload: function(){
        uiLoadingText = this.add.text(this.world.centerX-280, 1543, "LOADING 0%", { font: "48px sans-serif", fill: "#ffffff", align: "center" });
        uiEthan = this.add.image(250, 850, "ethan");
        uiFedora = this.add.sprite(250, -50, "fedora");
        uiEthan.scale.set(5, 5);
        uiFedora.scale.set(5, 5);
        this.load.onFileComplete.add(this.fileComplete, this);
        var ownedPowerups = JSON.parse(localStorage.getItem("powerups")) || {};
        if(ownedPowerups['senpai']){
            this.game.senpaiMode = true;
            this.load.image("anime", "assets/senpai/animethan.png");
            this.load.image("button", "assets/senpai/button.png");
            this.load.image("startgame", "assets/senpai/play.png");
            this.load.image("logo", "assets/senpai/ethangame.png");
            this.load.image("gameover", "assets/senpai/gameover.png");
            this.load.image("back", "assets/senpai/back.png");
            this.load.image("player", "assets/senpai/player.png");
            this.load.image("background", "assets/senpai/background.png");
            this.load.image("store", "assets/senpai/store.png");
            this.load.image("soundoff", "assets/senpai/soundOffBlack.png");
            this.load.image("soundon", "assets/senpai/soundOnBlack.png");
            this.load.audio("menumusic", "assets/senpai/Busy Day At The Market-LOOP.ogg");
            this.load.audio("bgmusic", "assets/senpai/Houkago Stride[JubyPhonic].ogg");
            this.load.audio("ethan1", "assets/senpai/ethan1.ogg");
            this.load.audio("ethan2", "assets/senpai/ethan2.ogg");
            this.load.audio("ethan3", "assets/senpai/ethan3.ogg");
            this.load.audio("ethan4", "assets/senpai/ethan4.ogg");
            this.load.image("goals", "assets/senpai/goals.png");
            this.load.image("storefront", "assets/senpai/storefront.png");
            this.load.spritesheet("powerups", "assets/senpai/powerups.png", 180, 180);
            this.load.image("settings", "assets/senpai/settings.png");


        }else{
            this.game.senpaiMode = false;
            this.load.image("button", "assets/button.png");
            this.load.image("startgame", "assets/play.png");
            this.load.image("logo", "assets/ethangame.png");
            this.load.image("back", "assets/back.png");
            this.load.image("gameover", "assets/gameover.png");
            this.load.image("player", "assets/player.png");
            this.load.image("store", "assets/store.png");
            this.load.image("soundoff", "assets/soundOffBlack.png");
            this.load.image("soundon", "assets/soundOnBlack.png");
            this.load.audio("menumusic", "assets/Call.ogg");
            this.load.image("goals", "assets/goals.png");
            this.load.image("storefront", "assets/storefront.png");
            this.load.spritesheet("powerups", "assets/powerups.png", 180, 180);
            this.load.image("settings", "assets/settings.png");
            this.load.audio("bgmusic", "assets/Precipice.ogg");
        }
        this.load.image("leaderboard", "assets/leaderboard.png");
        this.load.image("yes", "assets/dialogyes.png");
        this.load.image("no", "assets/dialogno.png");
        this.load.image("messagebox", "assets/messagebox.png");

        this.load.image("storeheader", "assets/storeheader.png");
        this.load.image("box", "assets/box.png");
        this.load.image("space", "assets/space.jpg");
        this.load.image("ethanbucks", "assets/ethanbucks.png");
        this.load.image("ebpickup", "assets/ethanbucks-pickup.png");
        this.load.audio("smash", "assets/stop.ogg");
        this.load.audio("pickup", "assets/Coin01.ogg");


        //FIXME: Should destroy these, if used for anything other than changing states
        this.game.messageBox = function(text, yesCallback, noCallback, context){
            if(!context)return;
            var msgBoxGroup = context.game.add.group();
            msgBoxGroup.add(context.game.add.image(0, 440, "messagebox"));
            msgBoxGroup.add(context.game.add.text(50, 715, text, {
                font: "60px Arial",
                fill: "#0f0f0f",
                align: "center",
                wordWrap: true,
                wordWrapWidth: 1000
            }));
            if(yesCallback)
                msgBoxGroup.add(context.game.add.button(50, 1150, "yes", yesCallback, context));
            if(noCallback)
                msgBoxGroup.add(context.game.add.button(600, 1150, "no", noCallback, context));
            //context.add.tween(msgBoxGroup.scale).from({x: 0, y: 0}, 400, Phaser.Easing.Bounce.In, true);
        };
    },

    create: function(){
        uiLoadingText.setText("Loading music...");
        uiFedora.y +=10;
        menumusic = this.add.audio('menumusic');
        bgmusic = this.add.audio('bgmusic');
        pickupFx = this.add.audio("pickup");
        smashFx = this.add.audio("smash");
        if(this.game.senpaiMode){
            phrases = [
                this.add.audio("ethan1"),
                this.add.audio("ethan2"),
                this.add.audio("ethan3"),
                this.add.audio("ethan4")
            ];
        }

        if(!this.input.keyboard.addKey(Phaser.Keyboard.A).isDown) {
            this.game.sound.setDecodedCallback(bgmusic, this.start, this);
        }else{
            this.start();
        }
    },

    start: function(){
        if(this.input.keyboard.addKey(Phaser.Keyboard.D).isDown){
            this.game.debugMode = true;
        }
        this.game.state.start("Menu");

    },

    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles){
        if(success){
            uiLoadingText.setText("LOADING "+cacheKey+" "+progress+"% ("+totalLoaded+"/"+totalFiles+")");
            uiFedora.y = progress*8;
            console.log("Successfully loaded "+cacheKey);
        }else{
            uiLoadingText.setText("ERROR LOADING FILE #"+totalLoaded+": "+cacheKey);
        }
    }
};

