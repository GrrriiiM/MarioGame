/// <reference path="../Game/ControlableShape.js" />

var moveVelocity = 1;

var Player = (function (parent) {

    Player.prototype = new ControlableShape();
    Player.prototype.constructor = Player;

    function Player(id, params) {

        this.keyWalkRight = 39;
        this.keyWalkLeft = 37;
        this.keyJump = 32;
        this.keyRun = 16;
        //this.status = PlayerStatus.STAND;
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

        //this.onColisioned = onColisioned;

        Game.on("beforeDefineMoveables", onBeforeDefineMoveables, this);
        Game.on("afterDefineMoveables", onAfterDefineMoveables, this);

        this.startFrameTop = this.top;
        this.startFrameLeft = this.top;

        this.defineImage();

    }

    var actionRunRight = function (target) {
        if (target.moveables["runRight"] == undefined) {
            var moveable = createRunRight(target);
            moveable.onFinished = onFinishedRunRight;
            target.moveables[moveable.id] = moveable;
        }
    };

    var onFinishedRunRight = function () {
        delete this.shape.moveables["runRight"];
        this.shape.moveables["runFastRight"] = createRunFastRight(this.shape);
    }

    var createRunRight = function (shape) {
        return new AccelerateMoveable(shape, {
            id: "runRight",
            velocity: 100 * moveVelocity,
            endVelocity: 200 * moveVelocity,
            accelerate: 500 * moveVelocity,
            direction: Direction.RIGHT,
            keys: [shape.keyWalkRight, shape.keyRun]
        })
    };

    var createRunFastRight = function (shape) {
        var moveable = new ContinuousMoveable(shape, {
            id: "runFastRight",
            velocity: 200 * moveVelocity,
            direction: Direction.RIGHT,
            keys: [shape.keyWalkRight, shape.keyRun]
        });

        return moveable;
    };


    var createWalkRight = function (shape) {
        return new ContinuousMoveable(shape, {
            id: "walkRight",
            velocity: 150 * moveVelocity,
            direction: Direction.RIGHT,
            keys: [shape.keyWalkRight]
        })
    };

    var actionRunLeft = function (target) {
        if (target.moveables["runLeft"] == undefined) {
            var moveable = createRunLeft(target);
            moveable.onFinished = onFinishedRunLeft;
            target.moveables[moveable.id] = moveable;
        }
    };

    var onFinishedRunLeft = function () {
        delete this.shape.moveables["runLeft"];
        this.shape.moveables["runFastLeft"] = createRunFastLeft(this.shape);
    }

    var createRunLeft = function (shape) {
        return new AccelerateMoveable(shape, {
            id: "runLeft",
            velocity: 100 * moveVelocity,
            endVelocity: 200 * moveVelocity,
            accelerate: 500 * moveVelocity,
            direction: Direction.LEFT,
            keys: [shape.keyWalkLeft, shape.keyRun]
        })
    };

    var createRunFastLeft = function (shape) {
        var moveable = new ContinuousMoveable(shape, {
            id: "runFastLeft",
            velocity: 200 * moveVelocity,
            direction: Direction.LEFT,
            keys: [shape.keyWalkLeft, shape.keyRun]
        });

        return moveable;
    };

    var createWalkLeft = function (shape) {
        return new ContinuousMoveable(shape, {
            id: "walkLeft",
            velocity: 150 * moveVelocity,
            direction: Direction.LEFT,
            keys: [shape.keyWalkLeft]
        })
    };


    var createStopRight = function (shape) {
        return new AccelerateMoveable(shape, {
            id: "stopRight",
            velocity: shape.moveables["walkRight"].velocity,
            direction: shape.moveables["walkRight"].direction,
            endVelocity: 0,
            accelerate: 1500 * moveVelocity
        })
    };

    var createStopLeft = function (shape) {
        return new AccelerateMoveable(shape, {
            id: "stopLeft",
            velocity: shape.moveables["walkLeft"].velocity,
            direction: shape.moveables["walkLeft"].direction,
            endVelocity: 0,
            accelerate: 1500 * moveVelocity
        })
    };

    var createJump = function (shape) {
        var jump = new ContinuousMoveable(shape, {
            id: "jump",
            velocity: 800 * moveVelocity,
            direction: Direction.UP,
            //keys: [shape.keyJump],
            distance: 10
        });
        jump.onFinished = onFinishedJump;
        return jump;
    };

    var createJumpHigh = function (shape) {
        var jump = new ContinuousMoveable(shape, {
            id: "jump",
            velocity: 800 * moveVelocity,
            direction: Direction.UP,
            //keys: [shape.keyJump],
            distance: 70
        });
        jump.onFinished = onFinishedJumpHigh;
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
        if (Game.keys[this.shape.id][this.shape.keyJump]) {
            this.shape.moveables["jump"] = createJumpHigh(this.shape);
        }
        else {
            this.shape.moveables["jump"] = createJumpDesaccelation(this.shape);
        }
    }

    var onFinishedJumpHigh = function () {
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

    Player.prototype.resetStatus = function () {
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
                    //if (this.moveables["stopLeft"]) {
                    //    this.moveables["stopLeft"].cancel();
                    //}
                    //if (this.moveables["stopRight"]) {
                    //    this.isStop = true;

                    //}
                    //Game.printFrame("movendo esquerda: " + moveable.shape.left + " - colisionado: " + moveable.isColisioned);
                }
                else if (moveable.wasMoved) {
                    ///this.moveables["stopLeft"] = createStopLeft(moveable.shape);
                }
                break;
            case "walkRight":
                if (moveable.isMoved) {
                    this.isWalk = true;
                    moveable.shape.direction = Direction.RIGHT;
                    //if (this.moveables["stopRight"]) {
                    //    this.moveables["stopRight"].cancel();
                    //}
                    //if (this.moveables["stopLeft"]) {
                    //    this.isStop = true;
                    //}
                    //Game.printFrame("movendo direita: " + moveable.shape.left + " - colisionado: " + moveable.isColisioned);
                }
                else if (moveable.wasMoved) {
                    //this.moveables["stopRight"] = createStopRight(moveable.shape);
                }
                break;
            case "stopRight":
                //this.isStop = true;
                break;
            case "stopLeft":
                //this.isStop = true;
                break;
            case "runRight":
                if (moveable.isMoved) {
                    this.isRun = true;
                }
                else if (moveable.wasMoved) {
                    delete this.moveables["runRight"];
                }
                break;
            case "runFastRight":
                if (moveable.isMoved) {
                    this.isRunFast = true;
                }
                else if (moveable.wasMoved) {
                    delete this.moveables["runFastRight"];
                }
                break;
            case "runLeft":
                if (moveable.isMoved) {
                    this.isRun = true;
                }
                else if (moveable.wasMoved) {
                    delete this.moveables["runLeft"];
                }
                break;
            case "runFastLeft":
                if (moveable.isMoved) {
                    this.isRunFast = true;
                }
                else if (moveable.wasMoved) {
                    delete this.moveables["runFastLeft"];
                }
                break;
        }
    };

    Player.prototype.onColisioned = function (moveable, shape) {
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

            //Game.printFrame(" isFall: " + shape.isFall.toString()
            //    + " isJump: " + shape.isJump.toString()
            //    + " isWalk: " + shape.isWalk.toString()
            //    + " isStop: " + shape.isStop.toString()
            //    + " isRun: " + shape.isRun.toString()
            //    + " isRunFast: " + shape.isRunFast.toString()
            //);

            shape.defineImage();

            //if (this.id == "player1") {
            //    var margin = Game.width / 2.5;

            //    var left = 0;

            //    if (shape.direction == Direction.LEFT) {
            //        left = shape.left;
            //    }
            //    else {
            //        left = shape.getRight() - 32;
            //    }

            //    if (left > margin && left < (shape.container.width - Game.width) + margin) {
            //        shape.container.visualLeft = left - margin;
            //        for (var idParalax in shape.container.paralax) {

            //            var paralax = shape.container.paralax[idParalax];

            //            var i = paralax.width / shape.container.width;
            //            paralax.visualLeft = shape.container.visualLeft * i;

            //        }

            //    }
            //}

            //Game.printFrame((shape.left / 32).toFixed(0));

        }
    }

    Player.prototype.onColisioning = function (moveable, shape) {

        return true;
        return parent.prototype.onColisioning.call(this, moveable, shape);
    }

    Player.prototype.defineImage = function () {
        this.hasChangedVisualForm = true;
        //this.lastMovedFrame = Game.actualFrame;
        if (this.name) {
            this.imageName = this.name + "_" + this.getStatusImageName();
            this.imageName = this.imageName + "_" + this.getDirectionImageName();
        }
    }
        
    Player.prototype.config = function () {

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

        this.keysControl.push(
            new KeyControl({
                keys: [this.keyWalkRight, this.keyRun],
                action: actionRunRight
            })
        );

        this.keysControl.push(
            new KeyControl({
                keys: [this.keyWalkLeft, this.keyRun],
                action: actionRunLeft
            })
        );
    }

    Player.prototype.getStatusImageName = function () {

        if (this.isFall) {

            if (this.isRunFast) {
                return "jumpFast";
            }
            else {
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
        }
        else if (this.isWalk) {
            if (this.isStop) {
                return "stop";
            }
            else if (this.isRunFast) {
                return "runFast";
            }
            else if (this.isRun) {
                return "run";
            }
            else {
                return "walk";
            }
        }
        else {
            return "stand";
        }

    }

    Player.prototype.getDirectionImageName = function () {
        switch (this.direction) {
            case Direction.RIGHT:
                return "right";
            case Direction.LEFT:
                return "left";
        }
    }

    return Player;

})(ControlableShape);

try {
    module.exports = {
        Player: Player
    }
}
catch (err) {

}
