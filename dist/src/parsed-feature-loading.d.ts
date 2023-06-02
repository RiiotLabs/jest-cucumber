import { Options } from './configuration';
import { ParsedFeature } from './models';
import ITokenMatcher from '@cucumber/gherkin/dist/src/ITokenMatcher';
export declare const parseFeature: (featureText: string, tokenMatcher: ITokenMatcher<any>, options?: Options | undefined) => ParsedFeature;
export declare const loadFeature: (featureFilePath: string, options?: Options | undefined) => ParsedFeature;
export declare const loadFeatures: (globPattern: string, options?: Options | undefined) => ParsedFeature[];
