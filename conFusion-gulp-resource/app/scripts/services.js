'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")
        .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            this.getDishes = function(){
                return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
             };
            // implement a function named getPromotion
            // that returns a selected promotion.

            this.getPromotions = function(){                
                return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});                
            };                       
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var corpfac = {};   
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service
            corpfac.getLeaderships = function(){
              return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
            };

            return corpfac;      
    
        }])
        .service('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {    
            this.setFeedBack = function(){
                return $resource(baseURL+"feedback",null,  {'save':{method:'POST' }});
             };                  
        }])
;