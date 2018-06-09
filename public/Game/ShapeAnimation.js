var ShapeAnimation = (function (parent) {

    ShapeAnimation.prototype = new Base();
    ShapeAnimation.prototype.constructor = ShapeAnimation;

    function ShapeAnimation(id, shape, params) {

        this.id = id;
        this.shape = shape;
        this.currentTime = 0;
        this.status = StatusShapeAnimation.STOP;
        this.currentStep = 0;
        this.steps = [];
        this.repeat = true;

        parent.call(this, params);

    }

    ShapeAnimation.prototype.start = function () {
        this.status = StatusShapeAnimation.START;
    }

    ShapeAnimation.prototype.pause = function () {
        this.status = StatusShapeAnimation.PAUSE;
    }

    ShapeAnimation.prototype.stop = function () {
        this.status = StatusShapeAnimation.STOP;
        this.currentTime = 0;
        this.currentStep = 0;
    }

    ShapeAnimation.prototype.doAnimation = function () {
        if (this.steps) {
            this.currentStep = -1;
            if (this.status == StatusShapeAnimation.START) {
                var time = 0;
                for (var step in this.steps) {
                    var stepAnimationShape = this.steps[step];
                    if (stepAnimationShape.time + time > this.currentTime) {
                        this.currentStep = step;
                        break;
                    }
                    else {
                        time = time + stepAnimationShape.time;
                    }
                }

                if (this.currentStep == -1) {
                    this.currentTime = 0;
                    this.currentStep = 0;
                    this.steps[0].shapeAnimation = this;
                    this.steps[0].animate();
                }
                else {
                    this.currentTime = this.currentTime + (1000 / Game.framePerSecond);
                    this.steps[this.currentStep].shapeAnimation = this;
                    this.steps[this.currentStep].animate();
                }
                

            }
        }
    }

    return ShapeAnimation;

})(Base);


try {
    module.exports = {
        ShapeAnimation: ShapeAnimation
    }
}
catch (err) {

}
