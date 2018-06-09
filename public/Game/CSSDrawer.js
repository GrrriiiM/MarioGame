var CSSDrawer = (function (parent) {
	
	CSSDrawer.prototype = new Drawer();
	CSSDrawer.prototype.constructor = CSSDrawer;
	
	function CSSDrawer(container, params) {
		

		parent.call(this, container , params);
	
	}

	CSSDrawer.prototype.defineContainerVisualForm = function() {
		
		parent.prototype.defineContainerVisualForm.call(this);
		
		var jqueryContainer = getJQueryContainer(this.container, this.gamejQueryContainer);

		//jqueryContainer.css("position", "absolute");

	    //jqueryContainer.css("background-color", "rgb(255, 127, 39)");

		//jqueryContainer.css("background-color", "green");
		
		return this;
	};

	CSSDrawer.prototype.defineContainerVisualPosition = function() {
		
		parent.prototype.defineContainerVisualPosition.call(this);
		
		var jqueryContainer = getJQueryContainer(this.container, this.gamejQueryContainer);
		
		//jqueryContainer.css("top", this.container.visualTop);
		//jqueryContainer.css("left", this.container.visualLeft);
		//jqueryContainer.css("left", "10px");

		//jqueryContainer.css("width", this.container.width);
		//jqueryContainer.css("height", this.container.height);
	
		//Game.printFrame(parseFloat(this.container.visualLeft.toFixed(2)).toString() + " - " + jqueryContainer.css("left").toString());

		return this;
	};

	
	CSSDrawer.prototype.defineShapeVisualForm = function (shape) {
	    if (shape.hasChangedVisualForm) {

	        shape.hasChangedVisualForm = false;
	        //shape.lastMovedFrame = Game.actualFrame;


	        parent.prototype.defineShapeVisualForm.call(this, shape);


	        var jqueryContainer = shape.jqueryContainerElement;
	        if (!jqueryContainer) {
	            jqueryContainer = getJQueryContainer(this.container, this.gamejQueryContainer);
	            shape.jqueryContainerElement = jqueryContainer;
	        }

	        var jqueryShape = shape.jqueryElement;
	        if (!jqueryShape) {
	            jqueryShape = getJQueryShape(shape, jqueryContainer, this.gamejQueryContainer);
	            shape.jqueryElement = jqueryShape;
	        }


	        jqueryShape.css("width", shape.width);
	        jqueryShape.css("height", shape.height);
	        jqueryShape.css("z-index", shape.zIndex);
	        if (shape.zIndex > 0) {
	            var teste = "";
	        }


	        if (shape.color) {
	            jqueryShape.css("background-color", shape.color);
	        }
	        else {
	            jqueryShape.css("background-color", "");
	            if (shape.imageBackGroundName) {
	                jqueryShape.css("background-image", "url(" + shape.imageBackGroundPath + "/" + shape.imageBackGroundName + shape.imageBackGroundExtension + ")");
	                jqueryShape.css("background-repeat", "repeat");
	            }
	        }



	        if (shape.imageName) {
	            var jqueryShapeImage = getJQueryShapeImage(shape, jqueryShape);
	            jqueryShapeImage.attr("src", shape.imagePath + "/" + shape.imageName + shape.imageExtension);
	            jqueryShapeImage.css("height", "100%");
	            jqueryShapeImage.css("width", "100%");
	        }
	        else if (shape.images && shape.images.length > 0) {
	            for (var i = 0; i < shape.images.length; i++) {
	                var image = shape.images[i];
	                var jqueryShapeImage = getJQueryShapeImage(shape, jqueryShape, image.x, image.y);
	                jqueryShapeImage.attr("src", image.imagePath + "/" + image.imageName + image.imageExtension);
	                jqueryShapeImage.css("position", "absolute");
	                jqueryShapeImage.css("height", image.height);
	                jqueryShapeImage.css("width", image.width);
	                jqueryShapeImage.css("top", image.top);
	                jqueryShapeImage.css("left", image.left);
	            }
	        }
	        else {
	        }
	    }


	    return this;
	};

	CSSDrawer.prototype.defineShapeVisualPosition = function (shape) {
	    parent.prototype.defineShapeVisualPosition.call(this, shape);

	    var jqueryContainer = shape.jqueryContainerElement;
	    if (!jqueryContainer) {
	        jqueryContainer = getJQueryContainer(this.container, this.gamejQueryContainer);
	    }

	    var jqueryShape = shape.jqueryElement;
	    if (!jqueryShape) {
	        jqueryShape = getJQueryShape(shape, jqueryContainer, this.gamejQueryContainer);
	    }

	    jqueryShape.css("top", shape.visualTop);
	    jqueryShape.css("left", shape.visualLeft);
	    return this;
	};
	
	Drawer.prototype.removeShapeVisualForm = function (shape, container) {

	    //parent.prototype.removeShapeVisualForm.call(this, shape);

	    var jqueryContainer = getJQueryContainer(this.container, this.gamejQueryContainer);

	    var jqueryShape = getJQueryShape(shape, jqueryContainer, this.gamejQueryContainer);

	    jqueryShape.remove();

	    return this;
	};
	
	var getJQueryContainer = function (container, gamejQueryContainer) {
		
		if (this.jqueryContainer == undefined || this.jqueryContainer.length == 0) {
		    this.jqueryContainer = createJQueryContainer(container, gamejQueryContainer);
		}
		
		return this.jqueryContainer;
	};
	
	var createJQueryContainer = function (container, gamejQueryContainer) {
		
		var jqueryContainer = $("<div>");
	
		jqueryContainer.attr("id", container.id);
		
		jqueryContainer.css("position", "absolute");

		jqueryContainer.css("float", "left");

		jqueryContainer.css("overflow", "hidden");

		jqueryContainer.css("height", gamejQueryContainer.css("height"));

		jqueryContainer.css("width", gamejQueryContainer.css("width"));

		if (!gamejQueryContainer) {
		    Game.jQueryContainer.append(jqueryContainer);
		}
		else {
		    gamejQueryContainer.append(jqueryContainer);
		}

		return jqueryContainer;
	};
	
	var getJQueryGameContainer= function () {

	    var jqueryScenario = $("#" + Game.containerId)

	    return jqueryScenario;
	};

	var getJQueryShape = function(shape, jqueryContainer) {
		
	    var jqueryShape = jqueryContainer.find("#" + shape.id)
		
		if (jqueryShape.length == 0) {
			jqueryShape = createJQueryShape(shape, jqueryContainer);
		}
		
		return jqueryShape;
	};
	
	var createJQueryShape = function(shape, jqueryContainer) {
		
		var jqueryShape = $("<div>");
		
		jqueryShape.attr("id", shape.id);

		jqueryShape.css("overflow", "hidden");
		jqueryShape.css("position", "absolute");
		


		jqueryContainer.append(jqueryShape);



		
		return jqueryShape;
	};

	var getJQueryShapeImage = function (shape, jqueryShape, x, y) {

	    var jqueryShapeImage;

	    if (x != undefined && y != undefined)
	    {
	        jqueryShapeImage = jqueryShape.find("#img_" + shape.id + "_" + x + "_" + y);
	    }
	    else
	    {
	        jqueryShapeImage = jqueryShape.find("#img_" + shape.id);
	    }

	    if (jqueryShapeImage.length == 0) {
	        jqueryShapeImage = createJQueryShapeImage(shape, jqueryShape, x, y);
	    }

	    return jqueryShapeImage;
	};

	var createJQueryShapeImage = function (shape, jqueryShape, x, y) {

	    var jqueryShapeImage = $("<img>");

	    if (x != undefined && y != undefined)
	    {
	        jqueryShapeImage.attr("id", "img_" + shape.id + "_" + x + "_" + y);
	    }
	    else
	    {
	        jqueryShapeImage.attr("id", "img_" + shape.id);
	    }

	    jqueryShape.append(jqueryShapeImage);

	    return jqueryShapeImage;
	};
	
	return CSSDrawer;
	
})(Drawer);

try {
    module.exports = {
        CSSDrawer: CSSDrawer
    }
}
catch (err) {

}