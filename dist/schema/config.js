import { z } from 'zod';
export const configLabelsSchema = z.object({
    'missing-review': z.string().min(1),
    'changes-requested': z.string().min(1),
    'missing-failing-ci': z.string().min(1),
    'waiving-failing-ci': z.string().min(1),
});
export const ignoreChecksSchema = z.array(z.string().min(1));
export const configSchema = z.object({
    labels: configLabelsSchema,
    'ignore-checks': ignoreChecksSchema,
});
//# sourceMappingURL=config.js.map