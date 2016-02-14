/*
 * Copyright ©2015 UnacceptableUse
 */
/**
 * Created by Peter on 25/06/2015.
 */

var ownedPowerups, ethanPosition, boxSpeed, ticks, boxMaxFreq, boxMinFreq, boxPositions = [970, 1215, 1480],
    ethanPositions = [150,450,720], background, goals, boxes, left, right, pointsbox, pointstext, ebtext, ebbox, debugText,
    soundEnabled = true, powerupTimer, powerupModifier = [], currentPowerup, tempBoxSpeed;

Ethan.Game = function(game){
    ownedPowerups = null;
    ethanPosition = null;
    boxSpeed = null;
    ticks = null;
    boxMaxFreq = null;
    boxMinFreq = null;
    background = null;
    goals = null;
    boxes = null;
    left = null;
    right = null;
    pointsbox = null;
    pointstext = null;
    debugText = null;
    powerupTimer = null;
    powerupModifier = [];
    currentPowerup = null;
    tempBoxSpeed = null;
    ebtext = null;
    ebbox = null;
};



Ethan.Game.prototype = {

    addBox: function(){
        var position = this.game.rnd.integerInRange(0,2);
        var b = this.add.image(boxPositions[position], 770, ownedPowerups['oppositeday'] ? "player" : "box" );
        if(ownedPowerups['oppositeday'] ){
            b.scale.setTo(0.3, 0.3);
        }
        b.powerup = null;
        b.b_position = position;
        boxes.add(b);
        position = null;
    },

    addEthanBuck: function(){
        var position = this.game.rnd.integerInRange(0,2);
        var b;
        if(powerupModifier.length !== 0 && !currentPowerup && this.game.rnd.integerInRange(1, 7) === 1){
            var powerup = powerupModifier[this.game.rnd.integerInRange(0, powerupModifier.length-1)];
            b = this.add.image(boxPositions[position], 770, "powerups", powerup.id);
            b.powerup = powerup;
            powerup = null;

        }else{
            b = this.add.image(boxPositions[position]-100, 770, "ebpickup");
            b.powerup = "ethanbuck";
        }

        b.b_position = position;
        boxes.add(b);
        position = null;
    },

    moveLeft: function(){
        if(ethanPosition > 0){
            ethanPosition--;
            player.position.x = ethanPositions[ethanPosition];
        }

    },

    moveRight: function(){
        if(ethanPosition < 2){
            ethanPosition++;
            player.position.x = ethanPositions[ethanPosition];
        }

    },

    checkInput: function(data){
        //I don't know why I have to do this, but it won't let me call this.moveLeft() or this.moveRight()
        //console.log(data.x+","+this.game.width/2);
        if(data.x < this.game.width/2){
            if(ethanPosition > 0){
                ethanPosition--;
                player.position.x = ethanPositions[ethanPosition];
            }
        }else{
            if(ethanPosition < 2){
                ethanPosition++;
                player.position.x = ethanPositions[ethanPosition];
            }
        }
    },

    create: function() {

        this.game.points = 0;
        ethanPosition = 1;
        boxSpeed = 10;
        ticks = 0;
        boxMaxFreq = 50;
        boxMinFreq = 20;
        poweupTimer = 0;
        if (this.game.senpaiMode) {
            background = this.game.add.group();
            for (var i = 0; i < 20; i++) {
                var arrow = this.game.add.image(this.game.rnd.integerInRange(0, 1080), this.game.rnd.integerInRange(0, 1920), "background");
                var scale = this.game.rnd.integerInRange(1, 100) / 100;
                arrow.scale.setTo(scale, scale);
                arrow.speed = this.game.rnd.integerInRange(1, 10);
                background.add(arrow);
            }
        } else {
            background = this.add.image(0, 0, "space");
            background.anchor.setTo(0.5, 0.5);
            background.angle = 90;
            background.scale.setTo(2.5, 2);
        }
        ownedPowerups = JSON.parse(localStorage.getItem("powerups")) || {};
        for(var powerup in powerups){
            if(ownedPowerups[powerups[powerup].bool] === true && powerups[powerup].type === "powerup"){
                powerupModifier.push(powerups[powerup]);
            }
        }
        soundEnabled = localStorage.getItem("sound") === "true";
        goals = this.add.image(0,0,"goals");

        boxes = this.add.group();

        left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.game.input.onDown.add(this.checkInput, this);

        left.onDown.add(this.moveLeft, this);
        right.onDown.add(this.moveRight, this);

        boxes.scale.set(0.4, 0.4);

        player = this.add.image(ethanPositions[ethanPosition], 1500, ownedPowerups['oppositeday'] ? "box" : "player");
        if(ownedPowerups['oppositeday'])
            player.scale.set(1,1);
        else
            player.scale.set(0.2,0.2);
        player.gravity = 0;


        if(ownedPowerups['oppositeday']){
            pointsbox = this.add.image(0, 0, "player");
            pointsbox.scale.set(0.1, 0.1);
        }else{
            pointsbox = this.add.image(0, 0, "box");
            pointsbox.scale.set(0.5, 0.5);
        }

        pointstext = this.game.add.text(128, 10, "0", {
            font: "165px Arial",
            fill: "#ff0044",
            align: "center"
        });

        ebbox = this.add.image(0, 232, "ethanbucks");
        ebbox.scale.set(0.5, 0.5);

        ebtext = this.game.add.text(128, 202, this.game.ethanBucks, {
            font: "165px Arial",
            fill: "#00ff44",
            align: "center"
        });



        if(this.game.debugMode){
            debugText = this.game.add.text(0, 0, "boxSpeed: 0", {
                font: "100px Arial",
                fill: "#ffffff",
                align: "center"
            });
        }
        if(soundEnabled){
            bgmusic.play();
        }
    },

    update: function() {
        ticks++;

        if(ticks > this.game.rnd.integerInRange(boxMinFreq, boxMaxFreq)){
            if((currentPowerup && currentPowerup.name === "money") || this.game.rnd.integerInRange(1, 8) === 1){
                this.addEthanBuck();
            }else{
                this.addBox();
            }
            ticks = 0;
        }

        boxes.forEach(function (box){
            if(box.alive) {
                box.y += (boxSpeed * 2)+box.y/(100-boxSpeed);
                box.x -= boxSpeed * (box.b_position == 1 ? 0.1 : box.b_position == 2 ? -0.3 : 0.4)*box.y/1000;

                if(ownedPowerups['oppositeday'] && !box.powerup){
                    box.scale.x += boxSpeed * 0.0001;
                    box.scale.y += boxSpeed * 0.0001;
                }else{
                    box.scale.x += boxSpeed * 0.001;
                    box.scale.y += boxSpeed * 0.001;
                }

                if (box.y > 3600) {
                    if(box.b_position == ethanPosition){
                        if(box.powerup){
                            if(typeof box.powerup.id != 'undefined') {
                                currentPowerup = this.game.add.sprite(900, 0, "powerups", box.powerup.id);
                                currentPowerup.name = box.powerup.bool;
                                switch(box.powerup.bool){
                                    case "slowdown":
                                        powerupTimer = 700;
                                        tempBoxSpeed = boxSpeed;
                                        boxSpeed = 5;
                                        break;
                                    case "money":
                                        powerupTimer = 500;
                                        break;
                                    case "invincibility":
                                        powerupTimer = 700;
                                        break;
                                    case "nuke":
                                        boxes.callAll("destroy");
                                        boxes.removeAll();
                                        break;
                                    default:
                                        console.warn("Unknown powerup %s ", box.powerup.bool);
                                        break;
                                }
                            }else if(box.powerup === "ethanbuck"){
                                this.game.ethanBucks++;
                                ebtext.setText(this.game.ethanBucks);
                                if(soundEnabled)
                                    pickupFx.play();
                            }
                            box.kill();
                        }else{
                            if(!currentPowerup || currentPowerup.name !== "invincibility"){
                                localStorage.setItem("ethanbucks", this.game.ethanBucks);
                                this.game.state.start("GameOver");
                            }else{
                                box.kill();
                            }
                        }

                    }else{
                        if(this.game.senpaiMode && soundEnabled && this.game.points % 20 == 0){
                            this.randEthan();
                        }
                        this.game.points++;
                        boxSpeed+=0.03;
                        boxMinFreq-=0.03;
                        boxMaxFreq-=0.02;
                        pointstext.setText(this.game.points);
                        boxes.remove(box);
                        box.destroy();
                        if(soundEnabled)
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
           debugText.setText("boxSpeed: "+boxSpeed);
            this.game.debug.soundInfo(bgmusic, 32, 32);
        }
        if(this.game.senpaiMode){
            background.forEach(function(arrow){
                arrow.x -= arrow.speed;
                if(arrow.x < -300){
                    arrow.x = 1080;
                }
            });
        }
        if(powerupTimer > 0){
            powerupTimer--;
            if(powerupTimer < 500 && powerupTimer % 100 === 0){
                currentPowerup.visible = !currentPowerup.visible;
            }
        }else if(currentPowerup){
            switch(currentPowerup.name){
                case "slowdown":
                    boxSpeed = tempBoxSpeed;
                    break;
            }
            currentPowerup.destroy();
            currentPowerup = null;

        }
    }
};