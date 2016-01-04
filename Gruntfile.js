module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            main: {
                src: 'static/js/clean-blog.js',
                dest: 'static/js/clean-blog.min.js'
            }
        },
        less: {
            expanded: {
                options: {
                    paths: ["static/css"]
                },
                files: {
                    "static/css/clean-blog.css": "less/clean-blog.less"
                }
            },
            minified: {
                options: {
                    paths: ["static/css"],
                    cleancss: true
                },
                files: {
                    "static/css/clean-blog.min.css": "less/clean-blog.less"
                }
            }
        },
        banner: '/*!\n' +
            ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['static/css/clean-blog.css', 'static/css/clean-blog.min.css', 'static/js/clean-blog.min.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['static/js/clean-blog.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            less: {
                files: ['less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
        },
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'less', 'usebanner']);

};
