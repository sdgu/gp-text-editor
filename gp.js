var app = angular.module("gptexteditor", []);

app.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});


app.controller("MainCtrl",
	function($scope)
	{
	
		var message = "I like pasta and Smogon drools a lot. Also Smogon is cyka.";
		
		// var bbArr = message.split(" ");
		//$scope.m.dispArr = [];
		//$scope.m.dispArr = message.split(" ");
		$scope.m.cpArr = message.split(" ");
		var htmlArr = message.split(" ");
		//var htmlArr = $scope.m.dispArr;
		$scope.m.dispArr = htmlArr;

		$scope.turnRed = function(event, index)
		{	
			$scope["style" + index] = {'color' : 'red', 'font-weight' : 'bold'};

			$scope.m.cpArr[index] = '[B][COLOR=red]' + $scope.m.cpArr[index] + '[/COLOR][/B]';

		}






		$scope.test = function()
		{
			alert($scope.m.toSource());
		}

		$scope.test2 = function(event)
		{
			alert(event.target.toSource());
		}








	});