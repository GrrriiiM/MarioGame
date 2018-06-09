var moveVelocity = 1;

var Interrogation = (function (parent) {

    Interrogation.prototype = new MoveableShape();
    Interrogation.prototype.constructor = Interrogation;

    function Interrogation(id, params) {

        this.raisedShape = {};
        this.afterRaisedShape = function (shape) { };

        params = params || {};

        params.solid = true;

        parent.call(this, id, params);

        this.color = "";
        this.name = "Interrogation";
        this.imagePath = "images";
        this.imageExtension = ".png";
        this.height = 32;
        this.width = 32;
        this.isActive = true;

        this.impactTop = true;
        this.impactRight = true;
        this.impactBottom = true;
        this.impactLeft = true;

        this.animations = {};
        this.animations["active"] = new ShapeAnimation("active", this, {
            repeat: true,
            steps: [
                new StepShapeAnimation({
                    step: 0,
                    time: 150
                }),
                new StepShapeAnimation({
                    step: 1,
                    time: 150
                }),
                new StepShapeAnimation({
                    step: 2,
                    time: 150
                }),
                new StepShapeAnimation({
                    step: 3,
                    time: 150
                }),
            ]
        });

        Game.on("afterDefineMoveables", onAfterDefineMoveables, this);

        this.animations["active"].start();

        //this.defineImage();

    }


    Interrogation.prototype.defineImage = function () {
        this.hasChangedVisualForm = true;
        if (this.name) {
            this.imageName = this.name;
        }
    }


    Interrogation.prototype.onColisioned = function (moveable, shape) {
            //this.hit();
    }

    Interrogation.prototype.hit = function () {
        if (this.isActive) {
            this.isActive = false;
            this.animations["active"].stop();
            this.moveables["moveUp"] = createMoveUp(this);
        }
        //this.toEmptyBlock();
    }

    var createMoveUp = function (shape) {

        var top = shape.top;

        var moveable = new ContinuousMoveable(shape, {
            id: "moveUp",
            distance: 20,
            velocity: 510 * moveVelocity,
            direction: Direction.UP
        });

        moveable.onFinished = function () {
            this.shape.moveables["moveDown"] = createMoveDown(shape, top);
        }

        return moveable;
    }


    var createMoveDown = function (shape, originalTop) {

        var moveable = new ContinuousMoveable(shape, {
            id: "moveDown",
            distance: 20,
            velocity: 490 * moveVelocity,
            direction: Direction.DOWN
        });

        moveable.onFinished = function () {
            //if (this.shape.top < originalTop) {
            //    this.shape.moveables["moveDown"] = createMoveDown(shape, originalTop);
            //}
            //else {
            //    this.shape.toEmptyBlock();
            //}
            this.shape.raiseShape();
            this.shape.toEmptyBlock();
        }

        return moveable;
    }

    Interrogation.prototype.raiseShape = function () {
        if (this.raisedShape instanceof MoveableShape) {
            this.container.shapes[this.raisedShape.id] = this.raisedShape;
            this.raisedShape.container = this.container;
            this.raisedShape.top = this.top;
            this.raisedShape.left = this.left;
            this.raisedShape.zIndex = this.zIndex;
            this.zIndex = this.zIndex + 1;
            var solid = this.raisedShape.solid;
            this.raisedShape.solid = false;
            var afterRaisedShape = this.afterRaisedShape;

            var moveable = new ContinuousMoveable(this.raisedShape, {
                id: "raise",
                distance: this.height,
                velocity: 550,
                direction: Direction.UP,
                
            });

            moveable.onFinished = function () {
                this.shape.solid = solid;
                if (afterRaisedShape) {
                    afterRaisedShape(this.shape);
                }
            }

            this.raisedShape.moveables["raise"] = moveable;
            this.hasChangedVisualForm = true;
        }
    }

    Interrogation.prototype.toEmptyBlock = function () {
        Game.removeEventById(this.id);
        var emptyBlock = new EmptyBlock(this.id, {
            container: this.container,
            top: this.top,
            left: this.left,
            zIndex: this.zIndex
        });


        this.container.shapes[this.id] = emptyBlock;

        return emptyBlock;
    }

    var onAfterDefineMoveables = function (game, id) {

        var shape = Game.getShape(id);

        if (shape) {

            shape.hasChangedVisualForm = true;

        }
    }

    return Interrogation;

})(MoveableShape);

try {
    module.exports = {
        Interrogation: Interrogation
    }
}
catch (err) {

}
