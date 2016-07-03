angular.module("testApp")
.service("reportService", function($firebaseArray, $q, $window, $http){
   
	this.auth = function(authObj){
		
        var deferred = $q.defer();
        var ref = new Firebase("https://contactlisttestapp.firebaseio.com");

        ref.authWithPassword(authObj, function(error, authData) {
          if (error) {
			console.log("Login Failed!", error);
			alert('Email or Password are wrong. Please try again!');
			
            
          } else {
				
                userInfo = {
                    accessToken: authData.token,
                    userId: authData.uid
                }
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                deferred.resolve(userInfo);  
          }
        
        });
        
        return deferred.promise;
        
    };//end auth
	
	
     
    
});//end service reportService