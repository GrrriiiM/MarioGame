/// <reference path="Moveable.js" />
/// <reference path="Direction.js" />
/// <reference path="BlockType.js" />


var Block = (function (parent) {

    Block.prototype = new Shape();
    Block.prototype.constructor = Block;

    function Block(id, params) {

        this.blockType = BlockType.MIDDLE;

        parent.call(this, id, params);

        this.name = "block";
        this.imagePath = "images";
        this.imageExtension = ".png";
        this.color = "";


    }

    return Block;

})(Shape);

try {
    module.exports = {
        Block: Block
    }
}
catch (err) {

}

