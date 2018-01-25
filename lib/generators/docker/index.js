const FileConfirmationGenerator = require('../utils').FileConfirmationGenerator;

module.exports = class DockerComposeGenerator extends FileConfirmationGenerator {
  static config = {
    slug: "dockerConfirm"
  };
  static dockerFiles = [];

  writing() {
    //TODO: Implementation
  }
};
