'use strict';
angular.module('confusionApp')
.controller('IndexController',  ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory,corporateFactory) {
          $scope.dish = {};
          $scope.showDish = false;
          $scope.message="Loading ...";
          menuFactory.getDishes().get({id:0})
          .$promise.then(
              function(response){
                  $scope.dish = response;
                  $scope.showDish = true;
              },
              function(response) {
                  $scope.message = "Error: "+response.status + " " + response.statusText;
              }
          );     
          menuFactory.getPromotions().get({id:0})
          .$promise.then(
              function(response){
                 $scope.promotion = response;
              },
              function(response) {
                  $scope.message = "Error: "+response.status + " " + response.statusText;
              } 
          );       
          corporateFactory.getLeaderships().get({id:0})
          .$promise.then(
              function(response){
                 $scope.leader = response;
              },
              function(response) {
                  $scope.message = "Error: "+response.status + " " + response.statusText;
              } 
          );       
}])
.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
      $scope.tab = 1;
      $scope.filtText = '';
      $scope.showMenu = false;
      $scope.message = "Loading ...";
      menuFactory.getDishes().query(
      function(response) {
          $scope.dishes = response;
          $scope.showMenu = true;
      },
      function(response) {
          $scope.message = "Error: "+response.status + " " + response.statusText;
      });
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

}]).controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {

            $scope.sendFeedback = function() {
              if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    feedbackFactory.setFeedBack().save($scope.feedback);
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };

}]).controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            $scope.oderBy="rating";
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
              function(response){
                $scope.dish = response;
                $scope.showDish = true;
              },
                function(response) {
                  $scope.message = "Error: "+response.status + " " + response.statusText;
              }
            );
}]).controller('DishFormController', ['$scope', 'menuFactory', function($scope,menuFactory) {

            $scope.start="5";
            $scope.comments="";
            $scope.name="";
            $scope.showcomments=false;
            var dishComments=[];

            
            $scope.sendDish=function(){

    
              dishComments=$scope.dish.comments;
              var commentObject= {
                             rating:$scope.start,
                             comment:$scope.comments,
                             author:$scope.name,
                             date:new Date()
                         };
              dishComments.push(commentObject);
              $scope.dish.comments=dishComments;
              menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
              $scope.showcomments=false;
              $scope.start="5";
              $scope.comments="";
              $scope.name="";
              $scope.dishForm.$setPristine();


              /*  $scope.comments.date = new Date().toISOString();
                console.log($scope.comments);
                $scope.dish.comments.push($scope.comments);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.dishForm.$setPristine();
                $scope.comments = {rating:5, comment:"", author:"", date:""};*/
              
            }

            $scope.commentsChange=function() {              
              if($scope.comments!=""){
                  $scope.showcomments=true;
              }else{
                  $scope.showcomments=false;
              }

            }
     }])
.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
    corporateFactory.getLeaderships().query(
        function(response) {
           $scope.leaderships = response;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        } 
    );
}]);