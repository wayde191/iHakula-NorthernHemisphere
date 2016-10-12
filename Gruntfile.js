module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'resources/public/javascript/*.js', 'test/javascript/**/*.js'],
            options: {
                reporterOutput: "",
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
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/moment/moment.js',
                    'bower_components/angular-nouislider/src/nouislider.js',
                    'bower_components/angular-chosen/chosen.js',
                    'bower_components/underscore/underscore.js',

                    'resources/public/javascript/date-utils.js',
                    'resources/public/javascript/env.js',
                    'resources/public/javascript/countdown-clock.js',

                    'resources/public/vendors/flot/jquery.flot.min.js',
                    'resources/public/vendors/flot/jquery.flot.resize.min.js',
                    'resources/public/vendors/flot/jquery.flot.pie.min.js',
                    'resources/public/vendors/flot/jquery.flot.tooltip.js',
                    'resources/public/vendors/bootstrap-growl/bootstrap-growl.min.js',
                    'resources/public/vendors/sweet-alert/sweet-alert.min.js',

                    'resources/public/vendors/pull-refresh/idangerous.swiper.min.js'
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
