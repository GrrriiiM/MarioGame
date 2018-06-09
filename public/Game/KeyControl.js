var KeyControl = (function (parent) {

    KeyControl.prototype = new Base();
    KeyControl.prototype.constructor = KeyControl;

    function KeyControl(params) {

        this.keys = [];
        this.target = {};

        parent.call(this, params);

    }



    //KeyControl.prototype.do = function (keysPressed, target) {
        
    //    if (this.validateKeys(keysPressed)) {
    //        if (this.onBeforeAction) {
    //            this.onBeforeAction(target);
    //        }

    //        if (this.action) {
    //            this.action(target);
    //        }

    //        if (this.onAfterAction) {
    //            this.onAfterAction(target);
    //        }
    //    }

    //}

    KeyControl.prototype.validateKeys = function (keys) {

        var ret = false;

        var keysPressed = keys;

        for (var idKey in this.keys) {
            var key = this.keys[idKey];
            if (key in keysPressed) {
                if (keysPressed[key]) {
                    ret = true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }

        return ret;

    }

    KeyControl.prototype.action = function (target) {



    }

    //KeyControl.prototype.onBeforeAction = function (target) {
    //}

    //KeyControl.prototype.onAfterAction = function (target) {
    //}

    return KeyControl;

})(Base);

try {
    module.exports = {
        KeyControl: KeyControl
    }
}
catch (err) {

}