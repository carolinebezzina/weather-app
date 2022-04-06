var app = angular.module('weatherApp', []);
		
app.filter('filterDate', function () {		  

  return function (items) {
		var filtered = [];
		var today = new Date().toLocaleDateString();
		var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString();
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var date = new Date(item.dt * 1000).toLocaleDateString();

			if (date == tomorrow) {
				filtered.push(item);
			}
		}
	return filtered;
  };
  
});

app.controller('weatherCtrl', function($scope, $http) {
	
	$scope.counter=0;
	
	$scope.getWeather = function (cityID) {
		var URL = "http://api.openweathermap.org/data/2.5/";
		var APIKey = "c11619e746f26d09f3cea244b37a054a";
		var units = "metric";
		//console.log(url + "forecast?id=" + cityID + "&APPID=" + APIKey);
		
		$http.get(URL + "forecast?id=" + cityID + "&units=" + units + "&APPID=" + APIKey, {} )
		.then(function (response) {
			//console.log(response.data);
			$scope.response = response.data;
			for (var i = 0; i < $scope.tabs.length; i++) {
				angular.element(document.getElementById($scope.tabs[i].ID)).removeClass("activeTab");
			}
			angular.element(document.getElementById(cityID)).addClass("activeTab");
		}, function (x) {
			console.log("Failed");
			$scope.failed = true;
		});
	}
	
	$scope.getIcon = function (iconID) {
		var imageURL = "http://openweathermap.org/img/w/";
		iconURL = imageURL + iconID + ".png";
		return iconURL;
	}
	
	$scope.displayDay = function (forecastDate) {
		var today = new Date().toLocaleDateString();
		var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString();
		
		var formattedDate = new Date(forecastDate);
		forecastDate = new Date(forecastDate).toLocaleDateString();
		//console.log('Today: ' + today);
		//console.log('Tomorrow: ' + tomorrow);					
		//console.log('formattedDate: ' + formattedDate);
		//console.log('forecastDate: ' + forecastDate);

		if (today == forecastDate) {
			day = "Today";
		}
		else if (tomorrow == forecastDate) {
			day = "Tomorrow";
		}
		else {
			//console.log('formattedDate: ' + formattedDate);
			day = formattedDate.getDay();
			day = $scope.days[day].Day;
			//console.log('Day: ' + day);
		}
		return day;
	}
	
	$scope.getNextDate = function () {
		$scope.currentDate = new Date($scope.response.list[$scope.counter].dt * 1000).toLocaleDateString();
		var temp = $scope.currentDate;
		
		while (temp == $scope.currentDate && $scope.counter + 1 < $scope.response.list.length)
		{
			temp = $scope.currentDate;
			$scope.currentDate = new Date($scope.response.list[$scope.counter].dt * 1000).toLocaleDateString();
			$scope.counter += 1;
		}
		
		return $scope.counter;
	}
	
	$scope.getPreviousDate = function () {
		$scope.currentDate = new Date($scope.response.list[$scope.counter].dt * 1000).toLocaleDateString();
		var temp = $scope.currentDate;
		
		while (temp == $scope.currentDate && $scope.counter > 0)
		{
			temp = $scope.currentDate;
			$scope.currentDate = new Date($scope.response.list[$scope.counter].dt * 1000).toLocaleDateString();
			$scope.counter -= 1;
		}
		
		return $scope.counter;
	}

	
	$scope.tabs = [
		{                        
			ID: 2158177,
			Name: "Melbourne",
			//Visited: false,
		},
		{
			ID: 2172517,
			Name: "Canberra",
			//Visited: false,
		},
		{
			ID: 2078025,
			Name: "Adelaide",
			//Visited: false,
		},
		{
			ID: 2163355,
			Name: "Hobart",
			//Visited: false,
		},
		{
			ID: 2147714,
			Name: "Sydney",
			//Visited: false,
		},
		{
			ID: 2174003,
			Name: "Brisbane",
			//Visited: false,

		},
		{
			ID: 2640358,
			Name: "Perth",
			//Visited: false,
		},
		{
			ID: 2073124,
			Name: "Darwin",
			//Visited: false,
		}
	]

	$scope.days = [
		{
			ID: 0,
			Day: "Sunday",
		},
		{				
			ID: 1,
			Day: "Monday",
		},
		{	
			ID: 2,
			Day: "Tuesday",
		},
		{
			ID: 3,
			Day: "Wednesday",
		},
		{
			ID: 4,
			Day: "Thursday",
		},
		{
			ID: 5,
			Day: "Friday",
		},
		{
			ID: 6,
			Day: "Saturday",
		}
	]
});