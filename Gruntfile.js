module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c)\n' +
        ' *  (c) 2010, Brandon Aaron (http://brandonaaron.net)\n' +
        ' *  (c) 2012 - 2013, Alexander Zaytsev (http://hazzik.ru/en)\n' +
        ' * Dual licensed under the MIT (MIT_LICENSE.txt)\n' +
        ' * and GPL Version 2 (GPL_LICENSE.txt) licenses.\n' +
        ' */\n',
    concat: {
      options: {
        banner: '<%= banner %>',
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/tests.html']
    },
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    },
	'npm-contributors': {
		options: {
			commitMessage: 'chore: update contributors'
		}
	},
	bump: {
		options: {
			commitMessage: 'chore: release v%VERSION%',
			pushTo: 'origin'
		}
	}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-npm');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

  grunt.registerTask('release', 'Bump the version and publish to NPM.', function(type) {
	grunt.task.run(['npm-contributors', "bump:#{type||'patch'}", 'npm-publish']);
  });
};