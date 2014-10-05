# ng-battlenet
An AngularJS wrapper for the Battle.net API. 

## API Keys
I started working on this before Blizzard switched to API keys instead of anonymous usage. It's not as useful anymore because your API key will be visible to anyone who cares to look, but I figured I might as well release it anyway.

Register for an API key at https://dev.battle.net

## Thanks!
Heavily inspired (read: I copied some stuff) by the Node wrapper: https://github.com/benweier/battlenet-api

## Installation

### Bower
Add `ng-battlenet` to your `bower.json` as a dependency, or run:

```
bower install --save ng-battlenet
```

Include `ng-battlenet.min.js` and `httpi.min.js` in your HTML:

``` html
<script src="bower_components/angular-httpi/build/httpi.min.js"></script>
<script src="bower_components/ng-battlenet/dist/ng-battlenet.min.js"></script>
```

### Manual
1. Download/clone/whatever `dist/ng-battlenet.min.js` or `src/ng-battlenet.js`
2. Get [httpi](https://github.com/bennadel/httpi)
3. Include both libraries in your HTML:

``` html
<script src="path/to/js/httpi.min.js"></script>
<script src="path/to/js/ng-battlenet.min.js"></script>
```

## Dependencies
Requires AngularJS and Ben Nadel's [httpi](https://github.com/bennadel/httpi).

## Usage
Add the `ngBattleNet` dependency to your module:

``` js
var myApp = angular.module( "myApp", [ "ngBattleNet" ] );
```

Configure the API with your API key and (optionally) the default region. If the region isn't set here, it will default to "us".

``` js
myApp.config(function( battleNetConfigProvider ) {
	battleNetConfigProvider.setApiKey( "foo" );
	battleNetConfigProvider.setDefaultRegion( "eu" );
});
```

Inject any (or all) of the services into your controller/service. The `battleNetApi` service contains all three available APIs, via `battleNetApi.d3`, `battleNetApi.sc2`, and `battleNetApi.wow`. If you only need one of the APIs, you can inject the individual API via `d3Api`, `sc2Api`, or `wowApi`.

``` js
myApp.controller( "MyCtrl", [ "battleNetApi", function( battleNetApi ) {
	battleNetApi.wow.character.profile({ name: "Gewd", realm: "Kil'Jaeden" }).then(function( response ) {
		// do stuff with the response!
	});
}])
```

## Documentation
All Diablo 3, Starcraft 2, and World of Warcraft endpoints from https://dev.battle.net/io-docs have been implemented.

Each method will return a promise:

``` js
wowApi.challenge.regionLeaderboard().then(function( response ) {
	// do stuff with the response!
});
```

Each method accepts a `params` object that is used to populate the URL. When populating the URL, parameters are first checked against the URL's named parameters (e.g. `:realm`) and any left over parameters will be appended as a query string. The majority of the methods are configured with the same named parameters as the ones defined in the Battle.net API documentation, but there are a few exceptions:

All instances of `:charactername` are replaced by `:name`:

``` js
// works
wowApi.character.profile({ name: "Gewd", realm: "Kil'Jaeden" });

// doesn't work
wowApi.character.profile({ charactername: "Gewd", realm: "Kil'Jaeden" });

```

All instances of `:guildname` are replaced by `:name`:
``` js
// works
wowApi.guild.profile({ name: "Cognition", realm: "Kil'Jaeden" });

// doesn't work
wowApi.guild.profile({ guildname: "Cognition", realm: "Kil'Jaeden" });
```

All instances of `:fooID` are replaced by `:id`:
``` js
// works
wowApi.achievement({ id: 2144 });

// doesn't work
wowApi.achievement({ achievementID: 2144 });
```

Endpoints are implemented by section as listed in the official API docs:

If a given section contains only one endpoint (the WoW achievement API, for example), it can be accessed like this:

``` js
// /wow/achievement/2144
wowApi.achievement({ id: 2144 });
```

If a section contains multiple endpoints (the WoW Battle Pet API, for example), the endpoints can be accessed like this:

``` js
// /wow/battlePet/ability/640
wowApi.battlePet.ability({ id: 640 });

// /wow/battlePet/species/258
wowApi.battlePet.species({ id: 258 });

// /wow/battlePet/stats/258?level=25&breedId=5&qualityId=4
wowApi.battlePet.stats({ id: 258, level: 25, breedId: 5, qualityId: 4 });
```

*Full documentation of each method is coming soon. For now, you might have to poke in the source code a little bit. :)*