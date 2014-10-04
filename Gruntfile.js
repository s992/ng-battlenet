module.exports = function( grunt ) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		bower: {
			install : {}
		},
		jshint: {
			files: [ "src/ng-battlenet.js", "test/**/*.js" ],
			options: {
				"jshintrc": ".jshintrc"
			}
		},
		karma: {
			options: {
				basePath: "./",
				frameworks: [ "jasmine" ],
				browsers: [ "Chrome" ],
				autoWatch: true,
				files: [
					"lib/angular/angular.js",
					"lib/angular-httpi/lib/httpi.js",
					"lib/angular-mocks/angular-mocks.js",
					"src/ng-battlenet.js",
					"test/unit/*.spec.js"
				]
			},
			once: {
				singleRun: true
			},
			continuous: {
				singleRun: false
			}
		},
		uglify: {
			task1: {
				options: {
					preserveComments: "some",
					report: "min"
				},
				files: {
					"dist/ng-battlenet.min.js": [ "src/ng-battlenet.js" ]
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-bower-task");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-karma");

	grunt.registerTask( "default", [ "bower", "jshint", "uglify:task1" ]);
	grunt.registerTask( "build", [ "bower", "jshint", "karma:once", "uglify:task1" ]);
	grunt.registerTask( "watch", [ "bower", "karma:continuous" ]);

};