describe('Controllers', function () {
    beforeEach(function () {
        module('app.campaign');
    });
    var $controller;
    var $scope;
    var countrylist = [
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
    var selectedCountriesIds = [105, 165, 1];
    var emptyCountrylistIds = [];
    var twoSelectedCountrylistIds = [105, 165];
    var minCostsPerCountry = [
        {
            id: 105,
            country: "Jordan",
            minCPM: 3,
            minCPC: 0.3,
            minCPI: 1
        },
        {
            id: 165,
            country: "Poland",
            minCPM: 1.70,
            minCPC: 0.20,
            minCPI: 0.65
        },

        {
            id: 1,
            country: "Bulgaria",
            minCPM: 5,
            minCPC: 1,
            minCPI: 2
        }
    ];

    var result = {
        CPM: 5,
        CPC: 1,
        CPI: 2
    };
    var minCost;

    describe('CostController', function () {

        beforeEach(inject(function (_$controller_, _$rootScope_) {
            $scope = _$rootScope_.$new();
            $controller = _$controller_('CostController', { '$scope': $scope });
        }));

        it('Should call Controller.Init function', function () {
            spyOn($scope, 'Init');
            $scope.Init();
            expect($scope.Init).toHaveBeenCalled();
            console.log('Controller.Init function is called...');
        });

        describe('Should set Default minimums for empty countrylist', function () {
            var emptyCountrylistIds = [];
            var defaultResult = {
                id: null,
                country: 'Default',
                minCPM: 5,
                minCPC: 1,
                minCPI: 2
            };
            var minCost = {
                CPM: 5,
                CPC: 1,
                CPI: 2
            }
            it('Check if $scope.setMinCostPerCountry is called', function () {
                spyOn($scope, 'setMinCostsPerCountry');
                $scope.setMinCostsPerCountry(emptyCountrylistIds);
                expect($scope.setMinCostsPerCountry).toHaveBeenCalled();
                console.log('Controller.setMinCostsPerCountry function is called...');

            })
            it('Check  $scope.setMinCostPerCountry for empty list of countries...', function () {
                var result = $scope.setMinCostsPerCountry(emptyCountrylistIds);
                expect($scope.setMinCostsPerCountry(emptyCountrylistIds)).toEqual(defaultResult);
                console.log('Controller.setMinCostsPerCountry function For Empty Countrylistis calculated...', result);
            })
            it('Calculate Min Cost per Empty Country', function () {
                expect($scope.calculateCampaignMinCost(emptyCountrylistIds)).toEqual(minCost);
                console.log('Controller.calculateCampaignMinCost(emptyCountrylistIds) function is calculated...', minCost);

            });


        });

        describe('Calculation of minimum Cost for set of countries...', function () {
            var selectedCountriesIds = [105, 165];
            var minCost = {
                CPM: 5,
                CPC: 1,
                CPI: 2
            }
            var setMinCostPerCountry = [
                {
                    id: 105,
                    country: "Jordan",
                    minCPM: 3,
                    minCPC: 0.3,
                    minCPI: 1
                },
                {
                    id: 165,
                    country: "Poland",
                    minCPM: 1.70,
                    minCPC: 0.20,
                    minCPI: 0.65
                },
            ];
            var expectedResult = {
                CPM: 3,
                CPC: 0.3,
                CPI: 1
            }

            var selectedCountriesIds1 = [165];
            var expectedResult1 = {
                CPM: 1.70,
                CPC: 0.20,
                CPI: 0.65
            }

            it('Check if $scope.setMinCostPerCountry is called', function () {
                spyOn($scope, 'setMinCostsPerCountry');
                $scope.setMinCostsPerCountry(selectedCountriesIds);
                expect($scope.setMinCostsPerCountry).toHaveBeenCalled();
                console.log('Controller.setMinCostsPerCountry function is called...');

            })
            it('Check if $scope.calculateCampaignMinCost is called', function () {
                spyOn($scope, 'calculateCampaignMinCost');
                $scope.calculateCampaignMinCost(selectedCountriesIds);
                expect($scope.calculateCampaignMinCost).toHaveBeenCalled();
                console.log('Controller.calculateCampaignMinCost function is called...\n', selectedCountriesIds);
            });
            it('Calculate Min Cost per Country', function () {
                expect($scope.setMinCostsPerCountry(selectedCountriesIds)).toEqual(setMinCostPerCountry);
                console.log('Controller.calculateCampaignMinCost function is called...\n', setMinCostPerCountry);

            });
            it('Calculate Min Cost per Country', function () {
                expect($scope.calculateCampaignMinCost(selectedCountriesIds)).toEqual(expectedResult);
                console.log('Controller.calculateCampaignMinCost function is called...\n', expectedResult);
            });

            it('Calculate Min Cost per Country', function () {
                expect($scope.calculateCampaignMinCost(selectedCountriesIds1)).toEqual(expectedResult1);
                console.log('Controller.calculateCampaignMinCost function is called...\n', expectedResult1);
            });
        })
    })
})