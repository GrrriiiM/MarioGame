/// <reference path="../Game/ControlableShape.js" />
/// <reference path="Player.js" />
/// <reference path="../Game/ShapeAnimation.js" />
/// <reference path="../Game/StepShapeAnimation.js" />


var SmallMario = (function (parent) {

    SmallMario.prototype = new Player();
    SmallMario.prototype.constructor = SmallMario;

    function SmallMario(id, params) {

        this.keyWalkRight = 68;
        this.keyWalkLeft = 65;
        this.keyJump = 87;
        this.keyRun = 16;

        parent.call(this, id, params);

        this.color = "";
        this.name = "SmallMario";
        this.imagePath = "images/SmallMario";
        this.imageExtension = ".png";
        this.height = 40;
        this.width = 28;

        this.animations = {};
        this.animations["walk"] = new ShapeAnimation("walk", this, {
            repeat: true,
            steps: [
                new StepShapeAnimation({
                    step: 0,
                    time: 150,
                    onAfterAnimate: function (step) {
                        step.shapeAnimation.shape.imageName = step.shapeAnimation.shape.imageName + "_" + step.shapeAnimation.shape.getDirectionImageName();
                    }
                }),
                new StepShapeAnimation({
                    step: 1,
                    time: 150,
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
                })
            ]
        });

    }

    SmallMario.prototype.defineImage = function () {

        this.hasChangedVisualForm = true;

        var width = 0;
        var height = 0;


        if (this.name) {
            var statusImageName = this.getStatusImageName();
            
            if (statusImageName == "run") {
                this.height = 40;
                this.width = 30;
                this.animations["run"].start();
                this.animations["runFast"].stop();
                this.animations["walk"].stop();
            }
            else if (statusImageName == "runFast") {
                this.height = 40;
                this.width = 32;
                this.animations["run"].stop();
                this.animations["runFast"].start();
                this.animations["walk"].stop();
            }
            else if (statusImageName == "walk") {
                this.height = 40;
                this.width = 30;
                this.animations["walk"].start();
                this.animations["runFast"].stop();
                this.animations["run"].stop();
            }
            else {
                if (statusImageName == "stand") {
                    this.height = 40;
                    this.width = 28;
                }
                else if (statusImageName == "fall") {
                    this.height = 40;
                    this.width = 32;
                }
                else if (statusImageName == "jump") {
                    this.height = 44;
                    this.width = 32;
                }
                else if (statusImageName == "jump") {
                    this.height = 40;
                    this.width = 30;
                }
                else if (statusImageName == "stop") {
                    this.height = 42;
                    this.width = 30;
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

    SmallMario.prototype.onColisioning = function (moveable, shape) {
        if (shape instanceof Mushroom) {
            shape.remove();
            this.toTallMario();
            return false;
        }
        else {
            return parent.prototype.onColisioning.call(this, moveable, shape);
        }
    }

    SmallMario.prototype.toTallMario = function () {

        
        Game.removeEventById(this.id);
        var tallMario = new TallMario(this.id, {
            container: this.container,
            keyWalkRight: this.keyWalkRight,
            keyWalkLeft: this.keyWalkLeft,
            keyJump: this.keyJump,
            keyRun: this.keyRun
        });

        tallMario.top = this.top - (tallMario.height - this.height);
        tallMario.left = this.left;

        this.container.shapes[this.id] = tallMario;

        return tallMario;
    }

    return SmallMario;

})(Player);

try {
    module.exports = {
        SmallMario: SmallMario
    }
}
catch (err) {

}


