/*
 * Copyright ©2016 UnacceptableUse
 */
/**
 * Created by Peter on 05/02/2016.
 */
Ethan.Store = function(game){

};
Ethan.Store.prototype = {

    create: function(){
        if(this.game.ethanBucks === 69){
            window.game.unlockAchievement("CgkIrP6I1bcCEAIQBA");
        }
        if (this.game.senpaiMode) {
            Ethan.Store.background = this.game.add.group();
            for (var i = 0; i < 20; i++) {
                var arrow = this.game.add.sprite(this.game.rnd.integerInRange(0, 1080), this.game.rnd.integerInRange(0, 1920), "background");
                var scale = this.game.rnd.integerInRange(1, 100) / 100;
                arrow.scale.setTo(scale, scale);
                arrow.speed = this.game.rnd.integerInRange(1, 10);
                Ethan.Store.background.add(arrow);
            }
        } else {
            Ethan.Store.background = this.add.image(0, 0, "space");
            Ethan.Store.background.anchor.setTo(0.5, 0.5);
            Ethan.Store.background.angle = 90;
            Ethan.Store.background.scale.setTo(2.5, 2);
        }

        Ethan.Store.ownedPowerups = JSON.parse(localStorage.getItem("powerups")) || {};
        Ethan.Store.storeFront = this.add.image(50, 200, "storefront");
        Ethan.Store.storeHeader = this.add.image(230, 50, "storeheader");

        var costStyle = {
            font: "34px Arial",
            fill: "#000000",
            align: "right",
            boundsAlignH: "right"
        };

        var titleStyle = {
            font: "80px Arial",
            fill: "#000000"
        };

        var descStyle = {
            font: "40px Arial",
            fill: "#000000",
            wordWrap: true,
            wordWrapWidth: 500
        };

        var sellStyle = {
            font: "100px Arial",
            fontWeight: "bold",
            fill: "#FF0000",
            stroke: "#000000",
            strokeThickness: 10
        };

        var sellText = this.game.make.text(360, 80, "SELL", sellStyle);
        sellText.anchor.setTo(0.5, 0.5);
        sellText.rotation = -0.5;
        var sellCount = 0;
        for(var i = 0; i < 7; i++){
            var bmp = this.game.make.bitmapData(965, 209);
            var powerup = powerups[i];
            var ethanbuck = this.game.make.sprite(850, 150, "ethanbucks");
            ethanbuck.scale.setTo(0.3, 0.3);
            bmp.draw(this.game.make.sprite(10, 10, "powerups", powerup.id));
            bmp.draw(ethanbuck);
            bmp.draw(this.game.make.text(200,0, powerup.name, titleStyle));
            bmp.draw(this.game.make.text(200,80, powerup.desc, descStyle));
            bmp.draw(this.game.make.text(770, 150, powerup.cost, costStyle));
            if(Ethan.Store.ownedPowerups[powerup.bool]){
                sellCount ++;
                bmp.draw(sellText);
            }
            var button = this.game.add.button(80, 280+(214*i), bmp, this.buyItem, this);
            button.events.onInputOver.add(this.tintButton, this);
            button.events.onInputOut.add(this.untintButton, this);
            button.purchase = i;

            if(sellCount === 8 && window.game){
                window.game.unlockAchievement("CgkIrP6I1bcCEAIQCA");
            }
        }

        Ethan.Store.balanceText = this.add.text(160,210, "x"+this.game.ethanBucks, {
            font: "48px Arial",
            fill: "#000000"
        });

        Ethan.Store.backButton = this.game.add.button(240, 1750, 'back', this.mainMenu, this, 1, 1, 1);
    },

    update: function(){
        if(this.game.senpaiMode){
            Ethan.Store.background.forEach(function(arrow){
                arrow.x-=arrow.speed;
                if(arrow.x < -300){
                    arrow.x = 1080;
                }
            });
        }
    },

    buyItem: function(button){
        var item = powerups[button.purchase];

        if (Ethan.Store.ownedPowerups[item.bool]) {
            this.game.ethanBucks = parseInt(this.game.ethanBucks) + parseInt(item.cost);
            Ethan.Store.ownedPowerups[item.bool] = false;
            localStorage.setItem("ethanbucks", parseInt(this.game.ethanBucks));
            localStorage.setItem("powerups", JSON.stringify(Ethan.Store.ownedPowerups));
            if (item.bool === "senpai") {
                menumusic.stop();
                this.game.state.start("Boot");
            } else {
                this.game.state.start("Store");
            }

        } else {
            if (item.cost > this.game.ethanBucks) {
                this.game.messageBox("You don't have enough EthanBucks to purchase this item!\n\nWould you like to go to the EthanBucks store now?", function () {
                    this.game.state.start("EthanBucks");
                }, function () {
                    this.game.state.start("Store");
                }, this);
            } else {
                this.game.ethanBucks -= item.cost;
                localStorage.setItem("ethanbucks", parseInt(this.game.ethanBucks));
                Ethan.Store.ownedPowerups[item.bool] = true;
                localStorage.setItem("powerups", JSON.stringify(Ethan.Store.ownedPowerups));
                if (item.bool === "senpai") {
                    menumusic.stop();
                    this.game.state.start("Boot");
                } else {
                    this.game.state.start("Store");
                }
            }
        }
    },

    mainMenu: function(){
        this.game.state.start("Menu");
    },

    tintButton: function(button){
        button.alpha = 0.5;
    },

    untintButton: function(button){
        button.alpha = 1;
    }
};