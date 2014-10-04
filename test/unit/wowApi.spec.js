describe( "wowApi", function() {
	"use strict";

	var api,
		httpBackend,
		baseURL = "https://us.api.battle.net/",
		queryParams = "?apikey=API_KEY_PLACEHOLDER&jsonp=JSON_CALLBACK&locale=en_US";

	beforeEach(function() {

		module( "ngBattleNet" );

		var mockConfig = {
			getApiKey: function() { return "API_KEY_PLACEHOLDER"; },
			getDefaultRegion: function() { return "us"; }
		};

		module( function( $provide ) {
			$provide.value( "battleNetConfig", mockConfig );
		});

		inject(function( wowApi, $httpBackend ) {
			api = wowApi;
			httpBackend = $httpBackend;
		});

	});

	afterEach(function() {
		httpBackend.flush();
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	describe( "jsonp callback", function() {

		it( "should use 'jsonp' as the query param for the jsonp callback", function() {
			httpBackend.expectJSONP(/&jsonp=JSON_CALLBACK/).respond();
			api.achievement({ id: 2144 });
		});

	});

	describe( "achievement api", function() {

		describe( "achievement", function() {

			it( "should request /wow/achievement/2144", function() {
				httpBackend.expectJSONP( baseURL + "wow/achievement/2144" + queryParams ).respond();
				api.achievement({ id: 2144 });
			});

		});

	});

	describe( "auction api", function() {

		describe( "auction", function() {

			it( "should request /wow/auction/data/kil'jaeden", function() {
				httpBackend.expectJSONP( baseURL + "wow/auction/data/kil'jaeden" + queryParams ).respond();
				api.auction({ realm: "kil'jaeden" });
			});

		});

	});

	describe( "battle pet api", function() {

		describe( "ability", function() {

			it( "should request /wow/battlePet/ability/640", function() {
				httpBackend.expectJSONP( baseURL + "wow/battlePet/ability/640" + queryParams ).respond();
				api.battlePet.ability({ id: 640 });
			});

		});

		describe( "species", function() {

			it( "should request /wow/battlePet/species/640", function() {
				httpBackend.expectJSONP( baseURL + "wow/battlePet/species/640" + queryParams ).respond();
				api.battlePet.species({ id: 640 });
			});

		});

		describe( "stats", function() {

			it( "should request /wow/battlePet/stats/640", function() {
				httpBackend.expectJSONP( baseURL + "wow/battlePet/stats/640" + queryParams ).respond();
				api.battlePet.stats({ id: 640 });
			});

		});

	});

	describe( "challenge mode api", function() {

		describe( "realm", function() {

			it( "should request /wow/challenge/kil'jaeden", function() {
				httpBackend.expectJSONP( baseURL + "wow/challenge/kil'jaeden" + queryParams ).respond();
				api.challenge.realmLeaderboard({ realm: "kil'jaeden" });
			});

		});

		describe( "region", function() {

			it( "should request /wow/challenge/region", function() {
				httpBackend.expectJSONP( baseURL + "wow/challenge/region" + queryParams ).respond();
				api.challenge.regionLeaderboard();
			});

		});

	});

	describe( "character profile api", function() {

		describe( "profile", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd" + queryParams ).respond();
				api.character.profile({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		// for all the field specific stuff, we can't use our default queryparams string because fields gets added
		// right in the middle of the params.. so... long urls here.
		describe( "achievements", function() {

			it( "should request /wow/character/kil'jaeden/gewd?fields=achievements", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=achievements&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.achievements({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "appearance", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=appearance&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.appearance({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "feed", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=feed&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.feed({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "guild", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=guild&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.guild({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "hunterPets", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=hunterPets&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.hunterPets({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "items", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=items&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.items({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "mounts", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=mounts&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.mounts({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "pets", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=pets&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.pets({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "petSlots", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=petSlots&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.petSlots({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "progression", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=progression&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.progression({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "pvp", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=pvp&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.pvp({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "quests", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=quests&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.quests({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "reputation", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=reputation&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.reputation({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "stats", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=stats&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.stats({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "talents", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=talents&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.talents({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "titles", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=titles&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.titles({ name: "gewd", realm: "kil'jaeden" });
			});

		});

		describe( "audit", function() {

			it( "should request /wow/character/kil'jaeden/gewd", function() {
				httpBackend.expectJSONP( baseURL + "wow/character/kil'jaeden/gewd?apikey=API_KEY_PLACEHOLDER&fields=audit&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.character.audit({ name: "gewd", realm: "kil'jaeden" });
			});

		});

	});

	describe( "item api", function() {

		describe( "item", function() {

			it( "should request /wow/item/18803", function() {
				httpBackend.expectJSONP( baseURL + "wow/item/18803" + queryParams ).respond();
				api.item.item({ id: 18803 });
			});

		});

		describe( "set", function() {

			it( "should request /wow/item/set/1060", function() {
				httpBackend.expectJSONP( baseURL + "wow/item/set/1060" + queryParams ).respond();
				api.item.set({ id: 1060 });
			});

		});

	});

	describe( "guild profile api", function() {

		describe( "profile", function() {

			it( "should request /wow/guild/kil'jaeden/cognition", function() {
				httpBackend.expectJSONP( baseURL + "wow/guild/kil'jaeden/cognition" + queryParams ).respond();
				api.guild.profile({ name: "cognition", realm: "kil'jaeden" });
			});

		});

		// for all the field specific stuff, we can't use our default queryparams string because fields gets added
		// right in the middle of the params.. so... long urls here.
		describe( "members", function() {

			it( "should request /wow/guild/kil'jaeden/cognition", function() {
				httpBackend.expectJSONP( baseURL + "wow/guild/kil'jaeden/cognition?apikey=API_KEY_PLACEHOLDER&fields=members&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.guild.members({ name: "cognition", realm: "kil'jaeden" });
			});

		});

		describe( "achievements", function() {

			it( "should request /wow/guild/kil'jaeden/cognition", function() {
				httpBackend.expectJSONP( baseURL + "wow/guild/kil'jaeden/cognition?apikey=API_KEY_PLACEHOLDER&fields=achievements&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.guild.achievements({ name: "cognition", realm: "kil'jaeden" });
			});

		});

		describe( "news", function() {

			it( "should request /wow/guild/kil'jaeden/cognition", function() {
				httpBackend.expectJSONP( baseURL + "wow/guild/kil'jaeden/cognition?apikey=API_KEY_PLACEHOLDER&fields=news&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.guild.news({ name: "cognition", realm: "kil'jaeden" });
			});

		});

		describe( "challenge", function() {

			it( "should request /wow/guild/kil'jaeden/cognition", function() {
				httpBackend.expectJSONP( baseURL + "wow/guild/kil'jaeden/cognition?apikey=API_KEY_PLACEHOLDER&fields=challenge&jsonp=JSON_CALLBACK&locale=en_US" ).respond();
				api.guild.challenge({ name: "cognition", realm: "kil'jaeden" });
			});

		});

	});

	describe( "pvp api", function() {

		describe( "leaderboards", function() {

			it( "should request /wow/leaderboard/2v2", function() {
				httpBackend.expectJSONP( baseURL + "wow/leaderboard/2v2" + queryParams ).respond();
				api.pvp.leaderboards({ bracket: "2v2" });
			});

		});

	});

	describe( "quest api", function() {

		describe( "quest", function() {

			it( "should request /wow/quest/13146", function() {
				httpBackend.expectJSONP( baseURL + "wow/quest/13146" + queryParams ).respond();
				api.quest({ id: 13146 });
			});

		});

	});

	describe( "realm status api", function() {

		describe( "realmStatus", function() {

			it( "should request /wow/realm/status", function() {
				httpBackend.expectJSONP( baseURL + "wow/realm/status" + queryParams ).respond();
				api.realmStatus();
			});

			describe( "with realms param", function() {

				beforeEach(function() {
					httpBackend.expectJSONP( baseURL + "wow/realm/status" + queryParams + "&realms=shadow-council,blackwater-raiders" ).respond();
				});

				describe( "the format battle.net expects", function() {

					it( "should request /wow/realm/status?realms=shadow-council,blackwater-raiders", function() {
						api.realmStatus({ realms: "shadow-council,blackwater-raiders" });
					});

				});

				describe( "the formats people are actually going to use", function() {

					it( "should convert an array of realms to a comma delimited list", function() {
						api.realmStatus({ realms: [ "shadow-council", "blackwater-raiders" ] });
					});

					it( "should replace spaces with dashes", function() {
						api.realmStatus({ realms: "shadow council,blackwater raiders" });
					});

					it( "should convert an array of realms to a comma delimited list with spaces replaced", function() {
						api.realmStatus({ realms: [ "shadow council", "blackwater raiders" ] });
					});

				});

			});

		});

	});

	describe( "recipe api", function() {

		describe( "recipe", function() {

			it( "should request /wow/recipe/33994", function() {
				httpBackend.expectJSONP( baseURL + "wow/recipe/33994" + queryParams ).respond();
				api.recipe({ id: 33994 });
			});

		});

	});

	describe( "spell api", function() {

		describe( "spell", function() {

			it( "should request /wow/spell/8056", function() {
				httpBackend.expectJSONP( baseURL + "wow/spell/8056" + queryParams ).respond();
				api.spell({ id: 8056 });
			});

		});

	});

	describe( "data resources", function() {

		describe( "battlegroups", function() {

			it( "should request /wow/data/battlegroups/", function() {
				httpBackend.expectJSONP( baseURL + "wow/data/battlegroups/" + queryParams ).respond();
				api.data.battlegroups();
			});

		});

		describe( "characterRaces", function() {

			it( "should request /wow/data/character/races", function() {
				httpBackend.expectJSONP( baseURL + "wow/data/character/races" + queryParams ).respond();
				api.data.characterRaces();
			});

		});

		describe( "characterClasses", function() {

			it( "should request /wow/data/character/classes", function() {
				httpBackend.expectJSONP( baseURL + "wow/data/character/classes" + queryParams ).respond();
				api.data.characterClasses();
			});

		});

		describe( "characterAchievements", function() {

			it( "should request /wow/data/character/achievements", function() {
				httpBackend.expectJSONP( baseURL + "wow/data/character/achievements" + queryParams ).respond();
				api.data.characterAchievements();
			});

		});

		describe( "guildRewards", function() {

			it( "should request /wow/data/guild/rewards", function() {
				httpBackend.expectJSONP( baseURL + "wow/data/guild/rewards" + queryParams ).respond();
				api.data.guildRewards();
			});

		});

		describe( "guildPerks", function() {

			it( "should request /wow/data/guild/perks", function() {
				httpBackend.expectJSONP( baseURL + "wow/data/guild/perks" + queryParams ).respond();
				api.data.guildPerks();
			});

		});

		describe( "guildAchievements", function() {

			it( "should request /wow/data/guild/achievements", function() {
				httpBackend.expectJSONP( baseURL + "wow/data/guild/achievements" + queryParams ).respond();
				api.data.guildAchievements();
			});

		});

		describe( "itemClasses", function() {

			it( "should request /wow/data/item/classes", function() {
				httpBackend.expectJSONP( baseURL + "wow/data/item/classes" + queryParams ).respond();
				api.data.itemClasses();
			});

		});

		describe( "talents", function() {

			it( "should request /wow/data/talents", function() {
				httpBackend.expectJSONP( baseURL + "wow/data/talents" + queryParams ).respond();
				api.data.talents();
			});

		});

		describe( "petTypes", function() {

			it( "should request /wow/data/pet/types", function() {
				httpBackend.expectJSONP( baseURL + "wow/data/pet/types" + queryParams ).respond();
				api.data.petTypes();
			});

		});

	});

});