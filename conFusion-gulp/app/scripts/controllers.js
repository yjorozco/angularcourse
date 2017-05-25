'use strict';
angular.module('confusionApp').controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
      $scope.tab = 1;
      $scope.filtText = '';
      $scope.showDetails = false;
      $scope.dishes= menuFactory.getDishes();

      $scope.select = function(setTab) {
        $scope.tab = setTab;
        
        if (setTab === 2) {
          $scope.filtText = "appetizer";
        } 
        else if (setTab === 3) {
          $scope.filtText = "mains";
        }
        else if (setTab === 4) {
          $scope.filtText = "dessert";
        }
        else {
          $scope.filtText = "";
        }
      };
      
      $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
      };
      $scope.toggleDetails = function() {
          $scope.showDetails = !$scope.showDetails;
      };
}]).controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
                        $scope.channels = channels;
            $scope.invalidChannelSelection = false;

}]).controller('FeedbackController', ['$scope', function($scope) {

            $scope.sendFeedback = function() {
              if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };

}]).controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory', function($scope, $routeParams, menuFactory) {
            $scope.oderBy="rating";
            var dish= menuFactory.getDish(parseInt($routeParams.id,10));
            $scope.dish = dish;
}]).controller('DishFormController', ['$scope', function($scope) {

            $scope.start="5";
            $scope.comments="";
            $scope.name="";
            $scope.showcomments=false;
            var dishComments=[];

            
            $scope.sendDish=function(){

                if($scope.comments!=""){
                    dishComments=$scope.dish.comments;
                    var commentObject= {
                                   rating:$scope.start,
                                   comment:$scope.comments,
                                   author:$scope.name,
                                   date:new Date()
                               };
                    dishComments.push(commentObject);
                    $scope.dish.comments=dishComments;
                    $scope.showcomments=false;
                    $scope.start="5";
                    $scope.comments="";
                    $scope.name="";
                    $scope.dishForm.$setPristine();
                }
            }

            $scope.commentsChange=function() {              
              if($scope.comments!=""){
                  $scope.showcomments=true;
              }else{
                  $scope.showcomments=false;
              }

            }
     }]);