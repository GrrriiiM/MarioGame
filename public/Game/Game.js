/// <reference path="MoveableShape.js" />
/// <reference path="ControlableShape.js" />

var Game = {
		
    framePerSecond: 60,
    height: 500,
    width: 500,
    scenario: {},
    keys: [],
    jQueryContainer: {},
    events: {},
    playersName: [],
    actualFrame: -1,
    speedVariant: 2
		
}
	
Game.start = function (params) {

    params = params || {};

    this.ioSocket = params.ioSocket;

    var obj = this;
	setTimeout(function() { 
	    obj.animate();
	}, 1000 / this.framePerSecond);
}
	
Game.animate = function () {

    

    this.actualFrame = this.actualFrame + 1;

	this.startFrame();

	    
	this.defineControlables();

	this.defineMoveables();

	this.defineAnimations();

	this.endFrame();

	var shapes = this.getShapes();

	for (var idShape in shapes) {
	    var shape = shapes[idShape];
	    if (shape.hasChangedVisualForm) {
	        shape.lastMovedFrameChangedVisualForm = this.actualFrame;
	        shape.hasChangedVisualForm = false;
	        //Game.printFrame("hasChangedVisualForm: " + shape.id + " " + shape.lastMovedFrameChangedVisualForm);
	    }
	    if (shape.hasChangedPosition) {
	        shape.lastMovedFrameChangedPosition = this.actualFrame;
	        shape.hasChangedPosition = false;
	        //Game.printFrame("hasChangedPosition: " + shape.id + " " + shape.lastMovedFrameChangedPosition);
	    }
	}

    var obj = this;


    setTimeout(function () {
	    obj.animate();
	}, 1000 / this.framePerSecond);

}

Game.printFrame = function (frameNumber) {

}

Game.defineControlables = function () {

	this.trigger("beforeDefineControlables");

	var shapes = this.getControlableShapes();

	for (var idShape in shapes) {
	    var shape = shapes[idShape];
	    shape.defineControlables(this.keys);
	}

	this.trigger("afterDefineControlables");
}

Game.defineMoveables = function () {

	this.trigger("beforeDefineMoveables");

	var shapes = this.getMoveableShapes();

	for (var shape in shapes) {
	    shapes[shape].move(this.framePerSecond);
	}

	this.trigger("afterDefineMoveables");

}

Game.defineAnimations = function ()
{
	this.trigger("beforeDefineAnimations");

	var shapes = this.getShapes();

	for (var idShape in shapes) {
	    var shape = shapes[idShape];
	    for (var idAnimation in shape.animations) {
	        var animation = shape.animations[idAnimation];
	        animation.doAnimation();
	    }
	}

	this.trigger("afterDefineAnimations");

}


Game.startFrame = function () {
	var shapes = this.getShapes();
	for (var idShape in shapes) {
	    if (shapes[idShape].onStartFrame) {
	        shapes[idShape].onStartFrame();
	    }
	}
}

Game.endFrame = function () {
	var shapes = this.getShapes();
	for (var idShape in shapes) {
	    if (shapes[idShape].onEndFrame) {
	        shapes[idShape].onEndFrame();
	    }
	}
}

Game.addKey = function (key, playerName) {
    if (!playerName) {
        for (var idPlayerName in this.playersName) {
            playerName = this.playersName[idPlayerName];
            this.keys[playerName] = this.keys[playerName] || {};
            this.keys[playerName][key] = true;
        }
    }
    else {
        this.keys[playerName] = this.keys[playerName] || {};
        this.keys[playerName][key] = true;
    }
}

Game.removeKey = function (key, playerName) {
    if (!playerName) {
        for (var idPlayerName in this.playersName) {
            playerName = this.playersName[idPlayerName];
            this.keys[playerName] = this.keys[playerName] || {};
            delete this.keys[playerName][key];
        }
    }
    else {
        delete this.keys[playerName][key];
    }
}

Game.getMoveableShapes = function () {

	var shapes = {};

	for (var layerId in this.scenario.layers) {
	    var layer = this.scenario.layers[layerId];
	    Util.extend(shapes, layer.getMoveableShapes());
	} 

	return shapes;
}

Game.getControlableShapes = function () {

	var shapes = {};

	for (var layerId in this.scenario.layers) {
	    var layer = this.scenario.layers[layerId];
	    Util.extend(shapes, layer.getControlableShapes());
	}

	return shapes;
}

Game.getShape = function (shapeId) {

	for (var layer in this.scenario.layers) {
	    var shape = this.scenario.layers[layer].shapes[shapeId];
	    if (shape) {
	        return shape;
	    }
	}
}

Game.getShapes = function (shapeId) {

	var shapes = {};

	for (var layerId in this.scenario.layers) {
	    var layer = this.scenario.layers[layerId];
	    Util.extend(shapes, layer.getShapes());
	}

	return shapes;
}

Game.on = function(eventName, event, obj, args) {
	var events = this.events[eventName];
	if (!events) {
	    this.events[eventName] = [];
	    events = this.events[eventName];
	}
	var item = {
        id: obj.id,
	    args: args,
        event: event
	};
	events.push(item);
}

Game.trigger = function (eventName) {
	var events = this.events[eventName];
	if (events) {
	    for (var idEvent in events) {
	        var event = events[idEvent];
	        event.event(this, event.id, event.args);
	    }
	}
}

Game.removeEventById = function (id) {
    for (var idEventName in this.events) {
        var events = this.events[idEventName];
        for (var idEvent in events) {
            var event = events[idEvent];
            if (event.id == id) {
                delete events[idEvent];
            }
        }
    }
}

Game.sync = function (params) {

    var game = this;

    if (game) {
        for (var idPlayerName in params.playersName) {
            var playerName = params.playersName[idPlayerName];

            for (var idKeyParams in params.keys) {
                var key = parseInt(idKeyParams.replace("_", ""));
                //Game.printFrame(playerName + " - " + key);
                game.addKey(key, playerName);
                //Game.printFrame(game.keys[playerName][key]);
            }
            var gameKeys = game.keys[playerName];
            for (var idGameKey in gameKeys) {
                var gameKey = gameKeys[idGameKey];
                if (params.keys) {
                    if (!("_" + idGameKey in params.keys)) {
                        game.removeKey(idGameKey, playerName);
                    }
                }
                else {
                    game.removeKey(idGameKey, playerName);
                }
            }
        }
    }

    var ret = {};
    ret.actualFrame = this.actualFrame;
    ret.layers = {};


    for (var idContainer in Game.scenario.layers) {
        var container = Game.scenario.layers[idContainer];
        var retContainer = {};
        retContainer.id = container.id;
        retContainer.visualTop = container.visualTop;
        retContainer.visualLeft = container.visualLeft;
        retContainer.top = container.top;
        retContainer.left = container.left;
        retContainer.width = container.width;
        retContainer.height = container.height;
        retContainer.paralax = [];

        for (var idParalax in container.paralax) {

            var paralax = container.paralax[idParalax];
            retContainer.paralax.push(paralax.id);

        }

        retContainer.shapes = {};

        for (var idShape in container.shapes) {

            var shape = container.shapes[idShape];

            if (shape.lastMovedFrameChangedPosition >= params.actualFrame || shape.lastMovedFrameChangedVisualForm >= params.actualFrame) {
                var retShape = {};
                retShape.id = shape.id;
                if (shape.lastMovedFrameChangedPosition >= params.actualFrame) {
                    retShape.hasChangedPosition = true;
                }
                if (shape.lastMovedFrameChangedVisualForm >= params.actualFrame) {
                    retShape.hasChangedVisualForm = true;
                }

                retShape.direction = shape.direction;
                retShape.top = shape.top;
                retShape.left = shape.left;
                retShape.width = shape.width;
                retShape.height = shape.height;
                retShape.zIndex = shape.zIndex;
                retShape.color = shape.color;
                retShape.imageBackGroundName = shape.imageBackGroundName;
                retShape.imageBackGroundPath = shape.imageBackGroundPath;
                retShape.imageBackGroundExtension = shape.imageBackGroundExtension;
                retShape.imagePath = shape.imagePath;
                retShape.imageName = shape.imageName;
                retShape.imageExtension = shape.imageExtension;
                retShape.images = [];
                for (var i = 0; i < shape.images.length; i++) {
                    var image = shape.images[i];
                    var retImage = {};
                    retImage.x = image.x;
                    retImage.y = image.y;
                    retImage.imagePath = image.imagePath;
                    retImage.imageName = image.imageName;
                    retImage.imageExtension = image.imageExtension;
                    retImage.height = image.height;
                    retImage.width = image.width;
                    retImage.top = image.top;
                    retImage.left = image.left;
                    retShape.images.push(retImage);
                }
                retShape.idContainer = retContainer.id;
                retContainer.shapes[retShape.id] = retShape;
            }
        }
        ret.layers[retContainer.id] = retContainer;
    }

    return ret;

}

Game.syncSocket = function () {

    var game = this;

    
    var ret = {};
    ret.actualFrame = this.actualFrame;
    ret.layers = {};


    for (var idContainer in Game.scenario.layers) {
        var container = Game.scenario.layers[idContainer];
        var retContainer = {};
        retContainer.id = container.id;
        retContainer.visualTop = container.visualTop;
        retContainer.visualLeft = container.visualLeft;
        retContainer.top = container.top;
        retContainer.left = container.left;
        retContainer.width = container.width;
        retContainer.height = container.height;
        retContainer.paralax = [];

        for (var idParalax in container.paralax) {

            var paralax = container.paralax[idParalax];
            retContainer.paralax.push(paralax.id);

        }

        retContainer.shapes = {};

        for (var idShape in container.shapes) {

            var shape = container.shapes[idShape];

            //if (shape.lastMovedFrameChangedPosition >= params.actualFrame || shape.lastMovedFrameChangedVisualForm >= params.actualFrame) {
            if (shape.hasChangedVisualForm || shape.hasChangedPosition) {

                var retShape = {};
                retShape.id = shape.id;
                retShape.hasChangedVisualForm = true;
                //shape.hasChangedVisualForm = false;
                retShape.direction = shape.direction;
                retShape.top = shape.top;
                retShape.left = shape.left;
                retShape.width = shape.width;
                retShape.height = shape.height;
                retShape.zIndex = shape.zIndex;
                retShape.color = shape.color;
                retShape.imageBackGroundName = shape.imageBackGroundName;
                retShape.imageBackGroundPath = shape.imageBackGroundPath;
                retShape.imageBackGroundExtension = shape.imageBackGroundExtension;
                retShape.imagePath = shape.imagePath;
                retShape.imageName = shape.imageName;
                retShape.imageExtension = shape.imageExtension;
                retShape.images = [];
                for (var i = 0; i < shape.images.length; i++) {
                    var image = shape.images[i];
                    var retImage = {};
                    retImage.x = image.x;
                    retImage.y = image.y;
                    retImage.imagePath = image.imagePath;
                    retImage.imageName = image.imageName;
                    retImage.imageExtension = image.imageExtension;
                    retImage.height = image.height;
                    retImage.width = image.width;
                    retImage.top = image.top;
                    retImage.left = image.left;
                    retShape.images.push(retImage);
                }
                retShape.idContainer = retContainer.id;
                retContainer.shapes[retShape.id] = retShape;
            }
        }
        ret.layers[retContainer.id] = retContainer;
    }

    return ret;

}



Game.config = function(params) {
    this.framePerSecond = params.framePerSecond || this.framePerSecond;
    this.height = params.height || this.height;
    this.width = params.width || this.width;
    this.jQueryContainer = params.jQueryContainer || this.jQueryContainer;
    this.playersName = params.playersName || this.playersName;
}

Game.test = function () {
    //return new Base("teste allison").id;
    return "Game OK!";
}




try
{
    module.exports = {
        Game: Game
    }
}
catch (err) {
    
}