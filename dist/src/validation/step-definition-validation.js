"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureFeatureFileAndStepDefinitionScenarioHaveSameSteps = exports.matchSteps = void 0;
var scenario_generation_1 = require("../code-generation/scenario-generation");
var step_generation_1 = require("../code-generation/step-generation");
exports.matchSteps = function (stepFromFeatureFile, stepMatcher) {
    if (typeof stepMatcher === 'string') {
        return stepFromFeatureFile.toLocaleLowerCase() === stepMatcher.toLocaleLowerCase();
    }
    else if (stepMatcher instanceof RegExp) {
        return stepFromFeatureFile.match(stepMatcher);
    }
    else {
        return false;
    }
};
exports.ensureFeatureFileAndStepDefinitionScenarioHaveSameSteps = function (options, parsedScenario, scenarioFromStepDefinitions) {
    if (options && options.errors === false) {
        return;
    }
    else if (options && options.errors && !options.errors.stepsMustMatchFeatureFile) {
        return;
    }
    if (!parsedScenario) {
        return;
    }
    var errors = [];
    var parsedScenarioSteps = [];
    if (parsedScenario.scenarios) {
        var parsedScenarioOutlineScenarios = parsedScenario.scenarios;
        if (parsedScenarioOutlineScenarios && parsedScenarioOutlineScenarios.length) {
            parsedScenarioSteps = parsedScenarioOutlineScenarios[0].steps;
        }
        else {
            parsedScenarioSteps = [];
        }
    }
    else if (parsedScenario.steps) {
        parsedScenarioSteps = parsedScenario.steps;
    }
    var parsedStepCount = parsedScenarioSteps.length;
    var stepDefinitionCount = scenarioFromStepDefinitions.steps.length;
    if (parsedStepCount !== stepDefinitionCount) {
        // tslint:disable-next-line:max-line-length
        errors.push("Scenario \"" + parsedScenario.title + "\" has " + parsedStepCount + " step(s) in the feature file, but " + stepDefinitionCount + " step definition(s) defined. Try adding the following code:\n\n" + scenario_generation_1.generateScenarioCode(parsedScenario));
    }
    else {
        parsedScenarioSteps.forEach(function (parsedStep, index) {
            var stepFromStepDefinitions = scenarioFromStepDefinitions.steps[index];
            if (!stepFromStepDefinitions || !exports.matchSteps(parsedStep.stepText, stepFromStepDefinitions.stepMatcher)) {
                // tslint:disable-next-line:max-line-length
                errors.push("Expected step #" + (index + 1) + " in scenario \"" + parsedScenario.title + "\" to match \"" + parsedStep.stepText + "\". Try adding the following code:\n\n" + step_generation_1.generateStepCode(parsedScenario.steps, index));
            }
        });
    }
    if (errors.length) {
        throw new Error(errors.join('\n\n'));
    }
};
//# sourceMappingURL=step-definition-validation.js.map