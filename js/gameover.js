/**
 * Created by Peter on 15/08/2015.
 */
Ethan.GameOver = function(game){
};

Ethan.GameOver.prototype = {
    create: function(){
        if(this.game.senpaiMode){
            Ethan.GameOver.background = this.game.add.group();
            for (var i = 0; i < 20; i++) {
                var arrow = this.game.add.sprite(this.game.rnd.integerInRange(0, 1080), this.game.rnd.integerInRange(0, 1920), "assets", "background");
                var scale = this.game.rnd.integerInRange(1, 100) / 100;
                arrow.scale.setTo(scale, scale);
                arrow.speed = this.game.rnd.integerInRange(1, 10);
                Ethan.GameOver.background.add(arrow);
            }

        }else{
            Ethan.GameOver.background = this.game.add.sprite(0,0, "assets", "space");
        }

        Ethan.GameOver.gameOverText = this.game.add.sprite(200, 200, "assets", "gameover");
        Ethan.GameOver.gameOverText.scale.setTo(2,2);

        if(this.game.points > localStorage.getItem("highscore")){
            localStorage.setItem("highscore", this.game.points);
        }
        if(window.game){
            if(this.game.points == 1999){
                window.game.unlockAchievement("CgkIrP6I1bcCEAIQCQ")
            }

            if(this.game.points >= 1000){
                window.game.unlockAchievement("CgkIrP6I1bcCEAIQBw")
            }

            if(this.game.points >= 500){
                window.game.unlockAchievement("CgkIrP6I1bcCEAIQBg")
            }

            if(this.game.points >= 300){
                window.game.unlockAchievement("CgkIrP6I1bcCEAIQBQQ");
            }
            window.game.submitScore("CgkIrP6I1bcCEAIQAQ", this.game.points);
            window.game.submitScore("CgkIrP6I1bcCEAIQAg", this.game.ethanBucks);
        }


        Ethan.GameOver.scoreText = this.game.add.text(280, 750, "Score: "+this.game.points+"\nHigh:"+(localStorage.getItem("highscore") || 0), {
            font: "100px Arial",
            fill: "#ffffff"
        });

        Ethan.GameOver.restartButton = this.game.add.button(240, 1050, "assets", this.restart, this, "button","button","button");
        Ethan.GameOver.storeButton = this.game.add.button(240, 1225, "assets", this.openstore, this, "store", "store", "store");
        Ethan.GameOver.backButton = this.game.add.button(240, 1400,"assets", this.menu, this, "back", "back", "back");

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
            Ethan.GameOver.background.forEach(function(arrow){
                arrow.x-=arrow.speed;
                if(arrow.x < -300){
                    arrow.x = 1080;
                }
            });
        }
    }
};