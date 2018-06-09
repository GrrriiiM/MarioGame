var DecorationType = {
    BIG_GRASS_1: 1,
    BIG_GRASS_2: 2,
    SMALL_GRASS_1: 3,
    SMALL_GRASS_2: 4,

    getShape: function (id, params) {
        params.color = "";
        params.imagePath = "Images";
        params.imageExtension = ".png";
        switch (params.decorationType) {
            case DecorationType.BIG_GRASS_1:
                params.imageName = "big_grass_decorator1";
                params.height = 112;
                params.width = 192;
                break;
            case DecorationType.BIG_GRASS_2:
                params.imageName = "big_grass_decorator2";
                params.height = 160;
                params.width = 288;
                break;
            case DecorationType.SMALL_GRASS_1:
                params.imageName = "small_grass_decorator1";
                params.height = 32;
                params.width = 96;
                break;
            case DecorationType.SMALL_GRASS_2:
                params.imageName = "small_grass_decorator2";
                params.height = 32;
                params.width = 128;
                break;
        }

        return new Shape(id, params);
    },

    test: function () {
        //return new Base("teste allison").id;
        return "DecorationType OK!";
    }

};

try {
    module.exports = {
        DecorationType: DecorationType
    }
}
catch (err) {

}