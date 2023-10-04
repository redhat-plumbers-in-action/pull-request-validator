import { CustomOctokit } from './octokit';
import { ConfigLabels, IgnoreChecks } from './schema/config';
export declare class Config {
    static readonly defaults: {
        labels: {
            'missing-review': string;
            'changes-requested': string;
            'missing-failing-ci': string;
        };
        'ignore-checks': string[];
    };
    labels: ConfigLabels;
    ignoreChecks: IgnoreChecks;
    constructor(config: unknown);
    static getConfig(octokit: CustomOctokit): Promise<Config>;
    static isConfigEmpty(config: unknown): boolean;
}
