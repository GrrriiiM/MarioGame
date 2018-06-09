var StatusShapeAnimation = {
    START: 1,
    PAUSE: 2,
    STOP: 3,

    test: function () {
        //return new Base("teste allison").id;
        return "StatusShapeAnimation OK!";
    }
};

try {
    module.exports = {
        StatusShapeAnimation: StatusShapeAnimation
    }
}
catch (err) {

}