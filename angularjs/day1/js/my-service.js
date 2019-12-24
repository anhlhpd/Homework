app.service('calculator', function(){
	var calculator = {};
	calculator.plus = function(a, b){
		return a + b;
	}
	calculator.minus = function(a, b){
		return a - b;
	}
	calculator.multiple = function(a, b){
		return a * b;
	}
	calculator.divide = function(a, b){
		if (b == 0) {
			alert("Invalid b");
		} else {
			return a / b;
		}
		
	}
	return calculator;
})