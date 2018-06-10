var path = require("path");
var fs = require("fs");
var lib = path.join(path.dirname(fs.realpathSync(__filename)), "/public/Game");
require(lib + "/Game.js").Game;
Direction = require(lib + "/Direction.js").Direction;
Base = require(lib + "/Base.js").Base;
Container = require(lib + "/Container.js").Container;
Drawer = require(lib + "/Drawer.js").Drawer
CSSDrawer = require(lib + "/CSSDrawer.js").CSSDrawer;
Shape = require(lib + "/Shape.js").Shape;
Scenario = require(lib + "/Scenario.js").Scenario;
Moveable = require(lib + "/Moveable.js").Moveable;
MoveableShape = require(lib + "/MoveableShape.js").MoveableShape;
ContinuousMoveable = require(lib + "/ContinuousMoveable.js").ContinuousMoveable;
KeyControl = require(lib + "/KeyControl.js").KeyControl;
ControlableShape = require(lib + "/ControlableShape.js").ControlableShape;
ShapeAnimation = require(lib + "/ShapeAnimation.js").ShapeAnimation;
StatusShapeAnimation = require(lib + "/StatusShapeAnimation.js").StatusShapeAnimation;
StepShapeAnimation = require(lib + "/StepShapeAnimation.js").StepShapeAnimation;
AccelerateMoveable = require(lib + "/AccelerateMoveable.js").AccelerateMoveable;
ShapeImage = require(lib + "/ShapeImage.js").ShapeImage;
Game = require(lib + "/Game.js").Game;
Util = require(lib + "/Util.js").Util;


lib = path.join(path.dirname(fs.realpathSync(__filename)), "/public/GameMario");

Player = require(lib + "/Player.js").Player;


ScenarioTest = require(lib + "/ScenarioTest.js").ScenarioTest;


SmallMario = require(lib + "/SmallMario.js").SmallMario;
SmallLuigi = require(lib + "/SmallLuigi.js").SmallLuigi;
TallMario = require(lib + "/TallMario.js").TallMario;

BlockType = require(lib + "/BlockType.js").BlockType;
Block = require(lib + "/Block.js").Block;
BlockGrass = require(lib + "/BlockGrass.js").BlockGrass;
Mushroom = require(lib + "/Mushroom.js").Mushroom;
Enemy = require(lib + "/Enemy.js").Enemy;
WalkTurtle = require(lib + "/WalkTurtle.js").WalkTurtle;
Interrogation = require(lib + "/Interrogation.js").Interrogation;
EmptyBlock = require(lib + "/EmptyBlock.js").EmptyBlock;
BlockCreator = require(lib + "/BlockCreator.js").BlockCreator;
PipeCreator = require(lib + "/PipeCreator.js").PipeCreator;
PipeColor = require(lib + "/PipeColor.js").PipeColor;
DecorationCreator = require(lib + "/DecorationCreator.js").DecorationCreator;
DecorationType = require(lib + "/DecorationType.js").DecorationType;
Scenario1 = require(lib + "/Scenario1.js").Scenario1;

