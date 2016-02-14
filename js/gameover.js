/**
 * Created by Peter on 15/08/2015.
 */
Ethan.GameOver = function(game){
}

Ethan.GameOver.prototype = {
    create: function(){
        if(this.game.senpaiMode){
            background = this.game.add.group();
            for (var i = 0; i < 20; i++) {
                var arrow = this.game.add.sprite(this.game.rnd.integerInRange(0, 1080), this.game.rnd.integerInRange(0, 1920), "background");
                var scale = this.game.rnd.integerInRange(1, 100) / 100;
                arrow.scale.setTo(scale, scale);
                arrow.speed = this.game.rnd.integerInRange(1, 10);
                background.add(arrow);
            }

        }else{
            background = this.game.add.sprite(0,0, "space");
            background.anchor.setTo(0.5, 0.5);
            background.angle = 90;
            background.scale.set(2.5, 2);
        }

        gameover = this.game.add.sprite(200, 200, "gameover");
        gameover.scale.setTo(2,2);

        if(this.game.points > localStorage.getItem("highscore")){
            localStorage.setItem("highscore", this.game.points);
        }
        if(window.game){
            if(this.game.points == 1999){
                window.game.unlockAchievement("CgkIrP6I1bcCEAIQCQ")
            }else if(this.game.points >= 1000){
                window.game.unlockAchievement("CgkIrP6I1bcCEAIQBw")
            }else if(this.game.points >= 500){
                window.game.unlockAchievement("CgkIrP6I1bcCEAIQBg")
            }else if(this.game.points >= 300){
                window.game.unlockAchievement("CgkIrP6I1bcCEAIQBQQ");
            }
            window.game.submitScore("CgkIrP6I1bcCEAIQAQ", this.game.points);
            window.game.submitScore("CgkIrP6I1bcCEAIQAg", this.game.ethanBucks);
        }


        scoreText = this.game.add.text(280, 750, "Score: "+this.game.points+"\nHigh:"+(localStorage.getItem("highscore") || 0), {
            font: "100px Arial",
            fill: "#ffffff"
        });

        button = this.game.add.button(240, 1050, 'button', this.restart, this, 1, 1, 1);
        storeButton = this.game.add.button(240, 1225, 'store', this.openstore, this, 1, 1, 1);
        this.game.add.button(240, 1400, 'back', this.menu, this, 1, 1, 1);

        this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.restart, this);
        this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.restart, this);
        this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.menu, this);
        this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE).onDown.add(this.menu, this);
    },

    restart: function(){
        bgmusic.stop();
        this.game.state.start("Game");
    },

    menu: function(){
        bgmusic.stop();
        this.game.state.start("Menu");
    },

    openstore: function(){
        this.game.state.start("Store");
    },

    update: function(){
        if(this.game.senpaiMode){
            background.forEach(function(arrow){
                arrow.x-=arrow.speed;
                if(arrow.x < -300){
                    arrow.x = 1080;
                }
            });
        }
    }
}