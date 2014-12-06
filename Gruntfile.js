'use strict';

var fs = require('fs');

module.exports = function(grunt) {
    var version = fs.readFileSync('VERSION').toString().split('\n')[0];

    var styles = grunt.file.expand(['src/**/*.css', '!src/library/tartJS/**/*']).map(function(file) {
        file = file.slice(4);
        return '<link rel="stylesheet" type="text/css" href="' + file + '" />';
    }).join('');

    var config = {};

    config.clean = {
        before: ['target/www/**/*', '!target/www/.dont-delete'],
        all: ['build', 'target/www']
    };

    config.mkdir = {
        all: {
            options: {
                create: ['build']
            }
        },
        dev: {
            options: {
                create: ['build']
            }
        }
    };

    config.uglify = {
        options: {
            mangle: false
        },
        lib: {
            files: {
                'build/lib.js': ['src/library/**/*.js', '!src/library/tartJS/**/*']
            }
        }
    };

    config.closureBuilder = {
        options: {
            builder: 'src/library/tartJS/tools/goog/build/closurebuilder.py',
            namespaces: 'app.Bootstrapper',
            compilerFile: 'src/library/tartJS/tools/goog/compiler/compiler.jar',
            output_mode: 'compiled',
            compile: true,
            compilerOpts: {
                compilation_level: 'ADVANCED_OPTIMIZATIONS',
                //                    compilation_level: 'WHITESPACE_ONLY',
                warning_level: 'verbose',
                //                    formatting: 'PRETTY_PRINT',
                language_in: 'ECMASCRIPT5',
                generate_exports: true,
                charset: 'UTF-8',
                externs: ['externs.js'],
                jscomp_error: ['accessControls', 'checkRegExp', 'checkTypes', 'checkVars', 'invalidCasts',
                    'missingProperties', 'nonStandardJsDocs', 'strictModuleDepCheck', 'undefinedVars',
                    'unknownDefines', 'visibility'],
                jscomp_off: ['liskov']
            },
            execOpts: {
                maxBuffer: 999999 * 1024
            }
        },
        main: {
            src: 'src/',
            dest: 'build/compiled.js'
        }
    };

    config.closureDepsWriter = {
        options: {
            depswriter: 'src/library/tartJS/tools/goog/build/depswriter.py', // filepath to depswriter
            root_with_prefix: '"src/ ../../../../../"'
        },
        main: {
            dest: 'build/deps.js'
        }
    };

    config.copy = {
        prod: {
            files: [
                { expand: true, cwd: 'src/', src: ['static/**'], dest: 'target/www' },
                { expand: true, cwd: 'src/', src: ['index.html'], dest: 'target/www' }
            ]
        }
    };

    config.symlink = {
        all: {
            files: [
                { expand: true, cwd: 'src', src: ['*', '!index.html'], dest: 'target/www' },
                { src: 'build/deps.js', dest: 'target/www/deps.js' }
            ]
        }
    };

    config.concat = {
        js: {
            options: {
                separator: ';'
            },
            src: ['build/lib.js', 'build/compiled.js'],
            dest: 'target/www/compiled.js'
        },
        css: {
            src: [
                'src/ui/layout/reset.css',
                'src/**/*.css',
                '!src/library/tartJS/**/*'
            ],
            dest: 'target/www/compiled.css'
        }
    };

    config.cssmin = {
        minify: {
            src: ['target/www/compiled.css'],
            dest: 'target/www/compiled.css'
        }
    };

    config.combine = {
        dev: {
            input: 'src/index.html',
            output: 'target/www/index.html',
            tokens: [
                {
                    token: '<scripts/>',
                    string: '<script type="text/javascript" src="cordova.js"></script>' +
                        '<script type="text/javascript" src="library/tartJS/third_party/goog/goog/base.js"></script>' +
                        '<script type="text/javascript" src="deps.js"></script>' +
                        '<script type="text/javascript" src="Bootstrapper.js"></script>'
                },
                {
                    token: '<stylesheets/>',
                    string: styles
                }
            ]
        },
        production: {
            input: 'src/index.html',
            output: 'target/www/index.html',
            tokens: [
                {
                    token: '<scripts/>',
                    string: '<script type="text/javascript" src="cordova.js"></script>' +
                        '<script type="text/javascript" src="compiled.js"></script>'
                },
                {
                    token: '<stylesheets/>',
                    string: '<link rel="stylesheet" type="text/css" href="compiled.css" />'
                }
            ]
        },
        web: {
            input: 'target/www/index.html',
            output: 'target/www/index.html',
            tokens: [
                {
                    token: '<environment/>',
                    string: fs.readFileSync('config/web.js').toString()
                }
            ]
        },
        device: {
            input: 'target/www/index.html',
            output: 'target/www/index.html',
            tokens: [
                {
                    token: '<environment/>',
                    string: fs.readFileSync('config/device.js').toString()
                }
            ]
        },
        local: {
            input: 'target/www/index.html',
            output: 'target/www/index.html',
            tokens: [
                {
                    token: '<directives/>',
                    string: fs.readFileSync('config/local.js').toString() + ' '
                },
                {
                    token: '<version/>',
                    string: 'cfg[\'VERSION\'] = \'' + version + '-local\';'
                }
            ]
        },
        test: {
            input: 'target/www/index.html',
            output: 'target/www/index.html',
            tokens: [
                {
                    token: '<directives/>',
                    string: fs.readFileSync('config/test.js').toString() + ' '
                },
                {
                    token: '<version/>',
                    string: 'cfg[\'VERSION\'] = \'' + version + '-test\';'
                }
            ]
        },
        prod: {
            input: 'target/www/index.html',
            output: 'target/www/index.html',
            tokens: [
                {
                    token: '<directives/>',
                    string: fs.readFileSync('config/prod.js').toString() + ' '
                },
                {
                    token: '<version/>',
                    string: 'cfg[\'VERSION\'] = \'' + version + '\';'
                }
            ]
        }
    };
    //
    config.newer = {
        uglify: {
            src: ['src/library/*.js'],
            dest: 'target/www/lib.js',
            options: {
                tasks: ['uglify:lib']
            }
        },
        closureBuilder: {
            src: ['src/**/*.js'],
            dest: 'build/compiled.js',
            options: {
                tasks: ['closureBuilder']
            }
        },
        closureDepsWriter: {
            src: ['src/**/*.js'],
            dest: 'build/deps.js',
            options: {
                tasks: ['closureDepsWriter']
            }
        }
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-closure-tools');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-combine');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-newer-explicit');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-tart');

    grunt.registerTask('default', ['clean:before', 'mkdir:all', 'newer:uglify', 'newer:closureBuilder', 'copy:prod', 'concat', 'combine:production', 'cssmin']);
    grunt.registerTask('production', ['clean:before', 'mkdir:all', 'newer:uglify', 'newer:closureBuilder', 'copy:prod', 'concat', 'combine:production', 'cssmin']);
    grunt.registerTask('dev', ['clean:before', 'mkdir:dev', 'newer:closureDepsWriter', 'symlink', 'combine:dev']);
    grunt.registerTask('web', ['combine:web']);
    grunt.registerTask('device', ['combine:device']);
    grunt.registerTask('local', ['combine:local']);
    grunt.registerTask('test', ['combine:test']);
    grunt.registerTask('prod', ['combine:prod']);
};
