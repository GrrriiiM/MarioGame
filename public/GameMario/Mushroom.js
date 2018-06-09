/// <reference path="../Game/ControlableShape.js" />

var moveVelocity = 1;

var Mushroom = (function (parent) {

    Mushroom.prototype = new MoveableShape();
    Mushroom.prototype.constructor = Mushroom;

    function Mushroom(id, params) {

        params = params || {};

        params.solid = true;

        parent.call(this, id, params);

        this.direction = Direction.RIGHT;
        this.color = "";
        this.name = "Mushroom";
        this.imagePath = "images";
        this.imageExtension = ".png";
        this.height = 32;
        this.width = 32;

        this.impactTop = true;
        this.impactRight = true;
        this.impactBottom = true;
        this.impactLeft = true;

        this.config();

        this.onColisioned = onColisioned;

        Game.on("afterDefineMoveables", onAfterDefineMoveables, this);

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


    Mushroom.prototype.defineImage = function () {
        this.hasChangedVisualForm = true;
        if (this.name) {
            this.imageName = this.name;
        }
    }

    Mushroom.prototype.config = function () {
        this.moveables["gravity"] = createGravity(this);
    }

    var onAfterDefineMoveables = function (game, id) {

        var shape = Game.getShape(id);

        if (shape) {

            shape.hasChangedVisualForm = true;

            //Game.printFrame((shape.left / 32).toFixed(0));

        }
    }

    return Mushroom;

})(MoveableShape);

try {
    module.exports = {
        Mushroom: Mushroom
    }
}
catch (err) {

}