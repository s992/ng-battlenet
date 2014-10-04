describe( "battleNetConfig", function() {
	"use strict";

	var configProvder;

	beforeEach(function() {

		var testApp = angular.module("testApp", function() {});

		testApp.config(function( battleNetConfigProvider ) {
			configProvder = battleNetConfigProvider;
		});

		module("ngBattleNet", "testApp");

		inject(function() {});

	});

	describe( "with default config", function() {

		it( "should have a null apiKey", function() {
			expect( configProvder.getApiKey() ).toBe( null );
		});

		it( "should have a default region of 'us'", function() {
			expect( configProvder.getDefaultRegion() ).toBe( "us" );
		});

	});

	describe( "with custom config", function() {

		beforeEach(function() {
			configProvder.setApiKey( "asdf123" );
			configProvder.setDefaultRegion( "kr" );
		});

		it( "should have 'asdf123' as the apiKey", function() {
			expect( configProvder.getApiKey() ).toBe( "asdf123" );
		});

		it( "should have a default region of 'kr'", function() {
			expect( configProvder.getDefaultRegion() ).toBe( "kr" );
		});

	});

});