import { z } from 'zod';
export declare const configLabelsSchema: z.ZodObject<{
    'missing-review': z.ZodString;
    'changes-requested': z.ZodString;
    'missing-failing-ci': z.ZodString;
    'waiving-failing-ci': z.ZodString;
}, z.core.$strip>;
export type ConfigLabels = z.infer<typeof configLabelsSchema>;
export declare const ignoreChecksSchema: z.ZodArray<z.ZodString>;
export type IgnoreChecks = z.infer<typeof ignoreChecksSchema>;
export declare const configSchema: z.ZodObject<{
    labels: z.ZodObject<{
        'missing-review': z.ZodString;
        'changes-requested': z.ZodString;
        'missing-failing-ci': z.ZodString;
        'waiving-failing-ci': z.ZodString;
    }, z.core.$strip>;
    'ignore-checks': z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type Config = z.infer<typeof configSchema>;
