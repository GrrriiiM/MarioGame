/// <reference path="../Game/ControlableShape.js" />
/// <reference path="Player.js" />
/// <reference path="../Game/ShapeAnimation.js" />
/// <reference path="../Game/StepShapeAnimation.js" />


var Person = (function (parent) {

    Person.prototype = new NewPlayer();
    Person.prototype.constructor = Person;

    function Person(id, params) {


        parent.call(this, id, params);

        this.direction = Direction.LEFT;

        this.color = "";
        this.name = "Person000000";
        this.imagePath = "images/Person";
        this.imageExtension = ".png";
        this.height = 68;
        this.width = 60;

        this.animations = {};

        var standFrameTime = 75 * Game.speedVariant;
        this.animations["stand"] = new ShapeAnimation("stand", this, {
            repeat: true,
            steps: [
                defaultFrame(0, standFrameTime * 20),
                defaultFrame(1, standFrameTime),
                defaultFrame(2, standFrameTime),
                defaultFrame(3, standFrameTime)
            ]
        });

        var walkFrameTime = 50 * Game.speedVariant;
        this.animations["walk"] = new ShapeAnimation("walk", this, {
            repeat: true,
            steps: [
                defaultFrame(0, walkFrameTime),
                defaultFrame(1, walkFrameTime),
                defaultFrame(2, walkFrameTime),
                defaultFrame(3, walkFrameTime*1.5),
                defaultFrame(4, walkFrameTime),
                defaultFrame(5, walkFrameTime),
                defaultFrame(6, walkFrameTime),
                defaultFrame(7, walkFrameTime),
                defaultFrame(8, walkFrameTime * 1.5),
                defaultFrame(9, walkFrameTime)
            ]
        });


    }

    var defaultFrame = function (step, time) {
        return new StepShapeAnimation({
            step: step,
            time: time,
            onAfterAnimate: function (step) {
                step.shapeAnimation.shape.imageName = step.shapeAnimation.shape.imageName + "_" + step.shapeAnimation.shape.getDirectionImageName();
            }
        })
    }

    Person.prototype.defineImage = function () {

        this.hasChangedVisualForm = true;

        var width = 0;
        var height = 0;


        if (this.name) {
            var statusImageName = this.getStatusImageName();

            if (statusImageName == "stand") {
                this.height = 68;
                this.width = 60;
                this.animations["walk"].stop();
                this.animations["stand"].start();
            }
            else if (statusImageName == "walk") {
                this.height = 68;
                this.width = 70;
                this.animations["walk"].start();
                this.animations["stand"].stop();
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

    Person.prototype.onColisioning = function (moveable, shape) {
        return parent.prototype.onColisioning.call(this, moveable, shape);
    }


    return Person;

})(NewPlayer);

try {
    module.exports = {
        Person: Person
    }
}
catch (err) {

}


