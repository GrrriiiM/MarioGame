
var ScenarioTest = (function (parent) {

    ScenarioTest.prototype = new Scenario();
    ScenarioTest.prototype.constructor = ScenarioTest;

    function ScenarioTest(players, params) {

        params = params || {};
        var shapes = {};

        Util.extend(shapes, BlockCreator.create("test1", {
            borderTop: true,
            blocksWidth: 5,
            blocksHeight: 10,
            impactTop: true,
            top: 100,
            left: 100
        }));

        Util.extend(shapes, BlockCreator.create("test2", {
            borderTop: true,
            borderLeft: true,
            borderBottom: true,
            borderRight: true,
            blocksWidth: 5,
            blocksHeight: 3,
            impactTop: true,
            impactLeft: true,
            impactRight: true,
            impactBottom: true,
            top: 200,
            left: 150
        }));

        Util.extend(shapes, BlockCreator.create("test3", {
            borderTop: true,
            blocksWidth: 5,
            blocksHeight: 5,
            impactTop: true,
            top: 300,
            left: 300
        }));

        Util.extend(shapes, BlockCreator.create("test4", {
            borderTop: true,
            blocksWidth: 50,
            blocksHeight: 3,
            impactTop: true,
            top: 400,
            left: -40
        }));

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
            left: 1000,
            height: Game.height,
            width: 10,
            color: "",
            impactLeft: true,
            impactRight: true,
            impactTop: true,
            impactBottom: true
        });



        shapes["mushroom1"] = new Mushroom("mushroom1", {
            top: 10,
            left: 200
        });

        Util.extend(shapes, players);

        var container = new Container("container", {
            top: 0,
            left: 0,
            height: Game.height,
            width: 1000,
            shapes: shapes
        });

        

        var layers = {};
        layers[container.id] = container;


        params.layers = layers;

        parent.call(this,"test", params);


    }

    Scenario.prototype.draw = function () {
        for (var layer in this.layers) {
            this.layers[layer].drawContainer();
            this.layers[layer].drawShapes();
        }
    }




    return ScenarioTest;

})(Scenario);

try {
    module.exports = {
        ScenarioTest: ScenarioTest
    }
}
catch (err) {

}