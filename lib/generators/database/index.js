const TechnologySelectionGenerator = require('../utils').TechnologySelectionGenerator;

module.exports = class DatabaseGenerator extends TechnologySelectionGenerator {
  static config = {
    slug: "database",
    items: []
  };
};
