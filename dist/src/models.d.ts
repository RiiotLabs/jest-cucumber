import { Options } from './configuration';
export declare type StepFromStepDefinitions = {
    stepMatcher: string | RegExp;
    stepFunction(stepArguments?: any): void | PromiseLike<any>;
};
export declare type ScenarioFromStepDefinitions = {
    title: string;
    steps: StepFromStepDefinitions[];
};
export declare type FeatureFromStepDefinitions = {
    title: string;
    scenarios: ScenarioFromStepDefinitions[];
};
export declare type ParsedStep = {
    keyword: string;
    stepText: string;
    stepArgument: string | {};
    lineNumber: number;
};
export declare type ParsedScenario = {
    title: string;
    steps: ParsedStep[];
    tags: string[];
    lineNumber: number;
    skippedViaTagFilter: boolean;
};
export declare type ParsedScenarioOutline = {
    title: string;
    tags: string[];
    scenarios: ParsedScenario[];
    steps: ParsedStep[];
    lineNumber: number;
    skippedViaTagFilter: boolean;
};
export declare type ParsedFeature = {
    title: string;
    scenarios: ParsedScenario[];
    scenarioOutlines: ParsedScenarioOutline[];
    options: Options;
    tags: string[];
};
