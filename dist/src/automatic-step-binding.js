"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAutoBindSteps = void 0;
var step_definition_validation_1 = require("./validation/step-definition-validation");
var feature_definition_creation_1 = require("./feature-definition-creation");
var step_generation_1 = require("./code-generation/step-generation");
var globalSteps = [];
var registerStep = function (stepMatcher, stepFunction) {
    globalSteps.push({ stepMatcher: stepMatcher, stepFunction: stepFunction });
};
exports.createAutoBindSteps = function (jestLike) {
    var defineFeature = feature_definition_creation_1.createDefineFeature(jestLike);
    return function (features, stepDefinitions) {
        stepDefinitions.forEach(function (stepDefinitionCallback) {
            stepDefinitionCallback({
                defineStep: registerStep,
                given: registerStep,
                when: registerStep,
                then: registerStep,
                and: registerStep,
                but: registerStep,
                pending: function () {
                    // Nothing to do
                },
            });
        });
        var errors = [];
        features.forEach(function (feature) {
            defineFeature(feature, function (test) {
                var scenarioOutlineScenarios = feature.scenarioOutlines
                    .map(function (scenarioOutline) { return scenarioOutline.scenarios[0]; });
                var scenarios = __spreadArrays(feature.scenarios, scenarioOutlineScenarios);
                scenarios.forEach(function (scenario) {
                    test(scenario.title, function (options) {
                        scenario.steps.forEach(function (step, stepIndex) {
                            var matches = globalSteps
                                .filter(function (globalStep) { return step_definition_validation_1.matchSteps(step.stepText, globalStep.stepMatcher); });
                            if (matches.length === 1) {
                                var match = matches[0];
                                options.defineStep(match.stepMatcher, match.stepFunction);
                            }
                            else if (matches.length === 0) {
                                var stepCode = step_generation_1.generateStepCode(scenario.steps, stepIndex, false);
                                // tslint:disable-next-line:max-line-length
                                errors.push("No matching step found for step \"" + step.stepText + "\" in scenario \"" + scenario.title + "\" in feature \"" + feature.title + "\". Please add the following step code: \n\n" + stepCode);
                            }
                            else {
                                var matchingCode = matches.map(function (match) { return match.stepMatcher.toString() + "\n\n" + match.stepFunction.toString(); });
                                errors.push(matches.length + " step definition matches were found for step \"" + step.stepText + "\" in scenario \"" + scenario.title + "\" in feature \"" + feature.title + "\". Each step can only have one matching step definition. The following step definition matches were found:\n\n" + matchingCode.join('\n\n'));
                            }
                        });
                    });
                });
            });
        });
        if (errors.length) {
            throw new Error(errors.join('\n\n'));
        }
    };
};
//# sourceMappingURL=automatic-step-binding.js.map