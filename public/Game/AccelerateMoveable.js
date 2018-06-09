var AccelerateMoveable = (function (parent) {
	
    AccelerateMoveable.prototype = new ContinuousMoveable();
    AccelerateMoveable.prototype.constructor = AccelerateMoveable;
	
    function AccelerateMoveable(shape, params) {
	
		this.endVelocity = 500;
		this.accelerate = 1000;
		
		parent.call(this, shape, params);
	
		this.startVelocity = this.velocity;

	}
	
    AccelerateMoveable.prototype.move = function(framePerSecond) {
		
        parent.prototype.move.call(this, framePerSecond);

        this.acceleratePerFrame = this.accelerate / framePerSecond;

        if (this.startVelocity < this.endVelocity) {
            this.velocity = this.velocity + this.acceleratePerFrame;
        }
        else {
            this.velocity = this.velocity - this.acceleratePerFrame;
        }
		
    }

    AccelerateMoveable.prototype.isFinished = function (framePerSecond) {

        var ret = parent.prototype.isFinished.call(this, framePerSecond);

        if (!ret) {
            if (this.startVelocity < this.endVelocity) {
                if (this.velocity >= this.endVelocity) {
                    ret = true;
                }
            }
            else {
                if (this.velocity <= this.endVelocity) {
                    ret = true;
                }
            }
        }

        return ret;

    }
	
    return AccelerateMoveable;
	
})(ContinuousMoveable);

try {
    module.exports = {
        AccelerateMoveable: AccelerateMoveable
    }
}
catch (err) {

}