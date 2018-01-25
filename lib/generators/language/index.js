const TechnologySelectionGenerator = require('../utils').TechnologySelectionGenerator;

module.exports = class LanguageGenerator extends TechnologySelectionGenerator {
  static config = {
    slug: "language",
    items: []
  };
};
