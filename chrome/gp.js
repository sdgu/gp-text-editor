var app = angular.module("gptexteditor", ["ngSanitize", "ngclipboard", "ngCookies", "colorpicker.module"]);

//redoing for chrome i think
// app.directive('ngRightClick', function($parse) {
//     return function(scope, element, attrs) {
//         var fn = $parse(attrs.ngRightClick);
//         element.bind('contextmenu', function(event) {
//             scope.$apply(function() {
//                 event.preventDefault();
//                 fn(scope, {$event:event});
//             });
//         });
//     };
// });

// app.directive('sglclick', ['$parse', function($parse) {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attr) {
//           var fn = $parse(attr['sglclick']);
//           var delay = 250, clicks = 0, timer = null;
//           element.on('click', function (event) {
//             clicks++;  //count clicks
//             if(clicks === 1) {
//               timer = setTimeout(function() {
//                 scope.$apply(function () {
//                     fn(scope, { $event: event });
//                 }); 
//                 clicks = 0;             //after action performed, reset counter
//               }, delay);
//               } else {
//                 clearTimeout(timer);    //prevent single-click action
//                 clicks = 0;             //after action performed, reset counter
//               }
//           });
//         }
//     };
// }])




app.controller("MainCtrl",
	function($scope, $cookies)
	{
	

		// var message = "pasta apple";
		// var $scope.m.dispArr = message.split(" ");
		// var $scope.m.cpArr = message.split(" ");
		
		// $scope.m.dispArr = $scope.m.dispArr;
		// $scope.m.cpArr = $scope.m.cpArr;

		//inside color gets shown
		$scope.testReg = "<c>pasta is gouda</c>";
		var pasta = 
		$scope.testReg = $scope.testReg.replace(/<c>(.*?)<\/c>/g, "[COLOR=green][B]Comment: $1[/B][/COLOR]");

		$scope.addColor = "blue";
		$scope.remColor = "red";
		$scope.comColor = "green";
		$scope.limit = 200;
		$scope.go = function()
		{
	
			// if ($cookies.get("htmlArr").length > 0)
			// {
			// 	$scope.m.dispArr = $cookies.get("htmlArr");
			// }

			$scope.m.dispArr = $scope.thingToGP.replace(/\n/g, " <br> ").split(" ");
			$scope.m.cpArr = $scope.thingToGP.replace(/\n/g, " <br> ").split(" ");
			// var message = "These two names keep coming back to me and now I don't know if it's me or them now.";
			// $scope.m.dispArr = message.split(" ");
			// $scope.m.cpArr = message.split(" ");




		}

		$scope.copyToBoard = function()
		{
			//alert("add " + $scope.addColor + " remove " + $scope.remColor);
			$scope.cpthis = $scope.m.cpArr.join(" ").replace(/\[\/S]\[\/COLOR]\[\/B] \[B]\[COLOR=red]\[S]/g, " ").replace(/\[B]\[COLOR=red]\[\/COLOR]\[\/B]/g, "").replace(/\[\/B]\[\/COLOR] \[COLOR=blue]\[B]/g, " ");
			$scope.cpthis = $scope.cpthis.replace(/\[COLOR=red]/g, "[COLOR=" + $scope.remColor + "]");
			$scope.cpthis = $scope.cpthis.replace(/\[COLOR=blue]/g, "[COLOR=" + $scope.addColor + "]");
			$scope.cpthis = $scope.cpthis.replace(/\[c](.*?)\[\/c]/g, "[COLOR=" + $scope.comColor + "]" + "Comment: $1[/COLOR]");
		}

		$scope.increaseLimit = function()
		{
			$scope.limit += 200;
		}


		var firstInd = 0;
		var secondInd = 0;
		var shiftCount = 0;

		$scope.resetShift = function()
		{
			shiftCount = 0;

		}

		$scope.edit = function(event, index)
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
						$scope.m.dispArr[i] = '<del><strong class="redRemove">' + $scope.m.dispArr[i] + '</strong></del>';
						if (!($scope.m.cpArr[i].contains('[B][COLOR=red][S]')))
						{
							$scope.m.cpArr[i] = '[B][COLOR=red][S]' + $scope.m.cpArr[i] + '[/S][/COLOR][/B]';
						}
					}
					shiftCount = 0;
					firstInd = 0;
					secondInd = 0;
				}

				$scope.testing = index + " " + shiftCount;
			}
			if (event.ctrlKey)
			{
					
				// shiftCount++;
				// if (shiftCount === 1)
				// {
				// 	firstInd = index;
				// }
				// if (shiftCount === 2)
				// {
				// 	secondInd = index;
				// }

				// if (secondInd > 0)
				// {
				// 	for (var i = Math.min(firstInd, secondInd); i < Math.max(firstInd, secondInd); i++)
				// 	{

				// 		if ($scope.m.dispArr[i].contains('<del><strong class="redRemove">'))
				// 		{
				// 			$scope.m.dispArr[i] = $scope.m.dispArr[i].substring(26);
				// 			$scope.m.dispArr[i] = $scope.m.dispArr[i].substring(0, $scope.m.dispArr[i].length - 9);
				// 		}
				// 		if ($scope.m.cpArr[i].contains('[B][COLOR=red][S]'))
				// 		{

				// 			$scope.m.cpArr[i] = $scope.m.cpArr[i].substring(14);
				// 			$scope.m.cpArr[i] = $scope.m.cpArr[i].substring(0, $scope.m.cpArr[i].length - 12);
				// 		}

				// 	}
				// 	shiftCount = 0;
				// 	firstInd = 0;
				// 	secondInd = 0;
				// }
				


				//else
				{
					if ($scope.m.dispArr[index].contains('<del><strong class="redRemove">'))
					{
						$scope.m.dispArr[index] = $scope.m.dispArr[index].substring(31);
						$scope.m.dispArr[index] = $scope.m.dispArr[index].substring(0, $scope.m.dispArr[index].length - 15);
					}

					if ($scope.m.cpArr[index].contains('[B][COLOR=red][S]'))
					{
						$scope.m.cpArr[index] = $scope.m.cpArr[index].substring(17);
						$scope.m.cpArr[index] = $scope.m.cpArr[index].substring(0, $scope.m.cpArr[index].length - 16);
					}

					if ($scope.m.cpArr[index].contains('[COLOR=blue][B]'))
					{
						$scope.m.cpArr.splice(index, 1);
						$scope.m.dispArr.splice(index, 1);
					
						$scope["style" + (index)] = {'color' : 'none', 'font-weight' : 'none'};
						$scope["style" + (index-1)] = {'color' : 'none', 'font-weight' : 'none'};

						// $scope.m.cpArr[index] = $scope.m.cpArr[index].substring(16);
						// $scope.m.cpArr[index] = $scope.m.cpArr[index].substring(0, $scope.m.cpArr[index].length - 12);
					}


				}
			}
			if (event.altKey)
			{
				$scope["addingWord" + index] = true;
			}
			else if (!event.ctrlKey && !event.altKey && !event.shiftKey)
			{


		
				$scope.m.dispArr[index] = '<del><strong class="redRemove">' + $scope.m.dispArr[index] + '</strong></del>';
				//only need to check the beginning because removing will remove both sides
				if (!($scope.m.cpArr[index].contains('[B][COLOR=red][S]')))
				{
					$scope.m.cpArr[index] = '[B][COLOR=red][S]' + $scope.m.cpArr[index] + '[/S][/COLOR][/B]';
				}
			}
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
				//$scope.m.dispArr.splice(index + 1, 0, arr2add);
				
				for (var i = index; i < index + arr2add.length; i++)
				{
					
					$scope.m.dispArr.splice(i + 1, 0, arr2add[i-index]);
					$scope.m.dispArr[i + 1] = '<strong class="blueAdd">' + $scope.m.dispArr[i + 1] + "</strong>";
					//$scope["style" + (i+1)] = {'color' : 'blue', 'font-weight' : 'bold'};
					$scope.m.cpArr.splice(i + 1, 0, '[COLOR=blue][B]' + arr2add[i-index] + '[/B][/COLOR]');

				}

				//alert($scope.m.cpArr);
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

