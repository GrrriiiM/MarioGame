var Moveable = (function (parent) {
	
	Moveable.prototype = new Base();
	Moveable.prototype.constructor = Moveable;
	
	function Moveable(shape, params) {
		
	    this.id = "";
		this.direction = Direction.RIGHT;
		this.velocity = 50;
		this.distanceDone = 0;
		this.isColisionedTop = false;
		this.isColisionedBottom = false;
		this.isColisionedLeft = false;
		this.isColisionedRight = false;
		this.onFinished = this.onFinished || onFinished;
		
		parent.call(this, params);
		
		this.setShape(shape);

	}
	
	Moveable.prototype.move = function (framePerSecond) {


	    this.distancePerFrame = 0;

	    this.distancePerFrame = this.velocity / framePerSecond;


	    this.shape.oldLeft = this.shape.left;
	    this.shape.oldTop = this.shape.top;

	    switch (this.direction) {
	        case Direction.RIGHT:
	            this.shape.left = this.shape.left + this.distancePerFrame;
	            break;
	        case Direction.DOWN:
	            this.shape.top = this.shape.top + this.distancePerFrame;
	            break;
	        case Direction.LEFT:
	            this.shape.left = this.shape.left - this.distancePerFrame;
	            break;
	        case Direction.UP:
	            this.shape.top = this.shape.top - this.distancePerFrame;
	            break;
	    }

	    this.wasMoved = this.isMoved;

	    if (this.shape.oldLeft != this.shape.left || this.shape.oldTop != this.shape.top) {
	        this.shape.hasChangedPosition = true;
	    }

	}
	
	Moveable.prototype.isFinished = function () {
	    return true;
	}

	Moveable.prototype.setShape = function (shape) {
	    if (this.shape == undefined) {
	        if (shape instanceof Shape) {
	            this.shape = shape;
	            this.shapeOriginalTop = this.shape.top;
	            this.shapeOriginalLeft = this.shape.left;
	            this.shapeOriginalRight = this.shape.getRight();
	            this.shapeOriginalBottom = this.shape.getBottom();
	        }
	    }
	}

	var onFinished = function () {
	}

	return Moveable;
	
})(Base);

try {
    module.exports = {
        Moveable: Moveable
    }
}
catch (err) {

}