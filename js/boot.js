/*
 * Copyright ©2014 UnacceptableUse
 */
/**
 * Created by Peter on 25/06/2015.
 */


var powerups = [
    {
        name: "Bullet Time",
        desc: "Mr Anderson...",
        type: "powerup",
        cost: 50,
        id: "powerup-slowdown",
        bool: "slowdown"
    },
    {
        name: "Invincibility",
        desc: "Does what it says on the tin.",
        type: "powerup",
        cost: 80,
        id: "powerup-invincibility",
        bool: "invincibility"
    },
    {
        name: "Opposite day",
        desc: "Boxes dodges ethans",
        type: "cosmetic",
        cost: 100,
        id: "powerup-oppositeday",
        bool: "oppositeday"
    },
    {
        name: "Nuke",
        desc: "Destroy all boxes at once",
        type: "powerup",
        cost: 420,
        id: "powerup-nuke",
        bool: "nuke"
    },
    {
        name: "Dolla dolla bill",
        desc: "All boxes are money",
        type: "powerup",
        cost: 500,
        id: "powerup-money",
        bool: "money"
    },
    {
        name: "Fedora",
        desc: "m'Boxes",
        type: "cosmetic",
        cost: 1000,
        id: "powerup-fedora",
        bool: "fedora"
    },
    {
        name: "Senpai Ethan",
        desc: "B-baka! It's not like I wanted you to notice me...",
        type: "cosmetic",
        cost: 2000,
        id: "powerup-senpai",
        bool: "senpai"
    },
    {
        name: "Laser Eyes",
        desc: "IMA FIRIN MA LAZAH",
        type: "powerup",
        cost: 150,
        id: "powerup-laser",
        bool: "laser"
    }

];
var Ethan = {};
Ethan.Boot = function(game){};
Ethan.Boot.prototype = {
    preload: function(){
        this.load.image("ethan", "assets/loading1.png");
        this.load.image("fedora", "assets/loading2.png");
    },

    create: function(){
        this.scale.scaleMode = typeof window.orientation === 'undefined' ? Phaser.ScaleManager.SHOW_ALL : Phaser.ScaleManager.EXACT_FIT;
        this.scale.minWidth = 320;
        this.scale.minHeight = 480;
        this.scale.maxWidth = 1080;
        this.scale.maxHeight = 1920;
        this.game.time.advancedTiming = true;
        this.game.state.start("Loading");
    }
};