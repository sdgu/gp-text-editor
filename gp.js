var app = angular.module("gptexteditor", ["ngSanitize"]);

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
          var delay = 250, clicks = 0, timer = null;
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
	

		
		var message = $scope.thingToGP;
		//var message = $scope.thingToGP;
		//"I like pasta and Smogon drools a lot. Also Smogon is cyka.";
		
		// var bbArr = message.split(" ");
		//$scope.m.dispArr = [];
		//$scope.m.dispArr = message.split(" ");
		//$scope.m.cpArr = message.split(" ");


		//var message = "dong masters"
	

		var htmlArr = message.split(" ");
		var bbArr = message.split(" ");
		


		//var htmlArr = $scope.m.dispArr;
		$scope.m.dispArr = htmlArr;
		$scope.m.cpArr = bbArr;
	




		var firstInd = 0;
		var secondInd = 0;
		var shiftCount = 0;

		$scope.resetShift = function()
		{
			shiftCount = 0;
		}

		$scope.turnRed = function(event, index)
		{	

			if (event.shiftKey)
			{

				shiftCount++;
				if (shiftCount === 1)
				{
					firstInd = index;
				}
				if (shiftCount === 2)
				{
					secondInd = index;
				}

				if (secondInd > 0)
				{
					for (var i = Math.min(firstInd, secondInd); i < Math.max(firstInd, secondInd) + 1; i++)
					{
						htmlArr[i] = '<strong class="redRemove">' + htmlArr[i] + '</strong>';
						if (!(bbArr[i].contains('[B][COLOR=red]')))
						{
							bbArr[i] = '[B][COLOR=red]' + bbArr[i] + '[/COLOR][/B]';
						}
					}
					shiftCount = 0;
					firstInd = 0;
					secondInd = 0;
				}

				$scope.testing = index + " " + shiftCount;
			}
			else
			{


				//$scope["style" + index] = {'color' : 'red', 'font-weight' : 'bold'};
				htmlArr[index] = '<strong class="redRemove">' + htmlArr[index] + '</strong>';
				//only need to check the beginning because removing will remove both sides
				if (!(bbArr[index].contains('[B][COLOR=red]')))
				{
					bbArr[index] = '[B][COLOR=red]' + bbArr[index] + '[/COLOR][/B]';
				}
			}
		}

		$scope.removeStyle = function(event, index)
		{

			if (event.ctrlKey)
			{

				shiftCount++;
				if (shiftCount === 1)
				{
					firstInd = index;
				}
				if (shiftCount === 2)
				{
					secondInd = index;
				}

				if (secondInd > 0)
				{
					for (var i = Math.min(firstInd, secondInd); i < Math.max(firstInd, secondInd); i++)
					{

						$scope["style" + i] = {'color' : 'none', 'font-weight' : 'none'};
						if (bbArr[i].contains('[B][COLOR=red]'))
						{

							bbArr[i] = bbArr[i].substring(14);
							bbArr[i] = bbArr[i].substring(0, bbArr[i].length - 12);
						}

						//if (bbArr[i].contains('[B][COLOR=blue]'))
						// {
						// 	bbArr.splice(i, Math.max(firstInd, secondInd) - Math.min(firstInd, secondInd) + 1);
						// 	htmlArr.splice(i, Math.max(firstInd, secondInd) - Math.min(firstInd, secondInd) + 1);
						// 	// bbArr[index] = bbArr[index].substring(16);
						// 	// bbArr[index] = bbArr[index].substring(0, bbArr[index].length - 12);
						// }

					}
					shiftCount = 0;
					firstInd = 0;
					secondInd = 0;
				}

				$scope.testing = index + " " + shiftCount;
			}
	
			//$scope["style" + index] = {'color' : 'none', 'font-weight' : 'none'};
			if (htmlArr[index].contains('<strong class="redRemove">'))
			{
				htmlArr[index] = htmlArr[index].substring(26);
				htmlArr[index] = htmlArr[index].substring(0, htmlArr[index].length - 9);
			}

			if (bbArr[index].contains('[B][COLOR=red]'))
			{
				bbArr[index] = bbArr[index].substring(14);
				bbArr[index] = bbArr[index].substring(0, bbArr[index].length - 12);
			}

			if (bbArr[index].contains('[B][COLOR=blue]'))
			{
				bbArr.splice(index, 1);
				htmlArr.splice(index, 1);
			
				$scope["style" + (index)] = {'color' : 'none', 'font-weight' : 'none'};
				$scope["style" + (index-1)] = {'color' : 'none', 'font-weight' : 'none'};

				// bbArr[index] = bbArr[index].substring(16);
				// bbArr[index] = bbArr[index].substring(0, bbArr[index].length - 12);
			}
			// else
			// {
			// 	$scope["style" + index] = {'color' : 'none', 'font-weight' : 'none'};
			// }

		}

		$scope.showAddWord = function(event, index)
		{
			
			$scope["addingWord" + index] = true;
			
			//$scope["addingWord" + index] = false;
		}



		$scope.addWord = function(event, index)
		{
			
			var word2add = $("#wordToAdd" + index).val();
			var arr2add = word2add.split(" ");



			if (event.keyCode === 13)
			{
				//htmlArr.splice(index + 1, 0, arr2add);
				
				for (var i = index; i < index + arr2add.length; i++)
				{
					
					htmlArr.splice(i + 1, 0, arr2add[i-index]);
					htmlArr[i + 1] = '<strong class="blueAdd">' + htmlArr[i + 1] + "</strong>";
					//$scope["style" + (i+1)] = {'color' : 'blue', 'font-weight' : 'bold'};
					bbArr.splice(i + 1, 0, '[B][COLOR=blue]' + arr2add[i-index] + '[/COLOR][/B]');

				}


				$scope["addingWord" + index] = false;

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