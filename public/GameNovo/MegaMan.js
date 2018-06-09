/// <reference path="../Game/ControlableShape.js" />
/// <reference path="Player.js" />
/// <reference path="../Game/ShapeAnimation.js" />
/// <reference path="../Game/StepShapeAnimation.js" />


var MegaMan = (function (parent) {

    MegaMan.prototype = new Person();
    MegaMan.prototype.constructor = MegaMan;

    function MegaMan(id, params) {


        parent.call(this, id, params);

        this.direction = Direction.LEFT;

        this.color = "";
        this.name = "MegaMan";
        this.imagePath = "images/MegaMan";
        this.imageExtension = ".png";
        
    }

    

    return MegaMan;

})(Person);

try {
    module.exports = {
        MegaMan: MegaMan
    }
}
catch (err) {

}


