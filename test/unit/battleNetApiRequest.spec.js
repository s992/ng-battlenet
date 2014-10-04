describe( "battleNetApiRequest", function() {
	"use strict";

	var request,
		httpBackend;

	beforeEach(function() {

		module( "ngBattleNet" );

		var mockConfig = {
			getApiKey: function() { return "API_KEY_PLACEHOLDER"; },
			getDefaultRegion: function() { return "us"; }
		};

		module( function( $provide ) {
			$provide.value( "battleNetConfig", mockConfig );
		});

		inject(function( battleNetApiRequest, $httpBackend ) {
			request = battleNetApiRequest;
			httpBackend = $httpBackend;
		});

	});

	afterEach(function() {
		httpBackend.flush();
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	describe( "using defaults", function() {

		it( "should make a request with the default config options if they are not specified", function() {

			httpBackend.expectJSONP( "https://us.api.battle.net/path/to/resource?apikey=API_KEY_PLACEHOLDER&locale=en_US" ).respond();
			request( "path/to/resource" );

		});

	});

	describe( "using custom params", function() {

		it( "should make a request using custom params", function() {

			httpBackend.expectJSONP( "https://tw.api.battle.net/path/to/resource/123?apikey=API_KEY_PLACEHOLDER&locale=zh_TW" ).respond();
			request( "path/to/resource/:id", {
				bnetRegion: "tw",
				id: 123
			});

		});

		it( "should leave my trailing slashes alone", function() { // thanks, @bennadel! :D

			httpBackend.expectJSONP( "https://us.api.battle.net/path/to/resource/123/?apikey=API_KEY_PLACEHOLDER&locale=en_US" ).respond();
			request( "path/to/resource/:id/", {
				id: 123
			});

		});

	});

	describe( "locales", function() {

		it( "should use en_US when bnetRegion == us", function() {

			httpBackend.expectJSONP( "https://us.api.battle.net/path/to/resource?apikey=API_KEY_PLACEHOLDER&locale=en_US" ).respond();
			request( "path/to/resource", {
				bnetRegion: "us"
			});

		});

		it( "should use en_GB when bnetRegion == eu", function() {

			httpBackend.expectJSONP( "https://eu.api.battle.net/path/to/resource?apikey=API_KEY_PLACEHOLDER&locale=en_GB" ).respond();
			request( "path/to/resource", {
				bnetRegion: "eu"
			});

		});

		it( "should use en_US when bnetRegion == sea", function() {

			httpBackend.expectJSONP( "https://sea.api.battle.net/path/to/resource?apikey=API_KEY_PLACEHOLDER&locale=en_US" ).respond();
			request( "path/to/resource", {
				bnetRegion: "sea"
			});

		});

		it( "should use ko_KR when bnetRegion == kr", function() {

			httpBackend.expectJSONP( "https://kr.api.battle.net/path/to/resource?apikey=API_KEY_PLACEHOLDER&locale=ko_KR" ).respond();
			request( "path/to/resource", {
				bnetRegion: "kr"
			});

		});

		it( "should use zh_TW when bnetRegion == tw", function() {

			httpBackend.expectJSONP( "https://tw.api.battle.net/path/to/resource?apikey=API_KEY_PLACEHOLDER&locale=zh_TW" ).respond();
			request( "path/to/resource", {
				bnetRegion: "tw"
			});

		});

	});

});