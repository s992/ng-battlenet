describe( "d3Api", function() {
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

		inject(function( d3Api, $httpBackend ) {
			api = d3Api;
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
			api.data.item({ data: "Unique_Gloves_003_x1" });
		});

	});

	describe( "data resources", function() {

		describe( "item data", function() {

			it( "should request /d3/data/item/Unique_Gloves_003_x1", function() {
				httpBackend.expectJSONP( baseURL + "d3/data/item/Unique_Gloves_003_x1" + queryParams ).respond();
				api.data.item({ data: "Unique_Gloves_003_x1" });
			});

		});

		describe( "follower data", function() {

			it( "should request /d3/data/follower/templar", function() {
				httpBackend.expectJSONP( baseURL + "d3/data/follower/templar" + queryParams ).respond();
				api.data.follower({ follower: "templar" });
			});

		});

		describe( "artisan data", function() {

			it( "should request /d3/data/artisan/blacksmith", function() {
				httpBackend.expectJSONP( baseURL + "d3/data/artisan/blacksmith" + queryParams ).respond();
				api.data.artisan({ artisan: "blacksmith" });
			});

		});

	});

	describe( "profile api", function() {

		describe( "career", function() {

			beforeEach(function() {
				httpBackend.expectJSONP( baseURL + "d3/profile/gewd-1952/" + queryParams ).respond();
			});

			it( "should request /d3/profile/gewd-1952/", function() {
				api.profile.career({ battletag: "gewd-1952" });
			});

			it( "should still work if the user passes battletag with a hash", function() {
				api.profile.career({ battletag: "gewd#1952" });
			});

		});

		describe( "hero", function() {

			beforeEach(function() {
				httpBackend.expectJSONP( baseURL + "d3/profile/gewd-1952/hero/123" + queryParams ).respond();
			});

			it( "should request /d3/profile/gewd-1952/123", function() {
				api.profile.hero({ battletag: "gewd-1952", id: 123 });
			});

			it( "should still work if the user passes battletag with a hash", function() {
				api.profile.hero({ battletag: "gewd#1952", id: 123 });
			});

		});

	});

});