/// <reference path="DecorationCreator.js" />

var Scenario1 = (function (parent) {

    Scenario1.prototype = new Scenario();
    Scenario1.prototype.constructor = Scenario1;

    function Scenario1(players, params) {

        

        var blockSize = 32;
        var groundBlockTop = 450;
        var scenarioWidth = 350 * blockSize;

        params = params || {};

        var shapes = {};

        shapes["turtle1"] = new WalkTurtle("turtle1", {
            top: groundBlockTop - (7 * blockSize),
            left: 30 * blockSize,
            endPositionLeft: 25 * blockSize,
            endPositionRight: 49 * blockSize,
            direction: Direction.LEFT
        });

        shapes["turtle2"] = new WalkTurtle("turtle2", {
            top: groundBlockTop - (7 * blockSize),
            left: 32 * blockSize,
            endPositionLeft: 25 * blockSize,
            endPositionRight: 49 * blockSize,
            direction: Direction.LEFT
        });

        shapes["turtle3"] = new WalkTurtle("turtle3", {
            top: groundBlockTop - (7 * blockSize),
            left: 34 * blockSize,
            endPositionLeft: 25 * blockSize,
            endPositionRight: 49 * blockSize,
            direction: Direction.LEFT
        });

        shapes["turtle4"] = new WalkTurtle("turtle4", {
            top: groundBlockTop - (7 * blockSize),
            left: 36 * blockSize,
            endPositionLeft: 25 * blockSize,
            endPositionRight: 49 * blockSize,
            direction: Direction.LEFT
        });

        shapes["turtle5"] = new WalkTurtle("turtle5", {
            top: groundBlockTop - (7 * blockSize),
            left: 38 * blockSize,
            endPositionLeft: 25 * blockSize,
            endPositionRight: 49 * blockSize,
            direction: Direction.LEFT
        });

        shapes["turtle6"] = new WalkTurtle("turtle6", {
            top: groundBlockTop - (7 * blockSize),
            left: 40 * blockSize,
            endPositionLeft: 25 * blockSize,
            endPositionRight: 49 * blockSize,
            direction: Direction.LEFT
        });

        shapes["turtle7"] = new WalkTurtle("turtle7", {
            top: groundBlockTop - (7 * blockSize),
            left: 42 * blockSize,
            endPositionLeft: 25 * blockSize,
            endPositionRight: 49 * blockSize,
            direction: Direction.LEFT
        });

        shapes["turtle8"] = new WalkTurtle("turtle8", {
            top: groundBlockTop - (7 * blockSize),
            left: 44 * blockSize,
            endPositionLeft: 25 * blockSize,
            endPositionRight: 49 * blockSize,
            direction: Direction.LEFT
        });

        shapes["turtle9"] = new WalkTurtle("turtle9", {
            top: groundBlockTop - (7 * blockSize),
            left: 46 * blockSize,
            endPositionLeft: 25 * blockSize,
            endPositionRight: 49 * blockSize,
            direction: Direction.LEFT
        });

        shapes["turtle10"] = new WalkTurtle("turtle10", {
            top: groundBlockTop - (7 * blockSize),
            left: 48 * blockSize,
            endPositionLeft: 25 * blockSize,
            endPositionRight: 49 * blockSize,
            direction: Direction.LEFT
        });

        Util.extend(shapes, BlockCreator.create("ground2", {
            borderTop: true,
            blocksWidth: 25,
            blocksHeight: 3,
            impactTop: true,
            bottom: groundBlockTop - (2 * blockSize),
            left: 25 * blockSize
        }));

        Util.extend(shapes, BlockCreator.create("ground3", {
            borderTop: true,
            blocksWidth: 10,
            blocksHeight: 3,
            impactTop: true,
            bottom: groundBlockTop - (2 * blockSize),
            left: 59 * blockSize
        }));


        Util.extend(shapes, PipeCreator.createSequence("pipe", [
            { pipeColor: PipeColor.YELLOW, blocksSize: 2, bottom: groundBlockTop - (2 * blockSize), left: 182 * blockSize },
            { pipeColor: PipeColor.YELLOW, blocksSize: 3, bottom: groundBlockTop - (2 * blockSize), left: 184 * blockSize },
            { pipeColor: PipeColor.BLUE, blocksSize: 1, bottom: groundBlockTop - (2 * blockSize), left: 272 * blockSize },
            { pipeColor: PipeColor.BLUE, blocksSize: 2, bottom: groundBlockTop - (2 * blockSize), left: 283 * blockSize },
            { pipeColor: PipeColor.GRAY, blocksSize: 1, bottom: groundBlockTop - (2 * blockSize), left: 301 * blockSize },
            { pipeColor: PipeColor.GREEN, blocksSize: 2, bottom: groundBlockTop - (2 * blockSize), left: 304 * blockSize },
        ]));

        Util.extend(shapes, BlockCreator.create("ground4", {
            borderTop: true,
            blocksWidth: 11,
            blocksHeight: 6,
            impactTop: true,
            bottom: groundBlockTop - (2 * blockSize),
            left: 208 * blockSize
        }));

        Util.extend(shapes, BlockCreator.create("ground5", {
            borderTop: true,
            blocksWidth: 7,
            blocksHeight: 3,
            impactTop: true,
            bottom: groundBlockTop - (2 * blockSize),
            left: 205 * blockSize
        }));

        Util.extend(shapes, BlockCreator.create("ground6", {
            borderTop: true,
            blocksWidth: 9,
            blocksHeight: 3,
            impactTop: true,
            bottom: groundBlockTop - (2 * blockSize),
            left: 216 * blockSize
        }));

        Util.extend(shapes, BlockCreator.create("ground7", {
            borderTop: true,
            blocksWidth: 12,
            blocksHeight: 5,
            impactTop: true,
            bottom: groundBlockTop - (2 * blockSize),
            left: 237 * blockSize
        }));



       

        Util.extend(shapes, DecorationCreator.createSequence("decoration", [
            { decorationType: DecorationType.BIG_GRASS_1, bottom: groundBlockTop - (2 * blockSize), left: 4 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_2, bottom: groundBlockTop - (2 * blockSize), left: 13 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_1, bottom: groundBlockTop - (2 * blockSize), left: 85 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_2, bottom: groundBlockTop - (2 * blockSize), left: 78 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_2, bottom: groundBlockTop - (2 * blockSize), left: 107 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_2, bottom: groundBlockTop - (2 * blockSize), left: 101 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_1, bottom: groundBlockTop - (2 * blockSize), left: 97 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_1, bottom: groundBlockTop - (2 * blockSize), left: 124 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_2, bottom: groundBlockTop - (6 * blockSize), left: 148 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_1, bottom: groundBlockTop - (6 * blockSize), left: 144 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_2, bottom: groundBlockTop - (2 * blockSize), left: 162 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_1, bottom: groundBlockTop - (2 * blockSize), left: 197 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_1, bottom: groundBlockTop - (2 * blockSize), left: 230 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_2, bottom: groundBlockTop - (2 * blockSize), left: 263 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_1, bottom: groundBlockTop - (2 * blockSize), left: 259 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_2, bottom: groundBlockTop - (2 * blockSize), left: 274 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_2, bottom: groundBlockTop - (2 * blockSize), left: 291 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_1, bottom: groundBlockTop - (2 * blockSize), left: 287 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_1, bottom: groundBlockTop - (2 * blockSize), left: 324 * blockSize },
            { decorationType: DecorationType.BIG_GRASS_2, bottom: groundBlockTop - (2 * blockSize), left: 340 * blockSize },
            { decorationType: DecorationType.SMALL_GRASS_1, bottom: groundBlockTop - (2 * blockSize), left: 56 * blockSize },
            { decorationType: DecorationType.SMALL_GRASS_2, bottom: groundBlockTop - (2 * blockSize), left: 92 * blockSize },
            { decorationType: DecorationType.SMALL_GRASS_1, bottom: groundBlockTop - (3 * blockSize), left: 132 * blockSize },
            { decorationType: DecorationType.SMALL_GRASS_2, bottom: groundBlockTop - (2 * blockSize), left: 308 * blockSize },
            { decorationType: DecorationType.SMALL_GRASS_1, bottom: groundBlockTop - (2 * blockSize), left: 319 * blockSize }
        ]));



        Util.extend(shapes, BlockCreator.createContinuousWidth("ground1", {
            borderTop: true,
            borderLeft: true,
            borderRight: true,
            impactTop: true,
            impactLeft: true,
            impactRight: true,
            top: groundBlockTop,
            left: 0
        },
            [[131, 2], [5, 3], [4, 4], [3, 5], [15, 6], [86, 2], [12, 4]]
        ));

        Util.extend(shapes, BlockCreator.createContinuousWidth("ground8", {
            borderTop: true,
            borderLeft: true,
            borderRight: true,
            impactTop: true,
            impactLeft: true,
            impactRight: true,
            top: groundBlockTop,
            left: 259 * blockSize
        },
            [[100, 2]]
        ));

        shapes["wallLeft"] = new Shape("wallLeft", {
            top: 0,
            left: -10,
            height: Game.height,
            width: 10,
            color: "",
            impactLeft: true,
            impactRight: true,
            impactTop: true,
            impactBottom: true
        });

        

        
        shapes["wallRight"] = new Shape("wallRight", {
            top: 0,
            left: scenarioWidth,
            height: Game.height,
            width: 10,
            color: "",
            impactLeft: true,
            impactRight: true,
            impactTop: true,
            impactBottom: true
        });


        Util.extend(shapes, players);

        
        //shapes["mushroom"] = new Mushroom("mushroom1", {
        //    top: 10,
        //    left: 30 * 32
        //});

        shapes["interrogation1"] = new Interrogation("interrogation1", {
            top: groundBlockTop - (5 * blockSize),
            left: 53 * blockSize
        });

        shapes["interrogation2"] = new Interrogation("interrogation2", {
            top: groundBlockTop - (5 * blockSize),
            left: 54 * blockSize,
            raisedShape: new Mushroom("interrogation2_mushroom"),
            afterRaisedShape: function (shape) {
                shape.moveables["moveright"] = new ContinuousMoveable(shape, {
                    id: "raise",
                    distance: 1000,
                    velocity: 100,
                    direction: Direction.RIGHT,

                });
            }
        });

        shapes["interrogation3"] = new Interrogation("interrogation3", {
            top: groundBlockTop - (5 * blockSize),
            left: 55 * blockSize
        });

        var layers = {};

        var background1 = new Container("background1", {
            top: 0,
            left: 0,
            height: Game.height,
            width: scenarioWidth / 4,
            imagePath: "images",
            imageExtension: ".png",
            imageName: "background_grass",
            paralaxTo: container,
            shapes: {
                "teste": new Shape("teste", {
                    bottom: Game.height,
                    left: 0,
                    height: 864,
                    color: "",
                    width: scenarioWidth / 4 + (Game.width * 2),
                    imageBackGroundPath: "images",
                    imageBackGroundExtension: ".png",
                    imageBackGroundName: "background_grass",
                })}
        });

        var container = new Container("container", {
            top: 0,
            left: 0,
            height: Game.height,
            width: scenarioWidth,
            shapes: shapes,
            paralax: [ background1 ]
        });

        layers[background1.id] = background1;
        layers[container.id] = container;



        params.layers = layers;

        parent.call(this, "scenario1", params);


    }

    




    return Scenario1;

})(Scenario);

try {
    module.exports = {
        Scenario1: Scenario1
    }
}
catch (err) {

}