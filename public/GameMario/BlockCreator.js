/// <reference path="BlockType.js" />


var BlockCreator = {

    create: function (id, params) {
        params = params || {};

        params.blocksWidth = params.blocksWidth || 1;

        params.blocksHeight = params.blocksHeight || 1;

        params.blockSize = params.blockSize || 32;

        params.borderTop = params.borderTop || false;

        params.borderLeft = params.borderLeft || false;

        params.borderRight = params.borderRight || false;

        params.borderBottom = params.borderBottom || false;



        params.unfinishedTopLeft = params.unfinishedLeft || false;

        params.unfinishedTopRight = params.unfinishedRight || false;

        params.inputOutCornerTopLeft = params.inputOutCornerTopLeft || -1;

        params.inputOutCornerTopRight = params.inputOutCornerTopRight || -1;

        params.inputOutCornerBottomLeft = params.inputOutCornerBottomLeft || -1;

        params.inputOutCornerBottomRight = params.inputOutCornerBottomRight || -1;

        var tempImpactTop = params.impactTop;
        var tempImpactLeft = params.impactLeft;
        var tempImpactRight = params.impactRight;
        var tempImpactBottom = params.impactBottom;

        var shapes = {};

        params.height = params.blocksHeight * params.blockSize;
        params.width = params.blocksWidth * params.blockSize;

        var shape = new BlockGrass(id, params);

        for (var v = 0; v < params.blocksHeight; v++) {
            for (var h = 0; h < params.blocksWidth; h++) {
                if (v == 0) {
                    if (params.borderTop) {
                        if (h == 0) {
                            if (params.borderLeft) {
                                params.blockType = BlockType.TOP_LEFT_CORNER;
                            }
                            else {
                                if (!params.unfinishedLeft) {
                                    params.blockType = BlockType.TOP_LEFT;
                                }
                                else {
                                    params.blockType = BlockType.TOP_MIDDLE;
                                }
                            }
                        }
                        else if (h == params.blocksWidth - 1) {
                            if (params.borderRight) {
                                params.blockType = BlockType.TOP_RIGHT_CORNER;
                            }
                            else {
                                if (!params.unfinishedRight) {
                                    params.blockType = BlockType.TOP_RIGHT;
                                }
                                else {
                                    params.blockType = BlockType.TOP_MIDDLE;
                                }
                            }
                        }
                        else {
                            params.blockType = BlockType.TOP_MIDDLE;
                        }
                    }
                }
                else if (h == 0) {
                    if (params.borderLeft) {
                        if (v == params.blocksHeight - 1) {
                            if (params.borderBottom) {
                                params.blockType = BlockType.BOTTOM_LEFT_CORNER;
                            }
                            else {
                                params.blockType = BlockType.LEFT_CORNER;
                            }
                        }
                        else {
                            params.blockType = BlockType.LEFT_CORNER;
                        }
                    }
                    else {
                        if (v == params.blocksHeight - 1) {
                            if (params.borderBottom) {
                                if (!params.unfinishedLeft) {
                                    params.blockType = BlockType.BOTTOM_LEFT;
                                }
                                else {
                                    params.blockType = BlockType.BOTTOM_MIDDLE;
                                }
                            }
                            else {
                                if (!params.unfinishedLeft) {
                                    params.blockType = BlockType.LEFT;
                                }
                                else {
                                    params.blockType = BlockType.MIDDLE;
                                }
                            }
                        }
                        else {
                            if (!params.unfinishedLeft) {
                                params.blockType = BlockType.LEFT;
                            }
                            else {
                                params.blockType = BlockType.MIDDLE;
                            }
                        }
                    }
                }
                else if (h == params.blocksWidth - 1) {
                    if (params.borderRight) {
                        if (v == params.blocksHeight - 1) {
                            if (params.borderBottom) {
                                params.blockType = BlockType.BOTTOM_RIGHT_CORNER;
                            }
                            else {
                                params.blockType = BlockType.RIGHT_CORNER;
                            }
                        }
                        else {
                            params.blockType = BlockType.RIGHT_CORNER;
                        }
                    }
                    else {
                        if (v == params.blocksHeight - 1) {
                            if (params.borderBottom) {
                                if (!params.unfinishedRight) {
                                    params.blockType = BlockType.BOTTOM_RIGHT;
                                }
                                else {
                                    params.blockType = BlockType.BOTTOM_MIDDLE;
                                }
                            }
                            else {
                                if (!params.unfinishedRight) {
                                    params.blockType = BlockType.RIGHT;
                                }
                                else {
                                    params.blockType = BlockType.MIDDLE;
                                }
                            }
                        }
                        else {
                            if (!params.unfinishedRight) {
                                params.blockType = BlockType.RIGHT;
                            }
                            else {
                                params.blockType = BlockType.MIDDLE;
                            }
                        }
                    }
                }
                else if (v == params.blocksHeight - 1) {
                    if (params.borderBottom) {
                        params.blockType = BlockType.BOTTOM_MIDDLE;
                    }
                    else {
                        params.blockType = BlockType.MIDDLE;
                    }
                }
                else {
                    params.blockType = BlockType.MIDDLE;
                }


                if (h == 0) {
                    if (params.inputOutCornerTopLeft > 0) {
                        if (params.inputOutCornerTopLeft == v) {
                            params.blockType = BlockType.TOP_LEFT_OUT_CORNER;
                        }
                        else if (params.inputOutCornerTopLeft < v) {
                            params.blockType = BlockType.MIDDLE;
                        }
                    }
                    if (params.inputOutCornerBottomLeft > 0) {
                        if (params.inputOutCornerBottomLeft == h) {
                            params.blockType = BlockType.BOTTOM_LEFT_OUT_CORNER;
                        }
                        else if (params.inputOutCornerBottomLeft > v) {
                            params.blockType = BlockType.MIDDLE;
                        }
                    }

                }

                if (h == params.blocksWidth - 1) {
                    if (params.inputOutCornerTopRight > 0) {
                        if (params.inputOutCornerTopRight == v) {
                            params.blockType = BlockType.TOP_RIGHT_OUT_CORNER;
                        }
                        else if (params.inputOutCornerTopRight < v) {
                            params.blockType = BlockType.MIDDLE;
                        }
                    }
                    if (params.inputOutCornerBottomRight > 0) {
                        if (params.inputOutCornerBottomRight == h) {
                            params.blockType = BlockType.BOTTOM_RIGHT_OUT_CORNER;
                        }
                        else if (params.inputOutCornerBottomRight > v) {
                            params.blockType = BlockType.MIDDLE;
                        }
                    }

                }



                var img = new ShapeImage(shape);
                img.x = v;
                img.y = h;
                img.top = (params.blockSize * v);
                img.left = (params.blockSize * h);
                img.height = params.blockSize;
                img.width = params.blockSize;
                img.imageName = BlockType.getImageName(shape.name, params.blockType);
                shape.images.push(img);
            }
        }

        shapes[shape.id] = shape;

        return shapes;

    },

    createContinuousWidth: function(id, params, blocks) {

        var shapes = {};

        params = params || {};

        params.blockSize = params.blockSize || 32;
        params.left = params.left || 0;
        params.top = params.top || 32;

        var totalGroundBlockWidth = params.left / 32;
        var groundBlockTop = params.top;

        for (var idBlock in blocks) {

            var block = blocks[idBlock];
            var nextBlock = blocks[parseInt(idBlock) + 1];
            var previousBlock = blocks[parseInt(idBlock) - 1];
            var paramsBlock = params;

            paramsBlock.blocksWidth = block[0];
            paramsBlock.blocksHeight = block[1];
            paramsBlock.top = groundBlockTop - (params.blocksHeight * params.blockSize);
            paramsBlock.left = totalGroundBlockWidth * params.blockSize;
            
            paramsBlock.borderLeft = true;
            paramsBlock.unfinishedRight = false;
            paramsBlock.borderRight = true;
            paramsBlock.unfinishedRight = false;
            paramsBlock.inputOutCornerTopLeft = -1;
            paramsBlock.inputOutCornerTopRight = -1;
            paramsBlock.inputOutCornerBottomLeft = -1;
            paramsBlock.inputOutCornerBottomRight = -1;

            if (previousBlock) {
                if (previousBlock[1] >= block[1]) {
                    paramsBlock.borderLeft = false;
                    paramsBlock.unfinishedRight = true;
                }
                else {
                    paramsBlock.inputOutCornerTopLeft = block[1] - previousBlock[1];
                    paramsBlock.unfinishedLeft = true;
                }

            }

            
            if (nextBlock) {
                if (nextBlock[1] >= block[1]) {
                    paramsBlock.borderRight = false;
                    paramsBlock.unfinishedRight = true;
                }
                else {
                    paramsBlock.inputOutCornerTopRight = block[1] - nextBlock[1];
                }
            }

            Util.extend(shapes, BlockCreator.create(id + "_" + idBlock, paramsBlock));

            totalGroundBlockWidth = totalGroundBlockWidth + params.blocksWidth;

        }

        return shapes;

    },

    test: function () {
        //return new Base("teste allison").id;
        return "BlockCreator OK!";
    }

}

try {
    module.exports = {
        BlockCreator: BlockCreator
    }
}
catch (err) {

}

