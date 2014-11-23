var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var GeneratorGenerator = module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },
  prompting: {
    askFor: function () {
      var done = this.async();
      this.log(yosay('Create a' + chalk.red('opensource node project')));
      var prompts = [{
        name: 'appname',
        message: 'What is name of the project you are creating ?',
        default: this.appname
      }, {
        name: 'author',
        message: 'What is the author name for this project ?',
        default: this.config.get('author')
      }, {
        name: 'description',
        message: 'Description of project ?'
      }
      ];

      this.prompt(prompts, function (props) {
        this.appname = props.appname;
        this.author = props.author;
        this.description= props.description;
        done();
      }.bind(this));
    }
  },
  configuring: {
    enforceFolderName: function () {
      // Move to folder with name this.appname
      if (this.appname !== this._.last(this.destinationRoot().split(path.sep))) {
        this.destinationRoot(this.appname);
      }
    },
  },
  writing: {
    projectfiles: function () {
      this.template('_LICENSE', 'LICENSE');
      this.template('_package.json', 'package.json');
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('verbrc.md', '.verbrc.md');
    }
  },
  end: function () {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }
});
