var ShapeSync = (function (parent) {

    ShapeSync.prototype = new Base();
    ShapeSync.prototype.constructor = Shape;

    function ShapeSync(id, params) {

        this.id = id;
        this.height = 0;
        this.width = 0;
        this.top = 0;
        this.left = 0;
        this.image = "";
        this.color = "blue"
        this.images = [];
        this.containerId = "";
        this.hasChangedVisualForm = true;
        this.hasChangedPosition = true;
        this.isRemoved = false;
        this.isOnScreen = true;
        this.zIndex = 0;

        

        parent.call(this, params);

    }

    return ShapeSync;

})(Base);

try {
    module.exports = {
        ShapeSync: ShapeSync
    }
}
catch (err) {

}