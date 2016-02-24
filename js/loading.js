/* 
 * Copyright ©2014 UnacceptableUse
 */
Ethan.Loading = function(game){
    Ethan.Loading.uiLoadingText = null;
    Ethan.Loading.uiEthan = null;
    Ethan.Loading.uiFedora = null;
    Ethan.Loading.debug = false;
};

var menumusic, bgmusic, pickupFx, smashFx, phrases, LOADING_PHRASES = [
    "Polishing Ethan",
    "Building Boxes",
    "Reticulating Splines",
    "Aligning Goals",
    "Powering up Powerups",
    "Fixing Bugs",
    "Constructing Additional Pylons",
    "Lowering Fedoras",
    "Balancing Prices",
    "Creating New Bugs",
    "Submitting to Reddit",
    "Alan please add loading text",
    "Validating Insecurities",
    "Concatinating Conkers",
    "Initializing Memes",
    "Finding True Love",
    "Taming Ocelots",
    "Looking for closure"
];
Ethan.Loading.prototype = {
    preload: function(){
        Ethan.Loading.uiLoadingText = this.add.text(this.world.centerX-280, 1543, "LOADING 0%", { font: "48px sans-serif", fill: "#ffffff", align: "center" });
        Ethan.Loading.uiEthan = this.add.image(250, 1045, "ethan");
        Ethan.Loading.uiFedora = this.add.sprite(245, -50, "fedora");
        Ethan.Loading.uiEthan.scale.set(5, 5);
        Ethan.Loading.uiFedora.scale.set(5, 5);
        this.load.onFileComplete.add(this.fileComplete, this);
        var ownedPowerups = JSON.parse(localStorage.getItem("powerups")) || {};
        if(ownedPowerups['senpai']){
            this.game.senpaiMode = true;
            //this.load.audio("menumusic", "assets/senpai/Busy Day At The Market-LOOP.ogg");
            //this.load.audio("bgmusic", "assets/senpai/Houkago Stride[JubyPhonic].ogg");
            this.load.audio("ethan1", "assets/senpai/ethan1.ogg");
            this.load.audio("ethan2", "assets/senpai/ethan2.ogg");
            this.load.audio("ethan3", "assets/senpai/ethan3.ogg");
            this.load.audio("ethan4", "assets/senpai/ethan4.ogg");
            this.game.load.atlasXML('assets',  'assets/assets-senpai.png', 'assets/assets-senpai.xml');
        }else{
            this.game.senpaiMode = false;
            //this.load.audio("bgmusic", "assets/Precipice.ogg");
            //this.load.audio("menumusic", "assets/Call.ogg");
            this.game.load.atlasXML('assets',  'assets/assets.png', 'assets/assets.xml');

        }

        this.load.audio("smash", "assets/stop.ogg");
        this.load.audio("pickup", "assets/Coin01.ogg");


        //FIXME: Should destroy these, if used for anything other than changing states
        this.game.messageBox = function(text, yesCallback, noCallback, context){
            if(!context)return;
            var msgBoxGroup = context.game.add.group();
            msgBoxGroup.add(context.game.add.image(0, 440, "assets", "messagebox"));
            msgBoxGroup.add(context.game.add.text(50, 715, text, {
                font: "60px Arial",
                fill: "#0f0f0f",
                align: "center",
                wordWrap: true,
                wordWrapWidth: 1000
            }));
            if(yesCallback)
                msgBoxGroup.add(context.game.add.button(50, 1150, "assets", yesCallback, context, "dialogyes","dialogyes", "dialogyes"));
            if(noCallback)
                msgBoxGroup.add(context.game.add.button(600, 1150, "assets", noCallback, context, "dialogno", "dialogno", "dialogno"));
            //context.add.tween(msgBoxGroup.scale).from({x: 0, y: 0}, 400, Phaser.Easing.Bounce.In, true);
        };
    },

    create: function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        Ethan.Loading.uiLoadingText.setText("Loading music...");
        Ethan.Loading.uiFedora.y +=10;
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
        if (this.input.keyboard.addKey(Phaser.Keyboard.A).isDown) {
            this.start();
        } else {
            //if(this.game.senpaiMode) {
            //    this.game.sound.setDecodedCallback(phrases.concat([bgmusic, menumusic, pickupFx, smashFx]), this.start, this);
            //} else{
                this.game.sound.setDecodedCallback([pickupFx, smashFx], this.start, this);
            //}

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
            Ethan.Loading.uiLoadingText.setText(LOADING_PHRASES[this.game.rnd.integerInRange(0, LOADING_PHRASES.length)]+"... "+progress+"%");
            Ethan.Loading.uiFedora.y = progress*8;
            console.log("Successfully loaded "+cacheKey);
        }else{
            Ethan.Loading.uiLoadingText.setText("ERROR LOADING FILE #"+totalLoaded+": "+cacheKey);
        }
    }
};

