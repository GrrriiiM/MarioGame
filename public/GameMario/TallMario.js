/// <reference path="../Game/ControlableShape.js" />
/// <reference path="Player.js" />
/// <reference path="../Game/ShapeAnimation.js" />
/// <reference path="../Game/StepShapeAnimation.js" />


var TallMario = (function (parent) {

    TallMario.prototype = new Player();
    TallMario.prototype.constructor = TallMario;

    function TallMario(id, params) {

        this.keyWalkRight = 68;
        this.keyWalkLeft = 65;
        this.keyJump = 87;
        this.keyRun = 16;

        parent.call(this, id, params);

        this.color = "";
        this.name = "TallMario";
        this.imagePath = "images/TallMario";
        this.imageExtension = ".png";
        this.height = 56;
        this.width = 28;

        this.animations = {};
        this.animations["walk"] = new ShapeAnimation("walk", this, {
            repeat: true,
            steps: [
                new StepShapeAnimation({
                    step: 0,
                    time: 100,
                    onAfterAnimate: function (step) {
                        step.shapeAnimation.shape.imageName = step.shapeAnimation.shape.imageName + "_" + step.shapeAnimation.shape.getDirectionImageName();
                    }
                }),
                new StepShapeAnimation({
                    step: 1,
                    time: 100,
                    onAfterAnimate: function (step) {
                        step.shapeAnimation.shape.imageName = step.shapeAnimation.shape.imageName + "_" + step.shapeAnimation.shape.getDirectionImageName();
                    }
                }),
                new StepShapeAnimation({
                    step: 2,
                    time: 100,
                    onAfterAnimate: function (step) {
                        step.shapeAnimation.shape.imageName = step.shapeAnimation.shape.imageName + "_" + step.shapeAnimation.shape.getDirectionImageName();
                    }
                })
            ]
        });

        this.animations["run"] = new ShapeAnimation("walk", this, {
            repeat: true,
            steps: [
                new StepShapeAnimation({
                    step: 0,
                    time: 75,
                    onAfterAnimate: function (step) {
                        step.shapeAnimation.shape.imageName = step.shapeAnimation.shape.imageName + "_" + step.shapeAnimation.shape.getDirectionImageName();
                    }
                }),
                new StepShapeAnimation({
                    step: 1,
                    time: 75,
                    onAfterAnimate: function (step) {
                        step.shapeAnimation.shape.imageName = step.shapeAnimation.shape.imageName + "_" + step.shapeAnimation.shape.getDirectionImageName();
                    }
                }),
                new StepShapeAnimation({
                    step: 2,
                    time: 75,
                    onAfterAnimate: function (step) {
                        step.shapeAnimation.shape.imageName = step.shapeAnimation.shape.imageName + "_" + step.shapeAnimation.shape.getDirectionImageName();
                    }
                })
            ]
        });

        this.animations["runFast"] = new ShapeAnimation("run", this, {
            repeat: true,
            steps: [
                new StepShapeAnimation({
                    step: 0,
                    time: 25,
                    onAfterAnimate: function (step) {
                        step.shapeAnimation.shape.imageName = step.shapeAnimation.shape.imageName + "_" + step.shapeAnimation.shape.getDirectionImageName();
                    }
                }),
                new StepShapeAnimation({
                    step: 1,
                    time: 25,
                    onAfterAnimate: function (step) {
                        step.shapeAnimation.shape.imageName = step.shapeAnimation.shape.imageName + "_" + step.shapeAnimation.shape.getDirectionImageName();
                    }
                }),
                new StepShapeAnimation({
                    step: 2,
                    time: 25,
                    onAfterAnimate: function (step) {
                        step.shapeAnimation.shape.imageName = step.shapeAnimation.shape.imageName + "_" + step.shapeAnimation.shape.getDirectionImageName();
                    }
                })
            ]
        });

    }

    TallMario.prototype.defineImage = function () {

        this.hasChangedVisualForm = true;

        var width = 0;
        var height = 0;

        if (this.name) {

            var statusImageName = this.getStatusImageName();

            if (statusImageName == "run") {
                this.height = 56;
                this.width = 32;
                this.animations["run"].start();
                this.animations["runFast"].stop();
                this.animations["walk"].stop();
            }
            else if (statusImageName == "runFast") {
                this.height = 56;
                this.width = 36;
                this.animations["run"].stop();
                this.animations["runFast"].start();
                this.animations["walk"].stop();
            }
            else if (statusImageName == "walk") {
                this.height = 56;
                this.width = 32;
                this.animations["walk"].start();
                this.animations["runFast"].stop();
                this.animations["run"].stop();
            }
            else {
                if (statusImageName == "stand") {
                    this.height = 56;
                    this.width = 28;
                }
                else if (statusImageName == "fall") {
                    this.height = 58;
                    this.width = 32;
                }
                else if (statusImageName == "jump") {
                    this.height = 62;
                    this.width = 32;
                }
                else if (statusImageName == "jumpFast") {
                    this.height = 52;
                    this.width = 38;
                }
                else if (statusImageName == "stop") {
                    this.height = 56;
                    this.width = 28;
                }

                this.animations["walk"].stop();
                this.animations["run"].stop();
                this.animations["runFast"].stop();
                this.imageName = this.name + "_" + statusImageName;
                this.imageName = this.imageName + "_" + this.getDirectionImageName();
            }


            if (this.oldStatusImage) {

                var diffWidth = this.width - this.oldStatusImage.width;
                var diffHeight = this.height - this.oldStatusImage.height;

                if (this.direction == Direction.RIGHT) {
                    this.left = this.left - diffWidth;
                }


                this.top = this.top - diffHeight;

            }

            this.oldStatusImage = {
                name: statusImageName,
                width: this.width,
                height: this.height
            };
            
        }
    }

    TallMario.prototype.onColisioning = function (moveable, shape) {
        if (shape instanceof Mushroom) {
            return false;
        }
        else {
            return parent.prototype.onColisioning.call(this, moveable, shape);
        }
    }

    return TallMario;

})(Player);

try {
    module.exports = {
        TallMario: TallMario
    }
}
catch (err) {

}


