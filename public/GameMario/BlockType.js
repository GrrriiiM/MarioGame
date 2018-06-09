var BlockType = {
    MIDDLE: 1,
    TOP_MIDDLE: 2,
    TOP_LEFT: 3,
    TOP_LEFT_CORNER: 4,
    TOP_RIGHT: 5,
    TOP_RIGHT_CORNER: 6,
    LEFT: 7,
    LEFT_CORNER: 8,
    RIGHT: 9,
    RIGHT_CORNER: 10,
    BOTTOM_MIDDLE: 11,
    BOTTOM_LEFT: 12,
    BOTTOM_LEFT_CORNER: 13,
    BOTTOM_RIGHT: 14,
    BOTTOM_RIGHT_CORNER: 15,
    TOP_LEFT_OUT_CORNER: 16,
    TOP_RIGHT_OUT_CORNER: 17,
    BOTTOM_LEFT_OUT_CORNER: 18,
    BOTTOM_RIGHT_OUT_CORNER: 19,

    getImageName: function (name, blockType) {
        imageName = name;

        switch (blockType) {
            case BlockType.MIDDLE:
                imageName = imageName + "_middle";
                break;
            case BlockType.TOP_MIDDLE:
                imageName = imageName + "_top_middle";
                break;
            case BlockType.TOP_LEFT:
                imageName = imageName + "_top_left";
                break;
            case BlockType.TOP_LEFT_CORNER:
                imageName = imageName + "_top_left_corner";
                break;
            case BlockType.TOP_RIGHT:
                imageName = imageName + "_top_right";
                break;
            case BlockType.TOP_RIGHT_CORNER:
                imageName = imageName + "_top_right_corner";
                break;
            case BlockType.LEFT:
                imageName = imageName + "_left";
                break;
            case BlockType.RIGHT:
                imageName = imageName + "_right";
                break;
            case BlockType.LEFT_CORNER:
                imageName = imageName + "_left_corner";
                break;
            case BlockType.RIGHT_CORNER:
                imageName = imageName + "_right_corner";
                break;
            case BlockType.BOTTOM_MIDDLE:
                imageName = imageName + "_bottom_middle";
                break;
            case BlockType.BOTTOM_LEFT:
                imageName = imageName + "_bottom_left";
                break;
            case BlockType.BOTTOM_LEFT_CORNER:
                imageName = imageName + "_bottom_left_corner";
                break;
            case BlockType.BOTTOM_RIGHT:
                imageName = imageName + "_bottom_right";
                break;
            case BlockType.BOTTOM_RIGHT_CORNER:
                imageName = imageName + "_bottom_right_corner";
                break;

            case BlockType.TOP_LEFT_OUT_CORNER:
                imageName = imageName + "_top_left_outCorner";
                break;

            case BlockType.TOP_RIGHT_OUT_CORNER:
                imageName = imageName + "_top_right_outCorner";
                break;

            case BlockType.BOTTOM_LEFT_OUT_CORNER:
                imageName = imageName + "_bottom_left_outCorner";
                break;

            case BlockType.BOTTOM_RIGHT_OUT_CORNER:
                imageName = imageName + "_bottom_right_outCorner";
                break;


        }
        return imageName;
    },

    test: function () {
        //return new Base("teste allison").id;
        return "BlockType OK!";
    }

}

try {
    module.exports = {
        BlockType: BlockType
    }
}
catch (err) {

}