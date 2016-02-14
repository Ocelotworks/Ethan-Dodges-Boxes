/**
 * Created by Peter on 07/02/2016.
 */


var items = [
    {
        name: "Quiver of 500 EthanBucks",
        desc: "Don't ask why they're in a quiver. Just don't.",
        cost: "0.70",
        id: 0
    },
    {
        name: "Crate of 5000 EthanBucks",
        desc: "More EthanBucks than you'll know what to do with.",
        cost: "2.95",
        id: 1
    },
    {
        name: "Low Orbit EthanBucks Cannon",
        desc: "Get 10000 EB at a discount price!",
        cost: "5.99",
        id: 2
    }
];

Ethan.EthanBucks = function(game){};
Ethan.EthanBucks.prototype = {

    preload: function(){
        this.game.load.spritesheet("ebitems", "assets/ebitems.png", 180, 180);
    },


    create: function(){
        if (this.game.senpaiMode) {
            background = this.game.add.group();
            for (var i = 0; i < 20; i++) {
                var arrow = this.game.add.sprite(this.game.rnd.integerInRange(0, 1080), this.game.rnd.integerInRange(0, 1920), "background");
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

        storefront = this.add.image(50, 200, "storefront");
        storeHeader = this.add.image(230, 50, "storeheader");

        var costStyle = {
            font: "34px Arial",
            fill: "#000000",
            align: "right",
            boundsAlignH: "right"
        };

        var titleStyle = {
            font: "40px Arial",
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

        for(var i = 0; i < 3; i++){
            var bmp = this.game.make.bitmapData(965, 209);
            var powerup = items[i];
            var ethanbuck = this.game.make.sprite(850, 150, "ethanbucks");
            ethanbuck.scale.setTo(0.3, 0.3);
            bmp.draw(this.game.make.sprite(10, 10, "ebitems", powerup.id));
            bmp.draw(ethanbuck);
            bmp.draw(this.game.make.text(200,0, powerup.name, titleStyle));
            bmp.draw(this.game.make.text(200,80, powerup.desc, descStyle));
            bmp.draw(this.game.make.text(770, 150, powerup.cost, costStyle));
            //if(ownedPowerups[powerup.bool]){
            //    bmp.draw(sellText);
            //}
            var button = this.game.add.button(80, 280+(214*i), bmp, this.buyItem, this);
            button.events.onInputOver.add(this.tintButton, this);
            button.events.onInputOut.add(this.untintButton, this);
            button.purchase = i;
        }

        balance = this.add.text(160,210, "x"+this.game.ethanBucks, {
            font: "48px Arial",
            fill: "#000000"
        });

        backButton = this.game.add.button(240, 1750, 'back', this.shop, this, 1, 1, 1);

        //console.log(store);

        if(typeof store !== 'undefined'){
            console.log("Store exists");
            store.register({
                id: "0",
                alias: items[0].name,
                type: store.CONSUMABLE
            });
            store.register({
                id: "1",
                alias: items[1].name,
                type: store.CONSUMABLE
            });
            store.register({
                id: "2",
                alias: items[2].name,
                type: store.CONSUMABLE
            });

            store.when("0").approved(function(product){
                console.log("order approved");
                game.ethanBucks += 500;
                localStorage.setItem("ethanbucks", parseInt(game.ethanBucks));
                product.finish();
                this.purchaseMenu();
            });

            store.when("1").approved(function(product){
                console.log("order approved");
                game.ethanBucks += 5000;
                localStorage.setItem("ethanbucks", parseInt(game.ethanBucks));
                product.finish();
                this.purchaseMenu();

            });

            store.when("2").approved(function(product){
                console.log("order approved");
                game.ethanBucks += 10000;
                localStorage.setItem("ethanbucks", parseInt(game.ethanBucks));
                product.finish();
                this.purchaseMenu();
            });

            store.refresh();

        }else{
            console.log("store?");
            this.game.messageBox("Your device is not compatible with in-app purchases. Return to store?", function(){
                this.shop();
            }, this);
        }


    },

    purchaseMenu: function(){
        window.game.submitScore("CgkIrP6I1bcCEAIQAg", this.game.ethanBucks);
        this.game.messageBox("Purchase Successful! Continue shopping for EthanBucks?", function(){
            game.state.start("EthanBucks");
        }, this.shop, this);
    },

    buyItem: function(button){
        console.log("store order go");
        store.order(button.purchase+"");
    },

    shop: function(){
        this.game.state.start("Store");
    },

    tintButton: function(button){
        button.alpha = 0.5;
    },

    untintButton: function(button) {
        button.alpha = 1;
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

};