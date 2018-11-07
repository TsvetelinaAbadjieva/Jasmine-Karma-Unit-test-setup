/**
 * In this is a controller are calculated the maximum of the minimum costs per selected country list
 * 
 */
var app = angular.module('app.campaign', []);
app.controller('CostController', ['$scope', function ($scope) {

    $scope.Init = function () {
        $scope.selectedCountries = [105, 165, 1];
        $scope.countrylist = [
            {
                id: 105,
                name: 'Jordan'
            },
            {
                id: 165,
                name: 'Poland'
            },
            {
                id: 1,
                name: 'Bulgaria'
            },

        ];
        $scope.minCostsPerCountry = [];

    }
    $scope.setMinCostsPerCountry = function (selectedCountriesIds) {
        var minCostsPerCountry = [];
        var selectedCountries = [];

        if (!selectedCountriesIds || selectedCountriesIds.length == 0 || !$scope.countrylist) {
            return {
                id: null,
                country: 'Default',
                minCPM: 5,
                minCPC: 1,
                minCPI: 2
            }
        }

        for (var i in selectedCountriesIds) {
            var key = selectedCountriesIds[i];
            var country = $scope.countrylist.filter(item => {
                if (item.id == key)
                    return item
            })
            selectedCountries.push({ id: key, country: country[0].name })
        }
        selectedCountries.forEach(element => {
            switch (element.country) {
                case "Poland": minCostsPerCountry.push({
                    id: element.id,
                    country: "Poland",
                    minCPM: 1.70,
                    minCPC: 0.20,
                    minCPI: 0.65
                }); break;
                case "Jordan": minCostsPerCountry.push({
                    id: element.id,
                    country: "Jordan",
                    minCPM: 3,
                    minCPC: 0.3,
                    minCPI: 1
                }); break;
                default: minCostsPerCountry.push({
                    id: element.id,
                    country: element.country,
                    minCPM: 5,
                    minCPC: 1,
                    minCPI: 2
                })
            };
        });
        return minCostsPerCountry;
    }

    $scope.calculateCampaignMinCost = function (selectedCountriesIds) {
        var minCostsPerCountry = {};

        var minCostCPM = 0;
        var minCostCPC = 0;
        var minCostCPI = 0;

        if (!selectedCountriesIds || selectedCountriesIds.length == 0 || !$scope.countrylist) {
            minCostsPerCountry = $scope.setMinCostsPerCountry(selectedCountriesIds);
            return {
                CPM: 5,
                CPC: 1,
                CPI: 2
            }
        }
        minCostsPerCountry = $scope.setMinCostsPerCountry(selectedCountriesIds);
        $scope.minCostsPerCountry = minCostsPerCountry;
        for (var i in selectedCountriesIds) {
            minCostsPerCountry.forEach((item) => {
                if (item.id == selectedCountriesIds[i]) {
                    if (minCostCPM < item.minCPM) {
                        minCostCPM = item.minCPM;
                    }
                    if (minCostCPI < item.minCPI) {
                        minCostCPI = item.minCPI;
                    }
                    if (minCostCPC < item.minCPC) {
                        minCostCPC = item.minCPC;
                    }
                }
            })
        }
        console.log({
            CPM: minCostCPM,
            CPC: minCostCPC,
            CPI: minCostCPI
        });
        return {
            CPM: minCostCPM,
            CPC: minCostCPC,
            CPI: minCostCPI
        }

    }

    $scope.Init();
    $scope.minCost = $scope.calculateCampaignMinCost($scope.selectedCountries);
}])