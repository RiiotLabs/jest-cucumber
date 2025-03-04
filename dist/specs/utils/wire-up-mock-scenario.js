"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wireUpMockFeature = void 0;
var gherkin_1 = require("@cucumber/gherkin");
var src_1 = require("../../src");
var feature_definition_creation_1 = require("../../src/feature-definition-creation");
exports.wireUpMockFeature = function (mockTestRunner, featureFile, mockStepDefinitions, options) {
    var defineMockFeature = feature_definition_creation_1.createDefineFeature(mockTestRunner);
    var mockFeature = src_1.parseFeature(featureFile, new gherkin_1.GherkinClassicTokenMatcher(), options);
    if (mockStepDefinitions) {
        mockStepDefinitions(mockFeature, defineMockFeature);
    }
};
//# sourceMappingURL=wire-up-mock-scenario.js.map