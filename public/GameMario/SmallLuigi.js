/// <reference path="../Game/ControlableShape.js" />
/// <reference path="Player.js" />
/// <reference path="../Game/ShapeAnimation.js" />
/// <reference path="../Game/StepShapeAnimation.js" />


var SmallLuigi = (function (parent) {

    SmallLuigi.prototype = new SmallMario();
    SmallLuigi.prototype.constructor = SmallLuigi;

    function SmallLuigi(id, params) {

        this.keyWalkRight = 68;
        this.keyWalkLeft = 65;
        this.keyJump = 87;
        this.keyRun = 16;


        parent.call(this, id, params);

        this.color = "";
        this.name = "SmallLuigi";
        this.imagePath = "images/SmallLuigi";
        this.imageExtension = ".png";
        this.height = 40;
        this.width = 28;

    }

    

    return SmallLuigi;

})(SmallMario);

try {
    module.exports = {
        SmallLuigi: SmallLuigi
    }
}
catch (err) {

}


