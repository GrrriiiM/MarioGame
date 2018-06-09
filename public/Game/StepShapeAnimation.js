var StepShapeAnimation = (function (parent) {

    StepShapeAnimation.prototype = new Base();
    StepShapeAnimation.prototype.constructor = StepShapeAnimation;

    function StepShapeAnimation(params) {

        this.step = 0;
        this.time = 500;
        this.shapeAnimation = {};

        parent.call(this, params);

    }

    StepShapeAnimation.prototype.animate = function () {
        this.shapeAnimation.shape.hasChangedVisualForm = true;
        if (this.onBeforeAnimate) {
            this.onBeforeAnimate(this);
        }

        this.shapeAnimation.shape.imageName = this.shapeAnimation.shape.name + "_" + this.shapeAnimation.id + this.step.toString();

        if (this.onAfterAnimate) {
            this.onAfterAnimate(this);
        }
    }

    StepShapeAnimation.prototype.onBeforeAnimate = function (step) {
    }

    StepShapeAnimation.prototype.onAfterAnimate = function (step) {
    }

    return StepShapeAnimation;

})(Base);

try {
    module.exports = {
        StepShapeAnimation: StepShapeAnimation
    }
}
catch (err) {

}