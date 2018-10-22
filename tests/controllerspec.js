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
            name: 'Bilgaria'
        },
    ];
    var selectedCountriesIds = [105, 165, 1];
    var minCostsPerCountry = [
        {
            id: 165,
            country: "Poland",
            minCPM: 1.70,
            minCPC: 0.20,
            minCPI: 0.65
        },
        {
            id: 105,
            country: "Jordan",
            minCPM: 3,
            minCPC: 0.3,
            minCPI: 1
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
    var minCost = {};

    describe('CostController', function () {
        beforeEach(inject(function (_$controller_, _$rootScope_) {
            $scope = _$rootScope_.$new();
            $controller = _$controller_('CostController', { '$scope': $scope });
        }));
        it('Should call Init function', function(){
            console.log('hei')
            spyOn($scope,'Init');
            $scope.Init();            
            expect($scope.Init).toHaveBeenCalled();
        })
        it('Check properties from the scope', function () {
            expect($scope.selectedCountries).toEqual(selectedCountriesIds);
            expect($scope.countrylist).toBeDefined();
            expect($scope.countrylist).toEqual(countrylist);
        });
        it('SetMinCost per Counry', function () {
            spyOn($scope, 'setMinCostsPerCountry');
            minCost = $scope.setMinCostsPerCountry(selectedCountriesIds);
            expect($scope.setMinCostsPerCountry).toHaveBeenCalled();
            expect(minCost).toEqual(minCostsPerCountry);
        });
        // it('Calculate Min Cost per Counry', function () {
        //     expect(controller.calculateCampaignMinCost(selectedCountriesIds)).toEqual(result);
        // });
    })
})