/// <reference types="jest" />
import { ParsedFeature } from './models';
export declare type StepsDefinitionCallbackOptions = {
    defineStep: DefineStepFunction;
    given: DefineStepFunction;
    when: DefineStepFunction;
    then: DefineStepFunction;
    and: DefineStepFunction;
    but: DefineStepFunction;
    pending: () => void;
};
export interface IJestLike {
    describe: jest.Describe;
    test: jest.It;
}
export declare type ScenariosDefinitionCallbackFunction = (defineScenario: DefineScenarioFunctionWithAliases) => void;
export declare type DefineScenarioFunction = (scenarioTitle: string, stepsDefinitionCallback: StepsDefinitionCallbackFunction, timeout?: number) => void;
export declare type DefineScenarioFunctionWithAliases = DefineScenarioFunction & {
    skip: DefineScenarioFunction;
    only: DefineScenarioFunction;
    concurrent: DefineScenarioFunction;
};
export declare type StepsDefinitionCallbackFunction = (options: StepsDefinitionCallbackOptions) => void;
export declare type DefineStepFunction = (stepMatcher: string | RegExp, stepDefinitionCallback: (...args: any[]) => any) => any;
export declare type DefineFeatureFunction = (featureFromFile: ParsedFeature, scenariosDefinitionCallback: ScenariosDefinitionCallbackFunction) => void;
export declare const createDefineFeature: (jestLike: IJestLike) => DefineFeatureFunction;
