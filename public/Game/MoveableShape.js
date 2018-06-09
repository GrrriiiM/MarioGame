/// <reference path="Moveable.js" />
/// <reference path="Direction.js" />


var MoveableShape = (function (parent) {
	
	MoveableShape.prototype = new Shape();
	MoveableShape.prototype.constructor = MoveableShape;
	
	function MoveableShape(id, params) {
		
	    this.moveables = {};
	    this.onColisioning = this.onColisioning || onColisioning;
	    this.onColisioned = this.onColisioned || onColisioned;
	    this.onFinished = this.onFinished || onFinished;
	    this.onFinishing = this.onFinishing || onFinishing;
		
		parent.call(this, id, params);
		
	}
	

	MoveableShape.prototype.move = function (framePerSecond) {

	    var tempMoveables = this.moveables;

	    for (var idMoveable in this.moveables) {

	        var moveable = this.moveables[idMoveable];

	        moveable.shape = this;

	        if (moveable instanceof Moveable) {

	            this.onMoving(moveable);
	            moveable.move(framePerSecond);
	            this.onMoved(moveable);

	            if (this.verifyColision(moveable, true)) {
	                moveable.isColisioned = true;
	            }
	            else {
	                moveable.isColisioned = false;
	            }

	            

	            if (moveable.isFinished()) {
	                if (moveable.onFinishing) {
	                    moveable.onFinishing();
	                }

	                delete tempMoveables[idMoveable];

	                if (moveable.onFinished) {
	                    moveable.onFinished();
	                }

	            }
	        }

	    }

	    this.moveables = tempMoveables;

	    return this;
	}

	MoveableShape.prototype.onMoving = function (moveable) {
	}

	MoveableShape.prototype.onMoved = function (moveable) {
	}

	var onColisioning = function (moveable, shape) {
	    return true;
	}

	var onColisioned = function (moveable, shape) {
	}

	var onFinishing = function (moveable) {
	}

	var onFinished = function (moveable) {
	}

	MoveableShape.prototype.verifyColisionUp = function (shape, moveable, adjustPosition) {
	    if (shape.impactBottom) {
	        if (this.verifyColisionH(shape)) {
	            if (this.verifyImpactBottom(shape)) {
	                adjustPosition = this.onColisioning(moveable, shape);
	                if (adjustPosition) {
	                    this.top = shape.getBottom();
	                    this.onColisioned(moveable, shape);
	                }
	                
	                return true;
	            }
	        }
	    }
	    return false;
	}

	MoveableShape.prototype.verifyColisionDown = function (shape, moveable, adjustPosition) {
	    if (shape.impactTop) {
	        if (this.verifyColisionH(shape)) {
	            if (this.verifyImpactTop(shape)) {
	                adjustPosition = this.onColisioning(moveable, shape);
	                if (adjustPosition) {
	                    this.top = (shape.top - this.height);
	                    this.onColisioned(moveable, shape);
	                }
	                
	                return true;
	            }
	        }
	    }
	    return false;
	}

	MoveableShape.prototype.verifyColisionRight = function (shape, moveable, adjustPosition) {
	    if (shape.impactLeft) {
	        if (this.verifyColisionV(shape)) {
	            if (this.verifyImpactLeft(shape)) {
	                adjustPosition = this.onColisioning(moveable, shape);
	                if (adjustPosition) {
	                    this.left = (shape.left - this.width);
	                    this.onColisioned(moveable, shape);
	                }
	                
	                return true;
	            }
	        }
	    }
	    return false;
	}

	MoveableShape.prototype.verifyColisionLeft = function (shape, moveable, adjustPosition) {
	    if (shape.impactRight) {
	        if (this.verifyColisionV(shape)) {
	            if (this.verifyImpactRight(shape)) {
	                adjustPosition = this.onColisioning(moveable, shape);
	                if (adjustPosition) {
	                    this.left = shape.getRight();
	                    this.onColisioned(moveable, shape);
	                }
	                
	                return true;
	            }
	        }
	    }
	    return false;
	}

	MoveableShape.prototype.verifyColision = function (moveable, adjustPosition) {

	    var isColisioned = false;

	    if (this.solid) {

	        if (this.container) {

	            for (var idShape in this.container.shapes) {

	                

	                if (idShape != this.id) {

	                    var shape = this.container.shapes[idShape];

	                    if (moveable.direction == Direction.DOWN) {
	                        if (this.verifyColisionDown(shape, moveable, adjustPosition)) {
	                            isColisioned = true;;
	                        }
	                    }
	                    else if (moveable.direction == Direction.UP) {
	                        if (this.verifyColisionUp(shape, moveable, adjustPosition)) {
	                            isColisioned = true;;
	                        }
	                    }
	                    else if (moveable.direction == Direction.RIGHT) {
	                        if (idShape == "shape6") {
	                            var a = "";
	                        }
	                        if (this.verifyColisionRight(shape, moveable, adjustPosition)) {
	                            isColisioned = true;
	                        }
	                    }
	                    else if (moveable.direction == Direction.LEFT) {
	                        if (this.verifyColisionLeft(shape, moveable, adjustPosition)) {
	                            isColisioned = true;;
	                        }
	                    }
	                }
	            }
	        }
	    }

	    return isColisioned;
	}

	MoveableShape.prototype.verifyColisionH = function (shape) {
	    if (this.left < shape.left) {
	        if (this.getRight() > shape.left) {
	            return true;
	        }
	    }
	    else {
	        if (this.left < shape.getRight()) {
	            return true;
	        }
	    }

	    return false;
	}

	MoveableShape.prototype.verifyColisionV = function (shape) {
	    if (this.top < shape.top) {
	        if (this.getBottom() > shape.top) {
	            return true;
	        }
	    }
	    else {
	        if (this.top < shape.getBottom()) {
	            return true;
	        }
	    }

	    return false;
	}

	MoveableShape.prototype.verifyImpactTop = function (shape) {
	    if (this.getOldBottom() <= shape.top) {
	        if (this.getBottom() > shape.top) {
	            return true;
	        }
	    }

	    return false;
	}

	MoveableShape.prototype.verifyImpactBottom = function (shape) {
	    if (this.oldTop >= shape.getBottom()) {
	        if (this.top < shape.getBottom()) {
	            return true;
	        }
	    }

	    return false;
	}

	MoveableShape.prototype.verifyImpactLeft = function (shape) {
	    if (this.getOldRight() <= shape.left) {
	        if (this.getRight() >= shape.left) {
	            return true;
	        }
	    }

	    return false;
	}

	MoveableShape.prototype.verifyImpactRight = function (shape) {
	    if (this.oldLeft >= shape.getRight()) {
	        if (this.left <= shape.getRight()) {
	            return true;
	        }
	    }

	    return false;
	}
	
	return MoveableShape;
	
})(Shape);

try {
    module.exports = {
        MoveableShape: MoveableShape
    }
}
catch (err) {

}