import { z } from 'zod';
export declare const singleCommitMetadataSchema: z.ZodObject<{
    sha: z.ZodString;
}, z.core.$strip>;
export type SingleCommitMetadata = z.infer<typeof singleCommitMetadataSchema>;
export declare const commitMetadataSchema: z.ZodArray<z.ZodObject<{
    sha: z.ZodString;
}, z.core.$strip>>;
export type CommitMetadata = z.infer<typeof commitMetadataSchema>;
export declare const pullRequestMetadataSchema: z.ZodObject<{
    number: z.ZodNumber;
    base: z.ZodString;
    url: z.ZodString;
    commits: z.ZodArray<z.ZodObject<{
        sha: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type PullRequestMetadata = z.infer<typeof pullRequestMetadataSchema>;
