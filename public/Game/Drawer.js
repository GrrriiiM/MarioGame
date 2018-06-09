var Drawer = (function (parent) {
	
	Drawer.prototype = new Base();
	Drawer.prototype.constructor = Drawer;
	
	function Drawer(container, params) {
	    params = params || {};

	    this.container = container;
	    this.gamejQueryContainer = params.gamejQueryContainer;
		
		parent.call(this, params);
	
	};
	
	
	Drawer.prototype.drawContainer = function() {
	    this.defineContainerVisualPosition();
	    this.defineContainerVisualForm();
		
		return this;
	};
	
	Drawer.prototype.defineContainerVisualForm = function() {
		
		return this;
	};
	
	Drawer.prototype.defineContainerVisualPosition = function () {
	    //var position = this.gamejQueryContainer.position();
	    //this.container.visualTop = position.top;
	    //this.container.visualLeft = position.left;
		return this;
	};
	
	
	Drawer.prototype.drawShape = function (shape) {
	    if (shape.isRemoved) {
	        this.removeShapeVisualForm(shape);
	    }
	    else {
	        this.defineShapeVisualForm(shape);
	        this.defineShapeVisualPosition(shape);
	    }
		return this;
	};
	
	Drawer.prototype.defineShapeVisualForm = function(shape, container) {
	
		return this;
	};
	
	Drawer.prototype.defineShapeVisualPosition = function(shape) {
		shape.containerTop = shape.top + this.container.top;
		shape.containerLeft = shape.left + this.container.left;
		
		shape.visualTop = shape.containerTop - this.container.visualTop;
		shape.visualLeft = shape.containerLeft - this.container.visualLeft;
		
		return this;
	};

	Drawer.prototype.removeShapeVisualForm = function (shape, container) {

	    return this;
	};
	
	return Drawer;
	
})(Base);

try {
    module.exports = {
        Drawer: Drawer
    }
}
catch (err) {

}