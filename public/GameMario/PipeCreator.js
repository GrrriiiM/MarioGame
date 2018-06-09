/// <reference path="BlockType.js" />


var PipeCreator = {

    create: function (id, params) {
        params = params || {};

        params.blocksSize = params.blocksSize || 1;


        params.blockSize = params.blockSize || 32;

        params.pipeDirection = params.pipeDirection  || Direction.UP;

        params.pipeColor = params.pipeColor || PipeColor.YELLOW;

        var shapes = {};

        if (params.pipeDirection == Direction.UP || params.pipeDirection == Direction.DOWN) {
            params.height = params.blocksSize * params.blockSize + 30;
            params.width = 64;
        }
        else {
            params.width = params.blocksSize * params.blockSize + 30;
            params.height = 64;
        }

        params.impactTop = true,
        params.impactLeft = true,
        params.impactRight = true,
        params.impactBottom = true,
        params.color = "";
        params.imageExtension = ".png";
        params.imagePath = "Images";
        var shape = new Shape(id, params);
        
        var top = 0;
        var left = 0;
        var pipeColor = PipeColor.getColorName(params.pipeColor);

        if (params.pipeDirection == Direction.UP) {
            var img = new ShapeImage(shape);
            img.x = 0;
            img.y = 0;
            img.top = (params.blockSize * 0);
            img.left = (params.blockSize * 0);
            img.height = 30;
            img.width = 64;
            img.imageName = "pipe_top_" + pipeColor;
            shape.images.push(img);
            top = 30
        }

        for (var i = 0; i < params.blocksSize; i++) {
            
            var img = new ShapeImage(shape);
            img.x = i+1;
            img.y = 0;
            img.top = (params.blockSize * i) + top;
            img.left = (params.blockSize * 0);
            img.height = 32;
            img.width = 64;
            img.imageName = "pipe_body_" + pipeColor;
            shape.images.push(img);
            
        }

        if (params.bottom) {
            shape.top = params.bottom - shape.height;
        }
        if (params.right) {
            shape.left = params.right - shape.width;
        }

        shapes[shape.id] = shape;

        return shapes;

    },

    createSequence: function (id, arrayParams) {
        var shapes = {};
        arrayParams = arrayParams || [];

        for (var idArrayParams in arrayParams) {
            var params = arrayParams[idArrayParams];
            Util.extend(shapes, PipeCreator.create(id + "_" + idArrayParams, params));
        }

        return shapes;
    },

    test: function () {
        //return new Base("teste allison").id;
        return "PipeCreator OK!";
    }
}

try {
    module.exports = {
        PipeCreator: PipeCreator
    }
}
catch (err) {

}




