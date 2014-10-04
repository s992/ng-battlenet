describe( "sc2Api", function() {
	"use strict";

	var api,
		httpBackend,
		baseURL = "https://us.api.battle.net/",
		queryParams = "?apikey=API_KEY_PLACEHOLDER&callback=JSON_CALLBACK&locale=en_US";

	beforeEach(function() {

		module( "ngBattleNet" );

		var mockConfig = {
			getApiKey: function() { return "API_KEY_PLACEHOLDER"; },
			getDefaultRegion: function() { return "us"; }
		};

		module( function( $provide ) {
			$provide.value( "battleNetConfig", mockConfig );
		});

		inject(function( sc2Api, $httpBackend ) {
			api = sc2Api;
			httpBackend = $httpBackend;
		});

	});

	afterEach(function() {
		httpBackend.flush();
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	describe( "jsonp callback", function() {

		it( "should use 'callback' as the query param for the jsonp callback", function() {
			httpBackend.expectJSONP(/&callback=JSON_CALLBACK/).respond();
			api.data.achievements();
		});

	});

	describe( "data resources", function() {

		describe( "achievements", function() {

			it( "should request /sc2/data/achievements", function() {
				httpBackend.expectJSONP( baseURL + "sc2/data/achievements" + queryParams ).respond();
				api.data.achievements();
			});

		});

		describe( "rewards", function() {

			it( "should request /sc2/data/rewards", function() {
				httpBackend.expectJSONP( baseURL + "sc2/data/rewards" + queryParams ).respond();
				api.data.rewards();
			});

		});

	});

	describe( "ladder api", function() {

		describe( "ladder", function() {

			it( "should request /sc2/ladder/655", function() {
				httpBackend.expectJSONP( baseURL + "sc2/ladder/655" + queryParams ).respond();
				api.ladder({ id: 655 });
			});

		});

	});

	describe( "profile api", function() {

		describe( "profile", function() {

			it( "should request /sc2/profile/123/1/gewd/", function() {
				httpBackend.expectJSONP( baseURL + "sc2/profile/123/1/gewd/" + queryParams ).respond();
				api.profile.profile({ id: 123, region: 1, name: "gewd" });
			});

		});

		describe( "ladders", function() {

			it( "should request /sc2/profile/123/1/gewd/ladders", function() {
				httpBackend.expectJSONP( baseURL + "sc2/profile/123/1/gewd/ladders" + queryParams ).respond();
				api.profile.ladders({ id: 123, region: 1, name: "gewd" });
			});

		});

		describe( "matchHistory", function() {

			it( "should request /sc2/profile/123/1/gewd/matches", function() {
				httpBackend.expectJSONP( baseURL + "sc2/profile/123/1/gewd/matches" + queryParams ).respond();
				api.profile.matchHistory({ id: 123, region: 1, name: "gewd" });
			});

		});

	});

});