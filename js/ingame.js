/*
 * Copyright ©2015 UnacceptableUse
 */
/**
 * Created by Peter on 25/06/2015.
 */

Ethan.Game = function(game){
    Ethan.Game.ownedPowerups = null;
    Ethan.Game.ethanPosition = null;
    Ethan.Game.ethanPositions = [150,450,720];
    Ethan.Game.boxSpeed = null;
    Ethan.Game.ticks = null;
    Ethan.Game.boxMaxFreq = null;
    Ethan.Game.boxMinFreq = null;
    Ethan.Game.boxPositions = [970, 1315, 1500];
    Ethan.Game.background = null;
    Ethan.Game.goals = null;
    Ethan.Game.boxes = null;
    Ethan.Game.left = null;
    Ethan.Game.right = null;
    Ethan.Game.pointsBox = null;
    Ethan.Game.pointsText = null;
    Ethan.Game.debugText = null;
    Ethan.Game.powerupTimer = null;
    Ethan.Game.powerupModifiers = [];
    Ethan.Game.currentPowerup = null;
    Ethan.Game.tempBoxSpeed = null;
    Ethan.Game.ethanBucksText = null;
    Ethan.Game.ethanBucksIcon = null;
};



Ethan.Game.prototype = {

    addBox: function(){
        var position = this.game.rnd.integerInRange(0,2);
        var b = this.add.image(Ethan.Game.boxPositions[position], 770,"assets", Ethan.Game.ownedPowerups['oppositeday'] ? "player" : "box" );
        b.powerup = null;
        b.b_position = position;
        Ethan.Game.boxes.add(b);
        position = null;
    },

    addEthanBuck: function(){
        var powerup;
        var position = this.game.rnd.integerInRange(0,2);
        var b;
        if(Ethan.Game.powerupModifiers.length !== 0 && !Ethan.Game.currentPowerup && this.game.rnd.integerInRange(1, 7) === 1){
            powerup = Ethan.Game.powerupModifiers[this.game.rnd.integerInRange(0, Ethan.Game.powerupModifiers.length-1)];
            b = this.add.image(Ethan.Game.boxPositions[position], 770, "assets", powerup.id);
            b.powerup = powerup;
            powerup = null;

        }else{
            b = this.add.image(Ethan.Game.boxPositions[position]-100, 770, "assets", "ethanbucks-pickup");
            b.powerup = "ethanbuck";
        }

        b.b_position = position;
        Ethan.Game.boxes.add(b);
        position = null;
    },

    moveLeft: function(){
        if(Ethan.Game.ethanPosition > 0){
            Ethan.Game.ethanPosition--;
            player.position.x = Ethan.Game.ethanPositions[Ethan.Game.ethanPosition];
        }

    },

    moveRight: function(){
        if(Ethan.Game.ethanPosition < 2){
            Ethan.Game.ethanPosition++;
            player.position.x = Ethan.Game.ethanPositions[Ethan.Game.ethanPosition];
        }

    },

    checkInput: function(data){
        //I don't know why I have to do this, but it won't let me call this.moveLeft() or this.moveRight()
        //console.log(data.x+","+this.game.width/2);
        if(data.x < this.game.width/2){
            if(Ethan.Game.ethanPosition > 0){
                Ethan.Game.ethanPosition--;
                player.position.x = Ethan.Game.ethanPositions[Ethan.Game.ethanPosition];
            }
        }else{
            if(Ethan.Game.ethanPosition < 2){
                Ethan.Game.ethanPosition++;
                player.position.x = Ethan.Game.ethanPositions[Ethan.Game.ethanPosition];
            }
        }
    },

    create: function() {

        this.game.points = 0;
        Ethan.Game.ethanPosition = 1;
        Ethan.Game.boxSpeed = 10;
        Ethan.Game.ticks = 0;
        Ethan.Game.boxMaxFreq = 50;
        Ethan.Game.boxMinFreq = 20;
        Ethan.Game.poweupTimer = 0;
        Ethan.Game.paused = false;
        if (this.game.senpaiMode) {
            Ethan.Game.background = this.game.add.group();
            for (var i = 0; i < 20; i++) {
                var arrow = this.game.add.image(this.game.rnd.integerInRange(0, 1080), this.game.rnd.integerInRange(0, 1920), "assets", "background");
                var scale = this.game.rnd.integerInRange(1, 100) / 100;
                arrow.scale.setTo(scale, scale);
                arrow.speed = this.game.rnd.integerInRange(1, 10);
                Ethan.Game.background.add(arrow);
            }
        } else {
            Ethan.Game.background = this.add.image(0, 0, "assets", "space");
        }
        Ethan.Game.ownedPowerups = JSON.parse(localStorage.getItem("powerups")) || {};
        for(var powerup in powerups){
            if(Ethan.Game.ownedPowerups[powerups[powerup].bool] === true && powerups[powerup].type === "powerup"){
                Ethan.Game.powerupModifiers.push(powerups[powerup]);
            }
        }
        Ethan.Game.soundEnabled = localStorage.getItem("sound") === "true";
        Ethan.Game.goals = this.add.image(60,320,"assets", "goals");

        Ethan.Game.boxes = this.add.group();

        Ethan.Game.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        Ethan.Game.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.game.input.onDown.add(this.checkInput, this);

        Ethan.Game.left.onDown.add(this.moveLeft, this);
        Ethan.Game.right.onDown.add(this.moveRight, this);

        Ethan.Game.boxes.scale.set(0.4, 0.4);

        player = this.add.image(Ethan.Game.ethanPositions[Ethan.Game.ethanPosition], 1500, "assets", Ethan.Game.ownedPowerups['oppositeday'] ? "box" : "player");



        Ethan.Game.pointsBox = this.add.image(0, 0, "assets", Ethan.Game.ownedPowerups['oppositeday'] ? "player" : "box");
        Ethan.Game.pointsBox.scale.set(0.5, 0.5);


        Ethan.Game.pointsText = this.game.add.text(128, 10, "0", {
            font: "165px Arial",
            fill: "#ff0044",
            align: "center"
        });

        Ethan.Game.ethanBucksIcon = this.add.image(0, 232, "assets", "ethanbucks");
        Ethan.Game.ethanBucksIcon.scale.set(0.5, 0.5);

        Ethan.Game.ethanBucksText = this.game.add.text(128, 202, this.game.ethanBucks, {
            font: "165px Arial",
            fill: "#00ff44",
            align: "center"
        });


        if(this.game.debugMode){
            Ethan.Game.debugText = this.game.add.text(0, 0, "boxSpeed: 0\nFPS: 0", {
                font: "50px Arial",
                fill: "#ffffff",
                align: "center"
            });
        }
        if(Ethan.Game.soundEnabled){
            bgmusic.play();
        }
    },

    update: function() {
        if(Ethan.Game.paused)return;
        Ethan.Game.ticks++;

        if(Ethan.Game.ticks > this.game.rnd.integerInRange(Ethan.Game.boxMinFreq, Ethan.Game.boxMaxFreq)){
            if((Ethan.Game.currentPowerup && Ethan.Game.currentPowerup.name === "money") || this.game.rnd.integerInRange(1, 8) === 1){
                this.addEthanBuck();
            }else{
                this.addBox();
            }
            Ethan.Game.ticks = 0;
        }
        Ethan.Game.boxes.forEach(function (box){
            if(box.alive ) {
                box.y += (Ethan.Game.boxSpeed * 2)+box.y/(100-Ethan.Game.boxSpeed);
                box.x -= Ethan.Game.boxSpeed * (box.b_position == 1 ? 0.1 : box.b_position == 2 ? -0.3 : 0.4)*box.y/1000;

                box.scale.x += Ethan.Game.boxSpeed * 0.001;
                box.scale.y += Ethan.Game.boxSpeed * 0.001;


                if (box.y > 3600) {
                    if(box.b_position == Ethan.Game.ethanPosition){
                        if(box.powerup){
                            if(typeof box.powerup.id != 'undefined') {
                                Ethan.Game.currentPowerup = this.game.add.sprite(900, 0, "powerups", box.powerup.id);
                                Ethan.Game.currentPowerup.name = box.powerup.bool;
                                switch(box.powerup.bool){
                                    case "slowdown":
                                        Ethan.Game.powerupTimer = 700;
                                        Ethan.Game.tempBoxSpeed = Ethan.Game.boxSpeed;
                                        Ethan.Game.boxSpeed = 5;
                                        break;
                                    case "money":
                                        Ethan.Game.powerupTimer = 500;
                                        break;
                                    case "invincibility":
                                        Ethan.Game.powerupTimer = 700;
                                        break;
                                    case "nuke":
                                        Ethan.Game.boxes.callAll("destroy");
                                        Ethan.Game.boxes.removeAll();
                                        break;
                                    default:
                                        console.warn("Unknown powerup %s ", box.powerup.bool);
                                        break;
                                }
                            }else if(box.powerup === "ethanbuck"){
                                this.game.ethanBucks++;
                                Ethan.Game.ethanBucksText.setText(this.game.ethanBucks);
                                if(Ethan.Game.soundEnabled)
                                    pickupFx.play();
                            }
                            box.kill();
                        }else{
                            if(!Ethan.Game.currentPowerup || Ethan.Game.currentPowerup.name !== "invincibility"){
                                localStorage.setItem("ethanbucks", this.game.ethanBucks);
                                this.game.state.start("GameOver");
                            }else{
                                box.kill();
                            }
                        }

                    }else{
                        if(this.game.senpaiMode && Ethan.Game.soundEnabled && this.game.points % 20 === 0){
                            this.randEthan();
                        }
                        this.game.points++;
                        Ethan.Game.boxSpeed+=0.03;
                        Ethan.Game.boxMinFreq-=0.03;
                        Ethan.Game.boxMaxFreq-=0.02;
                        Ethan.Game.pointsText.setText(this.game.points);
                        Ethan.Game.boxes.remove(box);
                        box.destroy();
                        if(Ethan.Game.soundEnabled)
                            smashFx.play();
                    }
                }
            }
        }, this);
    },

    randEthan: function(){
        var ethanHead = this.game.add.sprite(-500, 900, "anime");
        ethanHead.anchor.setTo(0.5, 0.5);
        ethanHead.rotation = -150;
        var ethanTween = this.game.add.tween(ethanHead);
        ethanTween.to({x: 10}, 500, Phaser.Easing.Linear.None, true);
        var ethanTween2 = this.game.add.tween(ethanHead);
        ethanTween2.to({x: -500}, 500, Phaser.Easing.Linear.None, true, 3000);
        phrases[this.game.rnd.integerInRange(0, 3)].play();
        ethanTween2.onComplete.add(function(){
            ethanHead.destroy();
            ethanHead = null;
            ethanTween = null;
            ethanTween2 = null;
        });

    },

    render: function() {
        if(this.game.debugMode){
           Ethan.Game.debugText.setText(
               "boxSpeed: "+Ethan.Game.boxSpeed+
               "\nboxMinFreq:"+Ethan.Game.boxMinFreq+
               "\nboxMaxFreq:"+Ethan.Game.boxMaxFreq+
               "\nticks:"+Ethan.Game.ticks+
               "\ncurrentPowerup:"+(Ethan.Game.currentPowerup ? Ethan.Game.currentPowerup.name : "none")+
               "\npowerupTimer:"+Ethan.Game.powerupTimer+
               "\nPowerups available:"+Ethan.Game.powerupModifiers.length+
               "\nFPS:"+this.game.time.fps
           );
        }
        if(this.game.senpaiMode){
            Ethan.Game.background.forEach(function(arrow){
                arrow.x -= arrow.speed;
                if(arrow.x < -300){
                    arrow.x = 1080;
                }
            });
        }
        if(Ethan.Game.powerupTimer > 0){
            Ethan.Game.powerupTimer--;
            if(Ethan.Game.powerupTimer < 500 && Ethan.Game.powerupTimer % 100 === 0){
                Ethan.Game.currentPowerup.visible = !Ethan.Game.currentPowerup.visible;
            }
        }else if(Ethan.Game.currentPowerup){
            switch(Ethan.Game.currentPowerup.name){
                case "slowdown":
                    Ethan.Game.boxSpeed = Ethan.Game.tempBoxSpeed;
                    break;
                default:
                    break;
            }
            Ethan.Game.currentPowerup.destroy();
            Ethan.Game.currentPowerup = null;

        }
    }
};