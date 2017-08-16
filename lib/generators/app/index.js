const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class AppGenerator extends Generator {

  static technologyStack = [
    'language',
    'framework',
    'database',
    'docker',
    'bin',
    'jenkins'
  ];

  static resolve = require.resolve;

  _generateItem(item) {
    try {
      return this.composeWith(this.constructor.resolve(`${ item }`));
    } catch (error) {
      this.log(
        chalk.yellow(`Warning: Missing SessionM generator for "${ item }".` +
        ` Run \`npm install generator-sessionm-${ item }'`));
    }
  }

  _generateAll(technologyStack) {
    technologyStack.map((item) => {
      return this._generateItem(item);
    });
  }

  initializing() {
    this._generateAll(this.constructor.technologyStack);
  }
};
