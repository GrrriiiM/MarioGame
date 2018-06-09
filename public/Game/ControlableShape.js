/// <reference path="MoveableShape.js" />


var ControlableShape = (function (parent) {

    ControlableShape.prototype = new MoveableShape();
    ControlableShape.prototype.constructor = ControlableShape;

    function ControlableShape(id, params) {

        this.keysControl = [];

        parent.call(this, id, params);

    }


    ControlableShape.prototype.defineControlables = function () {
        
        var keys = Game.keys[this.id] || {};

        for (var idKeyControl in this.keysControl) {
            var keyControl = this.keysControl[idKeyControl];
            if (keyControl.validateKeys(keys)) {
                keyControl.action(this);
            }

        }
    }


    return ControlableShape;

})(MoveableShape);

try {
    module.exports = {
        ControlableShape: ControlableShape
    }
}
catch (err) {

}