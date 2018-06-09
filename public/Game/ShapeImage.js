var ShapeImage = (function (parent) {

    ShapeImage.prototype = new Base();
    ShapeImage.prototype.constructor = ShapeImage;

    function ShapeImage(params) {

        this.height = 32;
        this.width = 32;
        this.x = 0;
        this.y = 0;
        this.top = 10;
        this.left = 10;
        this.imagePath = "";
        this.imageName = "";
        this.imageExtension = "";
        
        parent.call(this, params);

    }

    return ShapeImage;

})(Base);

try {
    module.exports = {
        ShapeImage: ShapeImage
    }
}
catch (err) {

}