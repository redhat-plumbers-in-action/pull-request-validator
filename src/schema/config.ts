import { z } from 'zod';

export const configLabelsSchema = z.object({
  'missing-review': z.string().min(1),
  'changes-requested': z.string().min(1),
  'missing-failing-ci': z.string().min(1),
});
export type ConfigLabels = z.infer<typeof configLabelsSchema>;

export const ignoreChecksSchema = z.array(z.string().min(1));
export type IgnoreChecks = z.infer<typeof ignoreChecksSchema>;

export const configSchema = z.object({
  labels: configLabelsSchema,
  'ignore-checks': ignoreChecksSchema,
});
export type Config = z.infer<typeof configSchema>;
