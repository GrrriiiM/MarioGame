var Direction = {
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    LEFT: 4,

    test: function () {
        //return new Base("teste allison").id;
        return "Direction OK!";
    }
};

try {
    module.exports = {
        Direction: Direction
    }
}
catch (err) {

}