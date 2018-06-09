/// <reference path="../Game/ControlableShape.js" />

var moveVelocity = 1;

var WalkTurtle = (function (parent) {

    WalkTurtle.prototype = new Enemy();
    WalkTurtle.prototype.constructor = WalkTurtle;

    function WalkTurtle(id, params) {

        params = params || {};

        this.endPositionRight = -1;
        this.endPositionLeft = -1;
        this.distanceRight = -1;
        this.distanceLeft = -1;

        parent.call(this, id, params);
       
        this.name = "walk_turtle";

        if (this.direction == Direction.RIGHT) {
            this.moveables.move = createMoveRight(this);
        }
        else {
            this.moveables.move = createMoveLeft(this);
        }
        
        this.onColisioned = onColisioned;

        this.animations = {};
        this.animations["walk"] = new ShapeAnimation("walk", this, {
            repeat: true,
            steps: [
                new StepShapeAnimation({
                    step: 0,
                    time: 150,
                    onAfterAnimate: function (step) {
                        step.shapeAnimation.shape.imageName = step.shapeAnimation.shape.imageName + "_" + step.shapeAnimation.shape.getDirectionImageName() + "_red";
                    }
                }),
                new StepShapeAnimation({
                    step: 1,
                    time: 150,
                    onAfterAnimate: function (step) {
                        step.shapeAnimation.shape.imageName = step.shapeAnimation.shape.imageName + "_" + step.shapeAnimation.shape.getDirectionImageName() + "_red";
                    }
                })
            ]
        });

        this.animations["walk"].start();
    }

    var createMoveLeft = function (shape) {
        var moveable = new ContinuousMoveable(shape, {
            id: "move",
            endPosition: shape.endPositionLeft,
            distance: shape.distanceLeft,
            velocity: 100,
            direction: Direction.LEFT
        });

        moveable.onFinished = function () {
            this.shape.direction = Direction.RIGHT;
            this.shape.moveables.move = createMoveRight(this.shape);
        }

        return moveable;
    }

    var createMoveRight = function (shape) {
        var moveable = new ContinuousMoveable(shape, {
            id: "move",
            endPosition: shape.endPositionRight,
            distance: shape.distanceRight,
            velocity: 100,
            direction: Direction.RIGHT
        });

        moveable.onFinished = function () {
            this.shape.direction = Direction.LEFT;
            this.shape.moveables.move = createMoveLeft(this.shape);
        }

        return moveable;
    }

    var onColisioned = function (moveable) {
        switch (moveable.direction) {
            case Direction.LEFT:
                moveable.shape.direction = Direction.RIGHT;
                moveable.shape.moveables.move = createMoveRight(this);
                break;
            case Direction.RIGHT:
                moveable.shape.direction = Direction.LEFT;
                moveable.shape.moveables.move = createMoveLeft(this);
                break;
        }
    }



    return WalkTurtle;

})(Enemy);

try {
    module.exports = {
        WalkTurtle: WalkTurtle
    }
}
catch (err) {

}
