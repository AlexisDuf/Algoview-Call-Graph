/**
 * MathUtils : math tool box ; static functions
 * @author michael
 */
 
 
var MathUtils = {
	
	parseIntIfDefined : function(value) {
		if(value != undefined){
			return parseInt(value);
		}
		return value;
	},

	randomNumber:  function(infval, supval) {
		return Math.floor(Math.random()* (supval - infval + 1) ) + infval;
	},
	
	getAddressFromKey :  function (key) {
		return parseInt(key.substring(1, key.length) ); // removes "@" prefix and convert into int
	},
	
	parseBoolean: function(str) {
		return /^TRUE$/i.test(str); 
	},
		
};


