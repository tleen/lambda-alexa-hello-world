var grunt = require('grunt');

grunt.initConfig({
  config : grunt.file.readJSON('./.config'),
  
  lambda_invoke : {
    start : {
      options : {
	event : './events/session-start.json'
      }
    },
    intent : {
      options : {
	event : './events/intent.json'
      }
    },
    end : {
      options : {
	event : './events/session-end.json'
      }
    }
  },
  lambda_package : {
    default : {
      'include_files' : './lib/AlexaSkill.js'
    }
  },
  lambda_deploy : {
    default : {
      'arn' : '<%= config.arn %>'
    }
  }
  
});



grunt.loadNpmTasks('grunt-aws-lambda');
grunt.registerTask('test', ['lambda_invoke:start', 'lambda_invoke:intent', 'lambda_invoke:end']);
grunt.registerTask('default', ['test']);
grunt.registerTask('deploy', ['default', 'lambda_package', 'lambda_deploy']);
