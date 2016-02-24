module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'resources/public/javascript/*.js', 'test/javascript/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        mocha_phantomjs: {
            options: {
                'reporter': 'dot'
            },
            all: ['test/javascript/*.html']
        },

        bower: {
            install: {
                options: {
                    copy: false,
                    install: true,
                    verbose: true,
                    force: true
                }
            },
        },

        concat: {
            js: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/d3/d3.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/lodash/lodash.min.js',
                    'bower_components/numeral/numeral.js',
                    'bower_components/chosen/chosen.jquery.js',
                    'bower_components/nouislider/jquery.nouislider.js',
                    'bower_components/nouislider/Link.js',
                    'bower_components/moment/moment.js',
                    'bower_components/angular-nouislider/src/nouislider.js',
                    'bower_components/topojson/topojson.js',
                    'bower_components/datamaps/dist/datamaps.all.js',
                    'bower_components/angular-chosen/chosen.js',
                    'bower_components/angular-feature-toggler/src/js/feature-toggler.js',
                    'bower_components/angular-piwik/dist/angular-piwik.js',
		            'bower_components/checklist-model/checklist-model.js',
		            'bower_components/intro.js/intro.js'
                ],
                dest: 'resources/public/vendor/dependencies.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'resources/public/vendor/dependencies.min.js': ['resources/public/vendor/dependencies.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.loadNpmTasks("grunt-bower-task");
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['test']);
    grunt.registerTask('compile', ['jshint', 'bower', 'concat', 'uglify']);
    grunt.registerTask('test', ['compile', 'mocha_phantomjs']);
};
