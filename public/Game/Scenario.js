
var Scenario = (function (parent) {
	
	Scenario.prototype = new Base();
	Scenario.prototype.constructor = Scenario;
	
	function Scenario(id, params) {
		

	    this.id = id;

		this.layers = [];
		
		parent.call(this, params);

		for (var idContainer in this.layers) {
		    this.layers[idContainer].scenario = this;
		}
		
	}

	Scenario.prototype.draw = function() {
	    for (var layer in this.layers) {
	        this.layers[layer].drawContainer();
	        this.layers[layer].drawShapes();
	    }
	}



	
	return Scenario;
	
})(Base);

try {
    module.exports = {
        Scenario: Scenario
    }
}
catch (err) {

}