var app = angular.module("testApp")
app.controller("MainCtrl", ['$scope', '$firebase', '$location', 'reportService', function($scope, $firebase, $location, reportService){
      
    
    
    var email = "Email";
    var password = "Password";
    
    $scope.emailauth = email;
    
    $scope.password = password;
    $scope.passwordauth = password;
    
    $scope.authObj = {};
    $scope.loggedout = false;
    $scope.loggedin = false;
    
    $scope.logOut = false;
    $scope.logoutLink = false;
	$scope.loginLink = true;
	$scope.loginBlock = true;
	
	
	$scope.getAuth = function(){
        reportService.auth($scope.authObj)
            .then(function(result){
				       
                $scope.authObj = "";
				$scope.loginBlock = false;
				$scope.reportsBlock = true;
                
        });
    };  
    
    
	
}]);// end MainCtrl controller