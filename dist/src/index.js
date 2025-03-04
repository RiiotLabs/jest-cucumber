"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoBindSteps = exports.defineFeature = void 0;
var parsed_feature_loading_1 = require("./parsed-feature-loading");
Object.defineProperty(exports, "loadFeature", { enumerable: true, get: function () { return parsed_feature_loading_1.loadFeature; } });
Object.defineProperty(exports, "loadFeatures", { enumerable: true, get: function () { return parsed_feature_loading_1.loadFeatures; } });
Object.defineProperty(exports, "parseFeature", { enumerable: true, get: function () { return parsed_feature_loading_1.parseFeature; } });
var configuration_1 = require("./configuration");
Object.defineProperty(exports, "setJestCucumberConfiguration", { enumerable: true, get: function () { return configuration_1.setJestCucumberConfiguration; } });
var generate_code_by_line_number_1 = require("./code-generation/generate-code-by-line-number");
Object.defineProperty(exports, "generateCodeFromFeature", { enumerable: true, get: function () { return generate_code_by_line_number_1.generateCodeFromFeature; } });
Object.defineProperty(exports, "generateCodeWithSeparateFunctionsFromFeature", { enumerable: true, get: function () { return generate_code_by_line_number_1.generateCodeWithSeparateFunctionsFromFeature; } });
var feature_definition_creation_1 = require("./feature-definition-creation");
var automatic_step_binding_1 = require("./automatic-step-binding");
var jestLike = {
    describe: describe,
    test: test,
};
exports.defineFeature = feature_definition_creation_1.createDefineFeature(jestLike);
exports.autoBindSteps = automatic_step_binding_1.createAutoBindSteps(jestLike);
//# sourceMappingURL=index.js.map