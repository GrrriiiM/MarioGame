var Shape = (function (parent) {
	
	Shape.prototype = new Base();
	Shape.prototype.constructor = Shape;
	
	function Shape(id, params) {
		
		this.id = id;
		this.height = 50;
		this.width = 50;
		this.top = 10;
		this.left = 10;
		this.right = 0;
		this.bottom = 0;
		this.imagePath = "";
		this.imageName = "";
		this.imageExtension = "";
		this.imageBackGroundPath = "";
		this.imageBackGroundName = "";
		this.imageBackGroundExtension = "";
        this.imageHeight = 0;
		this.imageWidth = 0;
        this.repeatImage = false,
        this.extendImage = false,
		this.color = "blue"
		this.solid = true;
		this.impactTop = false;
		this.impactRight = false;
		this.impactBottom = false;
		this.impactLeft = false;
		this.animations = {};
		this.images = [];
		this.container = {};
		this.hasChangedVisualForm = true;
		this.hasChangedPosition = true;
		this.lastMovedFrameChangedVisualForm = 0;
		this.lastMovedFrameChangedPosition = 0;
		this.isRemoved = false;
		this.isOnScreen = true;
		this.zIndex = 0;

		this.onAddingKey = function (key) {
		};
		this.onAddedKey = function (key) {
		};
		this.onRemovingKey = function (key) {
		};
		this.onRemovedKey = function (key) {
		};
		this.onStartFrame = function () {
		};
		this.onEndFrame = function () {
		};

		
		parent.call(this, params);

		if (this.bottom) {
		    this.top = this.bottom - this.height;
		}
		
		if (this.right) {
		    this.left = this.right - this.width;
		}

		if (!this.imageHeight) {
		    this.imageHeight = this.height;
		}
		if (!this.imageWidth) {
		    this.imageWidth = this.width;
		}

	}

	Shape.prototype.getRight = function () {
	    return this.left + this.width;
	}

	Shape.prototype.setRight = function (value) {
	    this.left = value - this.width;
	}

	Shape.prototype.getOldRight = function () {
	    return this.oldLeft + this.width;
	}

	Shape.prototype.getBottom = function () {
	    return this.top + this.height;
	}

	Shape.prototype.setBottom = function (value) {
	    this.top = this.bottom - this.height;
	}

	Shape.prototype.getOldBottom = function () {
	    return this.oldTop + this.height;
	}
	
	Shape.prototype.remove = function () {
	    this.isRemoved = true;
	    Game.removeEventById(this.id);
	}

	return Shape;
	
})(Base);

try {
    module.exports = {
        Shape: Shape
    }
}
catch (err) {

}