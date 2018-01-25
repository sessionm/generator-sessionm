import Generator from 'yeoman-generator';

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
    return this.composeWith(this.constructor.resolve(`../${ item }`));
  }

  _generateAll(technologyStack) {
    technologyStack.map((item) => this._generateItem(item));
  }

  get initializing() {
    return this._generateAll(this.constructor.technologyStack);
  }
};
