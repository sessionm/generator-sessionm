const Generator = require('yeoman-generator');

module.exports = class AppGenerator extends Generator {

  static technologyStack = [
    "language",
    "framework",
    "database",
    "docker",
    "bin",
    "jenkins"
  ];

  static resolve = require.resolve;
	
  _generateItem(item) {
    try {
      return this.composeWith(this.constructor.resolve(`${item}`))
    } catch (error) {
      this.log(
	`Warning: Missing generator ${item} in technology stack.` +
        `Install generator-${item} for these items to also be generated.`)
    }
  }

  _generateAll(technologyStack) {
    technologyStack.map((item) => {
      this._generateItem(item)
    })
  }

  initializing() {
    this._generateAll(this.constructor.technologyStack)
  }
};
