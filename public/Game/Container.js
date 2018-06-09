var Container = (function (parent) {
	
	Container.prototype = new Base();
	Container.prototype.constructor = Container;
	
	function Container(id, params) {
		
		this.id = id;
		this.height = 500;
		this.width = 700;
		this.top = 0;
		this.left = 0;
		this.visualTop = 0;
		this.visualLeft = 0;
		this.shapes = [];
		this.paralax = [];
		this.imagePath = "";
		this.imageExtension = "";
		this.imageName = "";
	
		parent.call(this, params);
		
		if (this.drawer) { this.drawerFactory = this.drawer(); } else { this.drawerFactory = new CSSDrawer(this); };

		for (var idShape in this.shapes) {
		    this.shapes[idShape].container = this;
		}
		
	}
	
	Container.prototype.addShape = function(shape) {
		this.shapes.push(shape);
		
		return this;
		
	};
	
	Container.prototype.drawShapes = function() {
		


		for(var shape in this.shapes) {
		    this.drawShape(this.shapes[shape]);
		    if (this.shapes[shape].isRemoved) {
		        delete this.shapes[shape];
		    }
		}
		
		return this;
		
	};

	
	Container.prototype.drawShape = function(shape) {
		
		this.drawerFactory.drawShape(shape);
		
		return shape;
	}
	
	Container.prototype.drawContainer = function() {
		


		this.drawerFactory.drawContainer();
		
		return this;

	}

	Container.prototype.getShapes = function () {
	    var shapes = {};

	    for (var shapeId in this.shapes) {
	        var shape = this.shapes[shapeId];
	        shapes[shape.id] = shape;
	    }

	    return shapes;
	}

	Container.prototype.getMoveableShapes = function () {
	    var shapes = {};

	    for (var shapeId in this.shapes) {
	        var shape = this.shapes[shapeId];
	        if (shape instanceof MoveableShape) {
	            shapes[shape.id] = shape;
	        }
	    }

	    return shapes;
	}

	Container.prototype.getControlableShapes = function () {
	    var shapes = {};

	    for (var shapeId in this.shapes) {
	        var shape = this.shapes[shapeId];
	        if (shape instanceof ControlableShape) {
	            shapes[shape.id] = shape;
	        }
	    }

	    return shapes;
	}
	
	
	return Container;
	
})(Base);

try {
    module.exports = {
        Container: Container
    }
}
catch (err) {

}