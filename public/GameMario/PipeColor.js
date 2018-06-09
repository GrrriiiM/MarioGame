var PipeColor = {
    BLUE: 1,
    GRAY: 2,
    GREEN: 3,
    ORANGE: 4,
    PINK: 5,
    PURPLE: 6,
    YELLOW: 7,

    getColorName: function (pipeColor) {
        switch (pipeColor) {
            case PipeColor.BLUE:
                return "blue";
            case PipeColor.GRAY:
                return "gray";
            case PipeColor.GREEN:
                return "green";
            case PipeColor.ORANGE:
                return "orange";
            case PipeColor.PINK:
                return "pink";
            case PipeColor.PURPLE:
                return "purple";
            case PipeColor.YELLOW:
                return "yellow";
        }

    },

    test: function () {
        //return new Base("teste allison").id;
        return "PipeColor OK!";
    }
};

try {
    module.exports = {
        PipeColor: PipeColor
    }
}
catch (err) {

}