import { z } from 'zod';
export declare const singleCommitMetadataSchema: z.ZodObject<{
    sha: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sha: string;
}, {
    sha: string;
}>;
export type SingleCommitMetadata = z.infer<typeof singleCommitMetadataSchema>;
export declare const commitMetadataSchema: z.ZodArray<z.ZodObject<{
    sha: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sha: string;
}, {
    sha: string;
}>, "many">;
export type CommitMetadata = z.infer<typeof commitMetadataSchema>;
export declare const pullRequestMetadataSchema: z.ZodObject<{
    number: z.ZodNumber;
    base: z.ZodString;
    url: z.ZodString;
    commits: z.ZodArray<z.ZodObject<{
        sha: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sha: string;
    }, {
        sha: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    number: number;
    base: string;
    url: string;
    commits: {
        sha: string;
    }[];
}, {
    number: number;
    base: string;
    url: string;
    commits: {
        sha: string;
    }[];
}>;
export type PullRequestMetadata = z.infer<typeof pullRequestMetadataSchema>;
