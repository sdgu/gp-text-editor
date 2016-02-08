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

app.directive('sglclick', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
          var fn = $parse(attr['sglclick']);
          var delay = 200, clicks = 0, timer = null;
          element.on('click', function (event) {
            clicks++;  //count clicks
            if(clicks === 1) {
              timer = setTimeout(function() {
                scope.$apply(function () {
                    fn(scope, { $event: event });
                }); 
                clicks = 0;             //after action performed, reset counter
              }, delay);
              } else {
                clearTimeout(timer);    //prevent single-click action
                clicks = 0;             //after action performed, reset counter
              }
          });
        }
    };
}])

app.controller("MainCtrl",
	function($scope)
	{
	
		var message = "I like pasta and Smogon drools a lot. Also Smogon is cyka.";
		
		// var bbArr = message.split(" ");
		//$scope.m.dispArr = [];
		//$scope.m.dispArr = message.split(" ");
		//$scope.m.cpArr = message.split(" ");
		var htmlArr = message.split(" ");
		var bbArr = message.split(" ");
		//var htmlArr = $scope.m.dispArr;
		$scope.m.dispArr = htmlArr;
		$scope.m.cpArr = bbArr;

		$scope.turnRed = function(event, index)
		{	
			$scope["style" + index] = {'color' : 'red', 'font-weight' : 'bold'};

			if (!(bbArr[index].contains('[B][COLOR=red]')))
			{
				bbArr[index] = '[B][COLOR=red]' + bbArr[index] + '[/COLOR][/B]';
			}
		}

		$scope.removeStyle = function(event, index)
		{
	
			$scope["style" + index] = {'color' : 'none', 'font-weight' : 'none'};

			if (bbArr[index].contains('[B][COLOR=red]'))
			{

				bbArr[index] = bbArr[index].substring(14);
				bbArr[index] = bbArr[index].substring(0, bbArr[index].length - 12);
			}
		}




		$scope.test = function()
		{
			alert($scope.m.toSource());
		}

		$scope.test2 = function(event)
		{
			alert(event.target.toSource());
		}

		$scope.test3 = function()
		{
			alert("2x click");
		}






	});