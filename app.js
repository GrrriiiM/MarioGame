var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require("socket.io").listen(server);
var reference = require(__dirname + "/references.js");

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/GameMario.html'));
});


io.sockets.on('connection', function (socket) {
    console.log("Connected Socket!");
    socket.on('test', function (data) {
        console.log("Starting Test Socket!");
        socket.emit('test', "Test Socket OK!" + Game.actualFrame);
        console.log("Test Socket OK!");
    });
    socket.on("sync", function (params) {
        Game.printFrame("starting frame: " + Game.actualFrame);
        socket.emit("sync", Game.sync(params));
        Game.printFrame("animate frame: " + Game.actualFrame + " OK!");
    });
    
});


app.get("/remotegame/sync", function (request, response) {

    var params = request.query;

    var send = Game.sync(params);

    response.send(send);

});

app.get("/remotegame/test", function (request, response) {

    console.log("Starting Test AJAX!");
    response.send("Test AJAX OK!");
    console.log("Test AJAX OK!");

});



console.log(Direction.test());
console.log(new Base().test());
console.log(new Container().test());
console.log(new Drawer().test());
console.log(new CSSDrawer().test());
console.log(new Shape().test());
console.log(new Scenario().test());
console.log(new Moveable().test());
console.log(new MoveableShape().test());
console.log(new ContinuousMoveable().test());
console.log(new KeyControl().test());
console.log(new ControlableShape().test());
console.log(new ShapeAnimation().test());
console.log(StatusShapeAnimation.test());
console.log(new StepShapeAnimation().test());
console.log(new AccelerateMoveable().test());
console.log(new ShapeImage().test());
console.log(Game.test());
console.log(Util.test());


console.log(new Player().test());
console.log(new ScenarioTest().test());
console.log(new SmallMario().test());
console.log(new SmallLuigi().test());
console.log(new TallMario().test());
console.log(BlockType.test());
console.log(new Block().test());
console.log(new BlockGrass().test());
console.log(new Mushroom().test());
console.log(new Enemy().test());
console.log(new WalkTurtle().test());
console.log(new Interrogation().test());
console.log(new EmptyBlock().test());
console.log(BlockCreator.test());
console.log(PipeCreator.test());
console.log(PipeColor.test());
console.log(DecorationCreator.test());
console.log(DecorationType.test());
console.log(new Scenario1().test());

Game.printFrame = function (msg) {
    console.log(msg);
};


var player1 = new SmallMario("player1", {
    top: 10,
    left: 1 * 32,
    direction: Direction.RIGHT,
    keyWalkRight: 68,
    keyWalkLeft: 65,
    keyJump: 87,
    keyRun: 16
});


var player2 = new SmallLuigi("player2", {
    top: 10,
    left: 50 * 32,
    direction: Direction.LEFT,
    //keyWalkRight: 75,
    //keyWalkLeft: 72,
    //keyJump: 85,
    //keyRun: 76
    keyWalkRight: 68,
    keyWalkLeft: 65,
    keyJump: 87,
    keyRun: 16
});



Game.scenario = new Scenario1({
    "player1": player1
    , "player2": player2
});
Game.playersName.push("player1");
Game.framePerSecond = 60;
Game.height = 450;
Game.width = 700;
//Game.jQueryContainer = $("#game");
//Game.printFrame = function (msg) {
//    $("#logFrame").html(msg);
//};

Game.start({ ioSocket: io });

module.exports =  { app: app, server: server };

