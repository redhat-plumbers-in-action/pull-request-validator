import { z } from 'zod';
export const singleCommitMetadataSchema = z.object({
    sha: z.string(),
});
export const commitMetadataSchema = z.array(singleCommitMetadataSchema);
export const pullRequestMetadataSchema = z.object({
    number: z.number(),
    base: z.string(),
    url: z.string().url(),
    commits: commitMetadataSchema,
});
//# sourceMappingURL=input.js.map