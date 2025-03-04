"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkThatFeatureFileAndStepDefinitionsHaveSameScenarios = void 0;
var scenario_generation_1 = require("../code-generation/scenario-generation");
var findScenarioFromParsedFeature = function (errors, parsedScenarios, scenarioTitle, errorOptions) {
    var matchingScenarios = [];
    if (parsedScenarios) {
        matchingScenarios = parsedScenarios
            .filter(function (parsedScenario) { return parsedScenario.title.toLowerCase() === scenarioTitle.toLowerCase(); });
    }
    if (matchingScenarios.length === 0 && !errorOptions.allowScenariosNotInFeatureFile) {
        errors.push("No scenarios found in feature file that match scenario title \"" + scenarioTitle + ".\"");
        return null;
    }
    else if (matchingScenarios.length > 1 && errorOptions.scenariosMustMatchFeatureFile) {
        errors.push("More than one scenario found in feature file that match scenario title \"" + scenarioTitle + "\"");
        return null;
    }
    return matchingScenarios[0];
};
var findScenarioFromStepDefinitions = function (errors, scenariosFromStepDefinitions, scenario, errorOptions) {
    var scenarioTitle = scenario.title;
    var matchingScenarios = scenariosFromStepDefinitions
        .filter(function (scenarioFromStepDefinitions) {
        return scenarioFromStepDefinitions.title.toLocaleLowerCase() === scenarioTitle.toLocaleLowerCase();
    });
    if (matchingScenarios.length === 0 && errorOptions.scenariosMustMatchFeatureFile) {
        // tslint:disable-next-line:max-line-length
        errors.push("Feature file has a scenario titled \"" + scenarioTitle + "\", but no match found in step definitions. Try adding the following code:\n\n" + scenario_generation_1.generateScenarioCode(scenario));
        return null;
    }
    else if (matchingScenarios.length > 1 && errorOptions.scenariosMustMatchFeatureFile) {
        errors.push("More than one scenario found in step definitions matching scenario title \"" + scenarioTitle + "\"");
        return null;
    }
    return matchingScenarios[0];
};
exports.checkThatFeatureFileAndStepDefinitionsHaveSameScenarios = function (parsedFeature, featureFromStepDefinitions) {
    var errors = [];
    var parsedScenarios = [];
    if (parsedFeature && parsedFeature.scenarios && parsedFeature.scenarios.length) {
        parsedScenarios = parsedScenarios.concat(parsedFeature.scenarios);
    }
    if (parsedFeature && parsedFeature.scenarioOutlines && parsedFeature.scenarioOutlines.length) {
        parsedScenarios = parsedScenarios.concat(parsedFeature.scenarioOutlines);
    }
    if (parsedFeature.options && parsedFeature.options.errors === false) {
        return;
    }
    if (featureFromStepDefinitions
        && featureFromStepDefinitions.scenarios
        && featureFromStepDefinitions.scenarios.length) {
        featureFromStepDefinitions.scenarios.forEach(function (scenarioFromStepDefinitions) {
            findScenarioFromParsedFeature(errors, parsedScenarios, scenarioFromStepDefinitions.title, parsedFeature.options.errors);
        });
    }
    parsedScenarios = parsedScenarios.filter(function (scenario) { return !scenario.skippedViaTagFilter; });
    if (parsedScenarios && parsedScenarios.length) {
        parsedScenarios.forEach(function (parsedScenario) {
            findScenarioFromStepDefinitions(errors, featureFromStepDefinitions && featureFromStepDefinitions.scenarios, parsedScenario, parsedFeature.options.errors);
        });
    }
    if (errors.length) {
        throw new Error(errors.join('\n\n'));
    }
};
//# sourceMappingURL=scenario-validation.js.map