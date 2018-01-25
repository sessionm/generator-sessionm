const TechnologySelectionGenerator = require('../utils').TechnologySelectionGenerator;

module.exports = class FrameworkGenerator extends TechnologySelectionGenerator {
  static config = {
    slug: "framework",
    items: []
  };
};
