const FileConfirmationGenerator = require('../utils').FileConfirmationGenerator;

module.exports = class JenkinsGenerator extends FileConfirmationGenerator {
  static config = {
    slug: "jenkinsConfirm"
  };
  static jenkinsFiles = [];

  writing() {
    //TODO: Implementation
  }
};
