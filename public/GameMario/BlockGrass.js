/// <reference path="Moveable.js" />
/// <reference path="Direction.js" />
/// <reference path="BlockType.js" />


var BlockGrass = (function (parent) {

    BlockGrass.prototype = new Block();
    BlockGrass.prototype.constructor = BlockGrass;

    function BlockGrass(id, params) {


        parent.call(this, id, params);

        this.name = "block_grass";
    }

    
    return BlockGrass;

})(Block);

try {
    module.exports = {
        BlockGrass: BlockGrass
    }
}
catch (err) {

}

