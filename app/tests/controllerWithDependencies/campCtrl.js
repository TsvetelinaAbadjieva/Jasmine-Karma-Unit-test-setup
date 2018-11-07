    angular.module('app.campaign1', [])
        .factory('Campaign1', function () {
            var Campaign1 = {};
            Campaign1.get = function () {
                return {
                    CPM: 1,
                    CPC: 2,
                    CPI: 3
                }
            }
            return Campaign1;
        })
        .controller('editCampaign',['$scope','Campaign1', function ($scope, Campaign1) {
            $scope.CampaignLoad = function(){
                $scope.Campaign = Campaign1.get();
            }
        }])
        // .config(function ($stateProvider) {
        //     $stateProvider
        //         .state('app.campaign1.editCampaign', {
        //             url: '/edit-campaign',
        //             template: '<ul><li>{{cpm}}<li><li>{{cpc}}<li><li>{{cpi}}<li></ul>',
        //             controller: 'editCampaign'
        //         })
        // })
