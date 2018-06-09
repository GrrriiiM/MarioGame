/// <reference path="../Game/ControlableShape.js" />

var moveVelocity = Game.speedVariant;

var NewPlayer = (function (parent) {

    NewPlayer.prototype = new ControlableShape();
    NewPlayer.prototype.constructor = NewPlayer;

    function NewPlayer(id, params) {

        this.keyWalkRight = 39;
        this.keyWalkLeft = 37;
        this.keyJump = 32;
        this.direction = Direction.RIGHT;
        this.name = "";
        this.imagesPath = "";
        this.isFall = false;
        this.isJump = false;
        this.isWalk = false;
        this.isRun = false;
        this.isStop = false;
        this.isRunFast = false;



        params = params || {};

        params.solid = true;

        parent.call(this, id, params);

        this.impactTop = true;
        this.impactRight = true;
        this.impactBottom = true;
        this.impactLeft = true;

        this.config();

        this.onMoved = onMoved;

        Game.on("beforeDefineMoveables", onBeforeDefineMoveables, this);
        Game.on("afterDefineMoveables", onAfterDefineMoveables, this);

        this.startFrameTop = this.top;
        this.startFrameLeft = this.top;

        this.defineImage();

    }


    var createWalkRight = function (shape) {
        return new ContinuousMoveable(shape, {
            id: "walkRight",
            velocity: 400 * moveVelocity,
            direction: Direction.RIGHT,
            keys: [shape.keyWalkRight]
        })
    };


    var createWalkLeft = function (shape) {
        return new ContinuousMoveable(shape, {
            id: "walkLeft",
            velocity: 400 * moveVelocity,
            direction: Direction.LEFT,
            keys: [shape.keyWalkLeft]
        })
    };

    var createJump = function (shape) {
        var jump = new ContinuousMoveable(shape, {
            id: "jump",
            velocity: 1100 * moveVelocity,
            direction: Direction.UP,
            //keys: [shape.keyJump],
            distance: 10
        });
        jump.onFinished = onFinishedJump;
        return jump;
    };

    
    var createJumpDesaccelation = function (shape) {
        var jump = new AccelerateMoveable(shape, {
            id: "jump",
            velocity: 1100 * moveVelocity,
            endVelocity: 0,
            accelerate: 3000 * moveVelocity,
            direction: Direction.UP
        });
        return jump;
    };

    var onFinishedJump = function () {
        this.shape.moveables["jump"] = createJumpDesaccelation(this.shape);
    }

    var createGravity = function (shape) {
        return new ContinuousMoveable(shape, {
            id: "gravity",
            distance: 500,
            velocity: 500 * moveVelocity,
            direction: Direction.DOWN
        })
    };

    var actionJump = function (target) {
        if (!target.isFall) {
            var moveable = target.moveables["jump"];

            if (!moveable) {
                moveable = createJump(target);

                target.moveables[moveable.id] = moveable;
            }
        }
    }

    NewPlayer.prototype.resetStatus = function () {
        this.isFall = false;
        this.isJump = false;
        this.isWalk = false;
        this.isRun = false;
        this.isStop = false;
        this.isRunFast = false;
    }


    var onMoved = function (moveable) {
        switch (moveable.id) {
            case "jump":
                if (moveable.isMoved) {
                    this.isJump = true;
                }
                break;
            case "gravity":
                if (moveable.isMoved) {
                    this.isFall = true;
                    if (this.isRunFast) {
                        if (!this.isJump) {

                        }
                    }
                }
                break;
            case "walkLeft":
                if (moveable.isMoved) {
                    this.isWalk = true;
                    moveable.shape.direction = Direction.LEFT;
                }
                break;
            case "walkRight":
                if (moveable.isMoved) {
                    this.isWalk = true;
                    moveable.shape.direction = Direction.RIGHT;
                }
                break;
        }
    };

    NewPlayer.prototype.onColisioned = function (moveable, shape) {
        switch (moveable.id) {
            case "jump":
                this.isJump = false;
                moveable.cancel();
                break;
            case "gravity":
                if (this.isFall) {
                    this.isFall = false;
                    if (Game.keys[this.keyJump]) {
                        //Game.removeKey(this.keyJump);
                    }
                }

                break;
        }

        if (moveable.direction == Direction.UP) {
            if (shape instanceof Interrogation) {
                shape.hit();
            }
        }

    };

    var onBeforeDefineMoveables = function (game, id) {

        var shape = game.getShape(id);

        if (shape) {

            shape.startFrameTop = shape.top;
            shape.startFrameLeft = shape.top;
            shape.resetStatus();
        }
    }

    var onAfterDefineMoveables = function (game, id) {

        var shape = Game.getShape(id);

        if (shape) {

            shape.defineImage();

        }
    }

    NewPlayer.prototype.onColisioning = function (moveable, shape) {

        return true;
        return parent.prototype.onColisioning.call(this, moveable, shape);
    }

    NewPlayer.prototype.defineImage = function () {
        this.hasChangedVisualForm = true;
        if (this.name) {
            this.imageName = this.name + "_" + this.getStatusImageName();
            this.imageName = this.imageName + "_" + this.getDirectionImageName();
        }
    }

    NewPlayer.prototype.config = function () {

        this.keysControl = [];

        this.moveables["gravity"] = createGravity(this);

        this.moveables["walkLeft"] = createWalkLeft(this);


        this.moveables["walkRight"] = createWalkRight(this);

        this.keysControl.push(
            new KeyControl({
                keys: [this.keyJump],
                action: actionJump
            })
        );

    }

    NewPlayer.prototype.getStatusImageName = function () {
        
        if (this.isFall) {
            return "stand";
            if (this.startFrameTop < this.top) {
                return "fall";
            }
            else if (this.startFrameTop > this.top) {
                return "jump";
            }
            else {
                return "fall";
            }
        }
        else if (this.isWalk) {
            return "walk";
        }
        else {
            return "stand";
        }
    }

    NewPlayer.prototype.getDirectionImageName = function () {
        switch (this.direction) {
            case Direction.RIGHT:
                return "right";
            case Direction.LEFT:
                return "left";
        }
    }

    return NewPlayer;

})(ControlableShape);

try {
    module.exports = {
        NewPlayer: NewPlayer
    }
}
catch (err) {

}
