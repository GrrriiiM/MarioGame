/// <reference path="../Game/ControlableShape.js" />

var moveVelocity = 1;

var Enemy = (function (parent) {

    Enemy.prototype = new MoveableShape();
    Enemy.prototype.constructor = Enemy;

    function Enemy(id, params) {

        params = params || {};

        this.direction = Direction.RIGHT;

        parent.call(this, id, params);

        
        this.color = "";
        //this.name = "Mushroom";
        this.imagePath = "images";
        this.imageExtension = ".png";
        this.height = 64;
        this.width = 32;

        this.solid = true;
        this.impactTop = true;
        this.impactRight = true;
        this.impactBottom = true;
        this.impactLeft = true;

        this.config();

        this.onColisioned = onColisioned;

        this.defineImage();

    }

    var createGravity = function (shape) {
        return new ContinuousMoveable(shape, {
            id: "gravity",
            distance: 500,
            velocity: 500 * moveVelocity,
            direction: Direction.DOWN
        })
    };
    
    var onColisioned = function (moveable) {
        switch (moveable.id) {
            case "gravity":
                break;
        }
    };


    Enemy.prototype.defineImage = function () {
        this.hasChangedVisualForm = true;
        if (this.name) {
            this.imageName = this.name;
        }
    }

    Enemy.prototype.config = function () {
        this.moveables["gravity"] = createGravity(this);
    }

    Enemy.prototype.getDirectionImageName = function () {
        switch (this.direction) {
            case Direction.RIGHT:
                return "right";
            case Direction.LEFT:
                return "left";
        }
    }

    return Enemy;

})(MoveableShape);

try {
    module.exports = {
        Enemy: Enemy
    }
}
catch (err) {

}
