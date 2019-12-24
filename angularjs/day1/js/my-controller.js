app.controller('page1Controller', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.helloPage1 = "Welcome to page 1.";
	$scope.saveGlobal = function(){
		$rootScope.shared = $scope.globalVariable;
	}

	$scope.isValidUsername = function(){
		return false;
	}
}]);

app.controller('page2Controller', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.helloPage2 = $rootScope.shared;
}]);

app.controller('page3Controller', ['$scope', 'calculator', function($scope, calculator){
	$scope.doAdd = function(){
		$scope.c = calculator.plus($scope.a , $scope.b);
	}
	$scope.doMinus = function(){
		$scope.c = calculator.minus($scope.a , $scope.b);
	}
	$scope.doMultiple = function(){
		$scope.c = calculator.multiple($scope.a , $scope.b);
	}
	$scope.doDivide = function(){
		$scope.c = calculator.divide($scope.a , $scope.b);
	}
}])