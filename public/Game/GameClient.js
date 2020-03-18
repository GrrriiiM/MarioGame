var GameClient = {
    framePerSecond: 30,
    height: 500,
    width: 500,
    keys: {},
    jQueryContainer: {},
    playersName: [],
    actualFrame: -1,
    syncComplete: true,
    onLine: "0"
};



GameClient.start = function () {

    this.height = 450;
    this.width = 700;
    this.jQueryContainer = $("#game");
    this.jQueryContainer.css("height", GameClient.height = 450);
    this.jQueryContainer.css("width", GameClient.width);
    this.jQueryContainer.css("overflow", "hidden");
    this.printFrame = function (msg) {
        $("#logFrame").html( $("#logFrame").html().substring(0,100) + msg);
    };
    this.framePerSecond = 60;

    this.queryString = Util.getQueryString();
    this.playerName = GameClient.queryString.playername || "player1";
    this.onLine = GameClient.queryString.online || "0";

    

    if (GameClient.onLine == "0") {
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
            "player1": player1, 
            "player2": player2
        });
        Game.playersName.push("player1");
        Game.framePerSecond = 60;
        Game.height = 450;
        Game.width = 700;
        //Game.jQueryContainer = $("#game");
        //Game.printFrame = function (msg) {
        //    $("#logFrame").html(msg);
        //};

        Game.start();
    }
    else {
        
        this.ioSocket = io.connect('/');
        this.ioSocket.on('test', function (msg) {
            GameClient.printFrame(msg);
        });
        this.ioSocket.on('sync', function (data) {
            GameClient.actualFrame = data.actualFrame;
            GameClient.printFrame(GameClient.actualFrame);
            GameClient.syncServer(data);
            setTimeout(function () {
                GameClient.animate();
            }, 1000 / GameClient.framePerSecond);
        });
        this.ioSocket.emit("test");

        $.support.cors = true;
        $.ajaxSettings.xhr = function () {
            return new XMLHttpRequest;
        }

        $.ajax({
            url: "/remotegame/test",
            async: false,
            cache: false,
            success: function (a, b, c) {
                GameClient.printFrame(a);
            }

        });
    }

    this.animate();

}

GameClient.configServer = function (params) {
    Game.config({
        framePerSecond: this.framePerSecond,
        height: this.height,
        width: this.width,
        playersName: this.playersName
    });
};

GameClient.addKey = function (key) {
    this.keys["_" + key] = true;
    //this.ioSocket.emit("addKey", key, this.playerName);
}

GameClient.removeKey = function (key) {
    delete this.keys["_" + key];
    //this.ioSocket.emit("removeKey", key, this.playerName);
}

GameClient.animate = function () {

    if (this.keys._68) {
        var a = "";
    }

    var params = {
        keys: this.keys,
        actualFrame: this.actualFrame,
        playersName: [this.playerName]
    };

    if (this.actualFrame == -1) {
        params.syncAll = true;
    }

    var obj = this;

    if (GameClient.onLine == "2")
    {
        if (GameClient.syncComplete) {
            this.ioSocket.emit("sync", params);
        }
    }
    else if (GameClient.onLine == "1")
    {
        $.ajax({
            url: "/remotegame/sync",
            async: false,
            data: params,
            dataType: "json",
            cache: false,
            complete: function (a, b, c, d) {
                var r = "";
            },
            success: function (a, b, c) {
                obj.syncServer(a);
                setTimeout(function () {
                    obj.animate();
                }, 1000 / obj.framePerSecond);
            }

        });
    }
    else
    {
        var ret = Game.sync(params);
        obj.syncServer(ret);
        setTimeout(function () {
            obj.animate();
        }, 1000 / obj.framePerSecond);
    }


    var teste = "";

}

GameClient.syncServer = function (ret) {

    this.actualFrame = ret.actualFrame;

    this.syncComplete = false;

    for (var idLayer in ret.layers) {
        this.layers = this.layers || {};
        this.layers[idLayer] = this.layers[idLayer] || ret.layers[idLayer];
        var layer = ret.layers[idLayer];
        for (var idShape in layer.shapes) {

            var shape = layer.shapes[idShape];
            var shapeClient = this.layers[idLayer].shapes[idShape];

            if (shapeClient) {
                shape.jqueryElement = shapeClient.jqueryElement;
                shape.jqueryContainerElement = shapeClient.jqueryContainerElement;
            }

            this.layers[idLayer].shapes[idShape] = shape;

        }
    }

    if (this.layers) {
        var shapePlayer = this.layers.container.shapes[this.playerName];

        if (shapePlayer.id == this.playerName) {
            var margin = this.width / 2.5;

            var left = 0;

            if (shapePlayer.direction == Direction.LEFT) {
                left = shapePlayer.left;
            }
            else {
                left = (shapePlayer.left + shape.width) - 32;
            }

            var shapeContainer = this.layers[shapePlayer.idContainer];

            if (left > margin && left < (shapeContainer.width - this.width) + margin) {
                shapeContainer.visualLeft = left - margin;
                for (var idParalax in shapeContainer.paralax) {

                    var idContainerParalax = shapeContainer.paralax[idParalax];

                    var containerParalax = this.layers[idContainerParalax];

                    var i = containerParalax.width / shapeContainer.width;
                    containerParalax.visualLeft = shapeContainer.visualLeft * i;

                }

            }
        }
    }


    for (var idLayer in this.layers) {
        var layer = this.layers[idLayer];
        var drawer = new CSSDrawer(layer, { gamejQueryContainer: this.jQueryContainer });
        drawer.drawContainer();
        for (var idShape in layer.shapes) {
            var shape1 = layer.shapes[idShape];
            drawer.drawShape(shape1);
            shape1.oldImageName = shape1.imageName;
        }
    }

    this.syncComplete = true;

};