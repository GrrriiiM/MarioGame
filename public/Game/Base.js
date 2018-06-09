var Base = (function() {
	
	function Base(params) {
		this.defineParams(params)
	}
	
	Base.prototype.defineParams = function(params) {
		for(var prop in params) {
			if(this[prop] != undefined) {
				this[prop] = params[prop];
			}
		}
		return this;
	}

	Base.prototype.test = function () {
	    var func = this.constructor.toString();
	    return func.substring(8, func.indexOf("(")).trim() + " OK!";
	}
	
	return Base;
	
})();

try
{
    module.exports = {
        Base: Base
    }
}
catch (err) {

}