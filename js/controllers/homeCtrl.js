/*  Title: Login Controller
    Author:  Hubbert
    Date: Aug 16 2016
    Comment: 
        This should all the logic for the login page.
*/

app.controller('HomeCtrl', ['$scope', '$http', '$window', '$location', '$anchorScroll', 'data', function($scope, $http, $window, $location,  $anchorScroll, data) {
    var _base_templates = "templates/home/";

    var _init = function() {
        if ($location.search().hasOwnProperty('invitation_token')) {
            return;
        }
        //default page;
        $scope.currentPage = _getDefaultPage();
    }
     var _getDefaultPage = function() {
        return _base_templates + 'home.html';
    }

    _init();

}]);
