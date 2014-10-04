angular.module( "ngBattleNet", [ "httpi" ] )

.provider( "battleNetConfig", function battleNetConfig() {
	"use strict";

	var config = {
		apiKey: null,
		defaultRegion: "us"
	};

	this.setApiKey = function( apiKey ) {
		config.apiKey = apiKey;
	};

	this.getApiKey = function( apiKey ) {
		return config.apiKey;
	};

	this.setDefaultRegion = function( defaultRegion ) {
		config.defaultRegion = defaultRegion;
	};

	this.getDefaultRegion = function( defaultRegion ) {
		return config.defaultRegion;
	};

	this.$get = [function() {
		return this;
	}];

})

.factory( "battleNetApiRequest", [ "battleNetConfig", "httpi", function battleNetApiRequest( battleNetConfig, httpi ) {
	"use strict";

	// some endpoints have a "region" parameter, so we'll use "bnetRegion" internally to avoid conflicts.
	var host = "https://:bnetRegion.api.battle.net/",
		defaultParams = {
			apikey: battleNetConfig.getApiKey()
		},
		regionLocales = {
			us: "en_US",
			eu: "en_GB",
			sea: "en_US",
			kr: "ko_KR",
			tw: "zh_TW"
		};

	return function( path, params ) {

		var url = host + path;

		params = params || {};
		angular.extend( params, defaultParams );
		params.bnetRegion = params.bnetRegion || battleNetConfig.getDefaultRegion();
		params.locale = params.locale || regionLocales[ params.bnetRegion ];

		return httpi({
			method: "jsonp",
			url: url,
			params: params,
			keepTrailingSlash: true
		});

	};

}])

.factory( "battleNetApi", [ "d3Api", "sc2Api", "wowApi", function battleNetApi( d3Api, sc2Api, wowApi ) {
	"use strict";

	return {
		d3: d3Api,
		sc2: sc2Api,
		wow: wowApi
	};
}])

.factory( "d3Api", [ "battleNetApiRequest", function d3Api( battleNetApiRequest ) {
	"use strict";

	var service = {};

	function makeRequest( path, params ) {
		params = params || {};
		angular.extend( params, { callback: "JSON_CALLBACK" });
		return battleNetApiRequest( "d3/" + path, params );
	}

	// no hashes allowed, but people are going to try it anyway
	function convertBattleTag( battletag ) {
		return battletag.replace(/#/g, "-");
	}

	service.data = {
		artisan: function( params ) {
			return makeRequest( "data/artisan/:artisan", params );
		},
		follower: function( params ) {
			return makeRequest( "data/follower/:follower", params );
		},
		item: function( params ) {
			return makeRequest( "data/item/:data", params );
		}
	};


	service.profile = {
		career: function( params ) {
			params.battletag = convertBattleTag( params.battletag );
			return makeRequest( "profile/:battletag/", params );
		},
		hero: function( params ) {
			params.battletag = convertBattleTag( params.battletag );
			return makeRequest( "profile/:battletag/hero/:id", params );
		}
	};

	return service;

}])

.factory( "sc2Api", [ "battleNetApiRequest", function sc2Api( battleNetApiRequest ) {
	"use strict";

	var service = {};

	function makeRequest( path, params ) {
		params = params || {};
		angular.extend( params, { callback: "JSON_CALLBACK" });
		return battleNetApiRequest( "sc2/" + path, params );
	}

	service.data = {
		achievements: function( params ) {
			return makeRequest( "data/achievements", params );
		},
		rewards: function( params ) {
			return makeRequest( "data/rewards", params );
		}
	};


	service.ladder = function( params ) {
		return makeRequest( "ladder/:id", params );
	};


	service.profile = {
		profile: function( params ) {
			return makeRequest( "profile/:id/:region/:name/", params );
		},
		ladders: function( params ) {
			return makeRequest( "profile/:id/:region/:name/ladders", params );
		},
		matchHistory: function( params ) {
			return makeRequest( "profile/:id/:region/:name/matches", params );
		}
	};

	return service;

}])

.factory( "wowApi", [ "battleNetApiRequest", function wowApi( battleNetApiRequest ) {
	"use strict";

	var service = {};

	function makeRequest( path, params ) {
		params = params || {};
		angular.extend( params, { jsonp: "JSON_CALLBACK" });
		return battleNetApiRequest( "wow/" + path, params );
	}

	// characters and guilds have a lot of endpoints that are basically the same with the
	// exception of adding &fields=foo to the URL. we can get rid of a lot of boilerplate
	// by using this method instead of writing it out for each endpoint.
	function withField( field, callback ) {
		return function( params ) {
			angular.extend( params, { fields: field });
			return callback( params );
		};
	}


	service.achievement = function( params ) {
		return makeRequest( "achievement/:id", params );
	};


	service.auction = function( params ) {
		return makeRequest( "auction/data/:realm", params );
	};


	service.battlePet = {
		ability: function( params ) {
			return makeRequest( "battlePet/ability/:id", params );
		},
		species: function( params ) {
			return makeRequest( "battlePet/species/:id", params );
		},
		stats: function( params ) {
			return makeRequest( "battlePet/stats/:id", params );
		}
	};


	service.challenge = {
		realmLeaderboard: function( params ) {
			return makeRequest( "challenge/:realm", params );
		},
		regionLeaderboard: function( params ) {
			return makeRequest( "challenge/region", params );
		}
	};


	service.character = {
		profile: function( params ) {

			if( params && params.fields && Array.isArray( params.fields ) ) {
				params.fields = params.fields.join(",");
			}

			return makeRequest( "character/:realm/:name", params );

		}
	};

	service.character.achievements 	= withField( "achievements", service.character.profile );
	service.character.appearance 	= withField( "appearance", service.character.profile );
	service.character.feed 			= withField( "feed", service.character.profile );
	service.character.guild 		= withField( "guild", service.character.profile );
	service.character.hunterPets 	= withField( "hunterPets", service.character.profile );
	service.character.items 		= withField( "items", service.character.profile );
	service.character.mounts 		= withField( "mounts", service.character.profile );
	service.character.pets 			= withField( "pets", service.character.profile );
	service.character.petSlots 		= withField( "petSlots", service.character.profile );
	service.character.progression 	= withField( "progression", service.character.profile );
	service.character.pvp 			= withField( "pvp", service.character.profile );
	service.character.quests 		= withField( "quests", service.character.profile );
	service.character.reputation 	= withField( "reputation", service.character.profile );
	service.character.stats 		= withField( "stats", service.character.profile );
	service.character.talents 		= withField( "talents", service.character.profile );
	service.character.titles 		= withField( "titles", service.character.profile );
	service.character.audit 		= withField( "audit", service.character.profile );


	service.data = {
		battlegroups: function( params ) {
			return makeRequest( "data/battlegroups/", params );
		},
		characterRaces: function( params ) {
			return makeRequest( "data/character/races", params );
		},
		characterClasses: function( params ) {
			return makeRequest( "data/character/classes", params );
		},
		characterAchievements: function( params ) {
			return makeRequest( "data/character/achievements", params );
		},
		guildRewards: function( params ) {
			return makeRequest( "data/guild/rewards", params );
		},
		guildPerks: function( params ) {
			return makeRequest( "data/guild/perks", params );
		},
		guildAchievements: function( params ) {
			return makeRequest( "data/guild/achievements", params );
		},
		itemClasses: function( params ) {
			return makeRequest( "data/item/classes", params );
		},
		talents: function( params ) {
			return makeRequest( "data/talents", params );
		},
		petTypes: function( params ) {
			return makeRequest( "data/pet/types", params );
		}
	};


	service.guild = {
		profile: function( params ) {

			if( params && params.fields && Array.isArray( params.fields ) ) {
				params.fields = params.fields.join(",");
			}

			return makeRequest( "guild/:realm/:name", params );
			
		}
	};

	service.guild.members 		= withField( "members", service.guild.profile );
	service.guild.achievements 	= withField( "achievements", service.guild.profile );
	service.guild.news 			= withField( "news", service.guild.profile );
	service.guild.challenge 	= withField( "challenge", service.guild.profile );


	service.item = {
		item: function( params ) {
			return makeRequest( "item/:id", params );
		},
		set: function( params ) {
			return makeRequest( "item/set/:id", params );
		}
	};


	service.pvp = {
		leaderboards: function( params ) {
			return makeRequest( "leaderboard/:bracket", params );
		}
	};


	service.quest = function( params ) {
		return makeRequest( "quest/:id", params );
	};


	service.realmStatus = function( params ) {

		if( params && params.realms ) {

			if( Array.isArray( params.realms ) ) {
				params.realms = params.realms.join(",");
			}

			params.realms = params.realms.replace(/\s/g, "-");

		}

		return makeRequest( "realm/status", params );

	};


	service.recipe = function( params ) {
		return makeRequest( "recipe/:id", params );
	};


	service.spell = function( params ) {
		return makeRequest( "spell/:id", params );
	};

	return service;

}]);