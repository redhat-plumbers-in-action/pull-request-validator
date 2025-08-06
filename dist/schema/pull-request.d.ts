import { z } from 'zod';
export declare const pullRequestApiSchema: z.ZodObject<{
    number: z.ZodNumber;
    base: z.ZodString;
    url: z.ZodString;
    labels: z.ZodArray<z.ZodPipe<z.ZodObject<{
        name: z.ZodString;
    }, z.core.$strip>, z.ZodTransform<string, {
        name: string;
    }>>>;
    commits: z.ZodArray<z.ZodObject<{
        sha: z.ZodString;
    }, z.core.$strip>>;
    author_association: z.ZodString;
    auto_merge: z.ZodNullable<z.ZodBoolean>;
    draft: z.ZodBoolean;
    merged: z.ZodBoolean;
    mergeable: z.ZodBoolean;
    mergeable_state: z.ZodString;
}, z.core.$strip>;
export type PullRequestApi = z.infer<typeof pullRequestApiSchema>;
export declare const checkRunsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    status: z.ZodString;
    conclusion: z.ZodNullable<z.ZodString>;
}, z.core.$strip>>;
export type CheckRuns = z.infer<typeof checkRunsSchema>;
export declare const statusSchema: z.ZodObject<{
    state: z.ZodUnion<readonly [z.ZodLiteral<"success">, z.ZodLiteral<"pending">, z.ZodLiteral<"failure">, z.ZodLiteral<"error">]>;
    total_count: z.ZodNumber;
    statuses: z.ZodArray<z.ZodObject<{
        state: z.ZodUnion<readonly [z.ZodLiteral<"success">, z.ZodLiteral<"pending">, z.ZodLiteral<"failure">, z.ZodLiteral<"error">]>;
        context: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type Status = z.infer<typeof statusSchema>;
export declare const reviewsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    user: z.ZodObject<{
        login: z.ZodString;
        type: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodString;
    state: z.ZodString;
    author_association: z.ZodString;
    submitted_at: z.ZodString;
}, z.core.$strip>>;
export type Reviews = z.infer<typeof reviewsSchema>;
export declare const reviewRequestsSchema: z.ZodArray<z.ZodPipe<z.ZodObject<{
    login: z.ZodString;
}, z.core.$strip>, z.ZodTransform<string, {
    login: string;
}>>>;
export type ReviewRequests = z.infer<typeof reviewRequestsSchema>;
