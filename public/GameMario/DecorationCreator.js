var DecorationCreator = {
    createSequence: function (id, arrayParams) {
        var shapes = {};
        arrayParams = arrayParams || [];
        
        for (var idArrayParams in arrayParams) {
            var params = arrayParams[idArrayParams];
            var shape = DecorationType.getShape(id + "_" + idArrayParams, params);
            shapes[shape.id] = shape;
        }

        return shapes;
    },

    test: function () {
        //return new Base("teste allison").id;
        return "DecorationCreator OK!";
    }
};



try {
    module.exports = {
        DecorationCreator: DecorationCreator
    }
}
catch (err) {

}
