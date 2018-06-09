var ContinuousMoveable = (function (parent) {
	
    ContinuousMoveable.prototype = new Moveable();
    ContinuousMoveable.prototype.constructor = ContinuousMoveable;
	
    function ContinuousMoveable(shape, params) {
		
        this.keys = [];
        this.distance = -1;
        this.endPosition = -1;
        this.isCanceled = false;
        this.isMoved = false;
        this.wasMoved = false;
		
		parent.call(this, shape, params);
		
	}
	
    ContinuousMoveable.prototype.validateKeys = function () {
        
        var ret = false;

        var keysPressed = Game.keys[this.shape.id] || {};

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


    ContinuousMoveable.prototype.move = function (framePerSecond) {
        this.wasMoved = this.isMoved;
        this.isMoved = false;
        if (this.keys.length > 0) {
            if (this.validateKeys()) {
                this.isMoved = true;
                parent.prototype.move.call(this, framePerSecond);
            }
        }
        else {
            this.isMoved = true;
            parent.prototype.move.call(this, framePerSecond);
        }
    }

    ContinuousMoveable.prototype.isFinished = function () {

        if (this.isCanceled) {
            return true;
        }

        if (this.distance >= 0) {
            if (this.direction == Direction.DOWN) {
                if ((this.shape.top - this.shapeOriginalTop) <= this.distance) {
                    return false;
                }
            }
            else if (this.direction == Direction.UP) {
                if ((this.shapeOriginalTop - this.shape.top) <= this.distance) {
                    return false;
                }
            }
            else if (this.direction == Direction.RIGHT) {
                if ((this.shapeOriginalLeft - this.shape.left) <= this.distance) {
                    return false;
                }
            }
            else if (this.direction == Direction.LEFT) {
                if ((this.shapeOriginalLeft - this.shape.left) <= this.distance) {
                    return false;
                }
            }
        }
        else if (this.endPosition >= 0) {
            if (this.direction == Direction.DOWN) {
                if (this.shape.top <= this.endPosition) {
                    return false;
                }
            }
            else if (this.direction == Direction.UP) {
                if (this.shape.top >= this.endPosition) {
                    return false;
                }
            }
            else if (this.direction == Direction.RIGHT) {
                if (this.shape.left <= this.endPosition) {
                    return false;
                }
            }
            else if (this.direction == Direction.LEFT) {
                if (this.shape.left >= this.endPosition) {
                    return false;
                }
            }
        }
        else {
            return false;
        }

        return true;
    }

    ContinuousMoveable.prototype.cancel = function () {
        this.isCanceled = true;
    }
	
    return ContinuousMoveable;
	
})(Moveable);

try {
    module.exports = {
        ContinuousMoveable: ContinuousMoveable
    }
}
catch (err) {

}