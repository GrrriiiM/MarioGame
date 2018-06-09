var Util = {
    extend: function(var1, var2){
        for (var i in var2) {
            var1[i] = var2[i];
        }
        return var1;
    },
    getQueryString: function() {
        var querystring = location.search.replace( '?', '' ).split( '&' );
        // declare object
        var queryObj = {};
        // loop through each name-value pair and populate object
        for ( var i=0; i<querystring.length; i++ ) {
            // get name and value
            var name = querystring[i].split('=')[0];
            var value = querystring[i].split('=')[1];
            // populate object
            queryObj[name] = value;
        }
        return queryObj;
    },
    test: function () {
        //return new Base("teste allison").id;
        return "Util OK!";
    }
}

try {
    module.exports = {
        Util: Util
    }
}
catch (err) {

}