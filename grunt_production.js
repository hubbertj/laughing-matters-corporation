module.exports = function(grunt) {
    // Project configuration.

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            pre: ['build'],
            post: ['build/js/controllers',
                'build/js/*js',
                'build/js/libs',
                'build/css/css',
                'build/css/*less'
            ]
        },

        ngAnnotate: {
            demo: {
                files: {
                    'build/js/app.js': ['build/js/app.js'],
                    'build/js/directives.js': ['build/js/directives.js']
                },
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            js: {
                files: [{
                    src: 'build/js/min/<%= pkg.name %>.js',
                    dest: 'build/js/min/<%= pkg.name %>.min.js'
                }]
            }
        },
        concat: {
            libsJS: {
                src: [
                    //NOTE- If we add more libs there need to be added to the build here;
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/moment/moment.js',
                    'node_modules/angular/angular.js',
                    'node_modules/ng-places-autocomplete/ngPlacesAutocomplete.min.js',
                    'node_modules/angular-morris/build/module/angular-morris/angular-morris.min.js',
                    'node_modules/angular-bootstrap-toggle/dist/angular-bootstrap-toggle.min.js',
                    'node_modules/angular-animate/angular-animate.min.js',
                    'build/js/libs/showErrors.js',
                    'build/js/app.js',
                    'build/js/directives.js',

                    //controllers
                    'build/js/controllers/accountCtrl.js',
                    'build/js/controllers/dashboardCtrl.js',
                    'build/js/controllers/patronCtrl.js',
                    'build/js/controllers/gameCtrl.js',
                    'build/js/controllers/reportsCtrl.js',
                    'build/js/controllers/generalCtrl.js',
                    'build/js/controllers/confirmationCtrl.js',
                    'build/js/controllers/profileCtrl.js',
                    'build/js/controllers/modalCtrls.js',
                    'build/js/controllers/retrieveCtrl.js',
                    'build/js/controllers/organizationCtrl.js',
                    'build/js/controllers/adminCtrl.js',

                    //libs
                    'build/js/libs/ui-bootstrap-custom-tpls-2.2.0.js',
                    'node_modules/sweetalert/dist/sweetalert.min.js',
                    'node_modules/raphael/raphael.js',
                    'node_modules/morris.js/morris.js',
                    'node_modules/offcanvas-bootstrap/dist/js/bootstrap.offcanvas.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.js',
                    'build/js/common.js'
                ],
                dest: 'build/js/min/<%= pkg.name %>.js'
            }
        },

        copy: {
            js: {
                expand: true,
                src: ['js/*', 'js/*/*', 'js/*/*/*', 'js/*/*/*/*'],
                dest: 'build/'
            },

            css: {
                src: 'css/*less',
                dest: 'build/'
            }
        },

        less: {
            compile: {
                options: {
                    compress: true,
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'build/css/min/<%= pkg.name %>.css.map'
                },
                files: {
                    'build/css/min/<%= pkg.name %>.min.css': 'css/counter-main.less'
                }
            }
        }
    });

    //load all tasks;
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');

    // Default task(s).
    grunt.registerTask('default', [
        'clean:pre',
        'copy',
        'ngAnnotate',
        'concat',
        'uglify',
        'less',
        'clean:post'
    ]);
};
