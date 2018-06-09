/// <reference path="Moveable.js" />
/// <reference path="Direction.js" />
/// <reference path="BlockType.js" />


var EmptyBlock = (function (parent) {

    EmptyBlock.prototype = new MoveableShape();
    EmptyBlock.prototype.constructor = EmptyBlock;

    function EmptyBlock(id, params) {

        params = params || {};

        params.solid = true;

        parent.call(this, id, params);

        this.color = "";
        this.name = "empty_block";
        this.imagePath = "images";
        this.imageExtension = ".png";
        this.imageName = "empty_block";
        this.height = 32;
        this.width = 32;
        this.isActive = true;

        this.impactTop = true;
        this.impactRight = true;
        this.impactBottom = true;
        this.impactLeft = true;

    }


    return EmptyBlock;

})(MoveableShape);

try {
    module.exports = {
        EmptyBlock: EmptyBlock
    }
}
catch (err) {

}