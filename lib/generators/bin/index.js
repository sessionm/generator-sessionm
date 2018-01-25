const FileConfirmationGenerator = require('../utils').FileConfirmationGenerator;

module.exports = class BinGenerator extends FileConfirmationGenerator {
  static config = {
    slug: "binConfirm"
  };
  static binFiles = [];

  writing() {
    //TODO: Implementation
  }
}
