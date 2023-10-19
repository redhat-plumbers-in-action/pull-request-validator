import { z } from 'zod';
export declare const configLabelsSchema: z.ZodObject<{
    'missing-review': z.ZodString;
    'changes-requested': z.ZodString;
    'missing-failing-ci': z.ZodString;
    'waiving-failing-ci': z.ZodString;
}, "strip", z.ZodTypeAny, {
    'missing-review': string;
    'changes-requested': string;
    'missing-failing-ci': string;
    'waiving-failing-ci': string;
}, {
    'missing-review': string;
    'changes-requested': string;
    'missing-failing-ci': string;
    'waiving-failing-ci': string;
}>;
export type ConfigLabels = z.infer<typeof configLabelsSchema>;
export declare const ignoreChecksSchema: z.ZodArray<z.ZodString, "many">;
export type IgnoreChecks = z.infer<typeof ignoreChecksSchema>;
export declare const configSchema: z.ZodObject<{
    labels: z.ZodObject<{
        'missing-review': z.ZodString;
        'changes-requested': z.ZodString;
        'missing-failing-ci': z.ZodString;
        'waiving-failing-ci': z.ZodString;
    }, "strip", z.ZodTypeAny, {
        'missing-review': string;
        'changes-requested': string;
        'missing-failing-ci': string;
        'waiving-failing-ci': string;
    }, {
        'missing-review': string;
        'changes-requested': string;
        'missing-failing-ci': string;
        'waiving-failing-ci': string;
    }>;
    'ignore-checks': z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    labels: {
        'missing-review': string;
        'changes-requested': string;
        'missing-failing-ci': string;
        'waiving-failing-ci': string;
    };
    'ignore-checks': string[];
}, {
    labels: {
        'missing-review': string;
        'changes-requested': string;
        'missing-failing-ci': string;
        'waiving-failing-ci': string;
    };
    'ignore-checks': string[];
}>;
export type Config = z.infer<typeof configSchema>;
