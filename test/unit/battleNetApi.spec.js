describe( "battleNetApi", function() {
	"use strict";

	var api;

	beforeEach(function() {

		module( "ngBattleNet" );

		inject(function( battleNetApi, $httpBackend ) {
			api = battleNetApi;
		});

	});

	it( "should contain the diablo 3 api", function() {
		expect( api.d3 ).toBeDefined();
	});

	it( "should contain the starcraft 2 api", function() {
		expect( api.sc2 ).toBeDefined();
	});

	it( "should contain the wow api", function() {
		expect( api.wow ).toBeDefined();
	});

});