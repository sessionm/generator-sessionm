const YeomanGenerator = require('yeoman-generator');
const chalk = require('chalk');

export class TechnologySelectionGenerator extends YeomanGenerator {
  //TODO: Automatically generate choices from installed generators
  static get questions() {
    return {
      name: this.config.slug,
      type: "list",
      message: `Select ${ this.config.slug } to base your project on`,
      choices: this.config.items || [],
      default: this.config.default || null,
      store: true
    };
  }
  static resolve = require.resolve;

  _generateItem(item) {
    try {
      return this.composeWith(this.constructor.resolve(item, { item }));
    } catch (error) {
      this.log(
        chalk.yellow(`Warning: Missing SessionM ${ this.constructor.config.slug }` +
          ` generator for "${ item }".` +
          ` Run \`npm install -g generator-sessionm-${ this.constructor.config.slug }-${ item }'.`
        )
      )
    }
  }

  get prompting() {
    return this.prompt(this.constructor.questions).then((answers) => {
      this._generateItem(answers[this.constructor.config.slug]);
    });
  }
}

export class FileConfirmationGenerator extends YeomanGenerator {
  static get questions() {
    return {
      name: this.config.slug,
      type: "confirm",
      message: `Add ${ this.config.slug } files?\n`,
      default: this.config.default || true,
      store: true
    };
  }

  get prompting() {
    return this.prompt(this.constructor.questions);
  }
}
